import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { LEVELS } from "../data/index";
import { supabase, isSupabaseReady } from "../lib/supabaseClient";

const STORAGE_KEY = "agent-kit-progress";

function parseKey(k: string): { li: number; si: number; ii: number; ci: number } | null {
  const parts = k.split(",").map(Number);
  if (parts.length !== 4 || parts.some(isNaN)) return null;
  return { li: parts[0], si: parts[1], ii: parts[2], ci: parts[3] };
}

function keyToIndices(k: string): [number, number, number, number] | null {
  const parts = k.split(",").map(Number);
  if (parts.length !== 4 || parts.some(isNaN)) return null;
  return [parts[0], parts[1], parts[2], parts[3]];
}

interface UseProgressProps {
  user?: User | null;
  isGuest?: boolean;
}

export function useProgress({ user, isGuest }: UseProgressProps = {}) {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      setLoading(true);
      
      if (user && isSupabaseReady && supabase) {
        const { data, error } = await supabase
          .from("user_progress")
          .select("level_idx, section_idx, item_idx, check_idx, completed")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error loading progress from Supabase:", error);
        }

        const fromSupabase: Record<string, boolean> = {};
        if (data) {
          data.forEach((row) => {
            const k = `${row.level_idx},${row.section_idx},${row.item_idx},${row.check_idx}`;
            fromSupabase[k] = row.completed;
          });
        }

        setChecked(fromSupabase);
      } else if (isGuest) {
        const saved = localStorage.getItem(STORAGE_KEY);
        setChecked(saved ? JSON.parse(saved) : {});
      } else {
        setChecked({});
      }
      setLoading(false);
    };

    loadProgress();
  }, [user, isGuest]);

  useEffect(() => {
    if (loading) return;

    if (user && isSupabaseReady && supabase) {
      const indices = Object.keys(checked).map(keyToIndices).filter(Boolean) as [number, number, number, number][];
      
      const records = indices.map(([li, si, ii, ci]) => ({
        user_id: user.id,
        level_idx: li,
        section_idx: si,
        item_idx: ii,
        check_idx: ci,
        completed: checked[`${li},${si},${ii},${ci}`] ?? false,
        updated_at: new Date().toISOString(),
      }));

      if (records.length > 0) {
        supabase
          .from("user_progress")
          .upsert(records, { onConflict: "user_id,level_idx,section_idx,item_idx,check_idx" })
          .then(({ error }) => {
            if (error) {
              console.error("Error saving progress to Supabase:", error);
            }
          });
      }
    } else if (isGuest) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    }
  }, [checked, user, isGuest, loading]);

  const syncProgress = useCallback(async () => {
    if (!user || !isSupabaseReady || !supabase) return;

    const fromLocal = localStorage.getItem(STORAGE_KEY);
    if (!fromLocal) return;

    const localData: Record<string, boolean> = JSON.parse(fromLocal);
    const indices = Object.keys(localData).map(keyToIndices).filter(Boolean) as [number, number, number, number][];

    for (const [li, si, ii, ci] of indices) {
      const { error } = await supabase
        .from("user_progress")
        .upsert(
          {
            user_id: user.id,
            level_idx: li,
            section_idx: si,
            item_idx: ii,
            check_idx: ci,
            completed: localData[`${li},${si},${ii},${ci}`],
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id,level_idx,section_idx,item_idx,check_idx" }
        );

      if (error) {
        console.error("Error syncing progress to Supabase:", error);
      }
    }
  }, [user]);

  const key = (li: number, si: number, ii: number, ci: number): string => 
    `${li},${si},${ii},${ci}`;

  const toggle = (k: string): void => 
    setChecked((prev) => ({ ...prev, [k]: !prev[k] }));

  const levelStats = (li: number) => {
    let t = 0, d = 0;
    LEVELS[li].sections.forEach((s, si) =>
      s.items.forEach((it, ii) =>
        it.checks.forEach((_, ci) => {
          t++;
          if (checked[key(li, si, ii, ci)]) d++;
        })
      )
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  const secStats = (li: number, si: number) => {
    let t = 0, d = 0;
    LEVELS[li].sections[si].items.forEach((it, ii) =>
      it.checks.forEach((_, ci) => {
        t++;
        if (checked[key(li, si, ii, ci)]) d++;
      })
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  const totalStats = () => {
    let t = 0, d = 0;
    LEVELS.forEach((lv, li) =>
      lv.sections.forEach((s, si) =>
        s.items.forEach((it, ii) =>
          it.checks.forEach((_, ci) => {
            t++;
            if (checked[key(li, si, ii, ci)]) d++;
          })
        )
      )
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  return { checked, key, toggle, levelStats, secStats, totalStats, syncProgress, loading };
}
