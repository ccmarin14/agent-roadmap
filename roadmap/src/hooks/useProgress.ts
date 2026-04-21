import { useState, useEffect, useCallback } from "react";
import type { User } from "@supabase/supabase-js";
import { LEVELS } from "../data/index";
import { supabase, isSupabaseReady } from "../lib/supabaseClient";
import type { QuizResult, ExamResult } from "../types";

const STORAGE_KEY = "agent-kit-progress";
const QUIZ_RESULTS_KEY = "agent-kit-quiz-results";
const EXAM_RESULTS_KEY = "agent-kit-exam-results";

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
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [examResults, setExamResults] = useState<ExamResult[]>([]);

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

        const { data: quizData } = await supabase
          .from("quiz_results")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        
        if (quizData) {
          setQuizResults(quizData.map((r) => ({
            id: r.id,
            levelId: r.level_id,
            sectionId: r.section_id,
            score: r.score,
            total: r.total,
            answers: r.answers,
            passed: r.score >= 90,
            timestamp: new Date(r.created_at).getTime()
          })));
        }

        const { data: examData } = await supabase
          .from("exam_results")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        
        if (examData) {
          setExamResults(examData.map((r) => ({
            id: r.id,
            levelId: r.level_id,
            score: r.score,
            total: r.total,
            answers: r.answers,
            passed: r.passed,
            timestamp: new Date(r.created_at).getTime()
          })));
        }
      } else if (isGuest) {
        const saved = localStorage.getItem(STORAGE_KEY);
        setChecked(saved ? JSON.parse(saved) : {});

        const savedQuizResults = localStorage.getItem(QUIZ_RESULTS_KEY);
        setQuizResults(savedQuizResults ? JSON.parse(savedQuizResults) : []);

        const savedExamResults = localStorage.getItem(EXAM_RESULTS_KEY);
        setExamResults(savedExamResults ? JSON.parse(savedExamResults) : []);
      } else {
        setChecked({});
        setQuizResults([]);
        setExamResults([]);
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

  const saveQuizResult = useCallback(async (result: QuizResult) => {
    if (user && isSupabaseReady && supabase) {
      const existingResult = quizResults.find(r => r.levelId === result.levelId && r.sectionId === result.sectionId);
      
      if (existingResult?.id) {
        const { error } = await supabase
          .from("quiz_results")
          .update({
            score: result.score,
            total: result.total,
            answers: result.answers,
          })
          .eq("id", existingResult.id);
        
        if (error) {
          console.error("Error updating quiz result to Supabase:", error);
        }
      } else {
        const { error } = await supabase.from("quiz_results").insert({
          user_id: user.id,
          level_id: result.levelId,
          section_id: result.sectionId,
          score: result.score,
          total: result.total,
          answers: result.answers,
        });
        if (error) {
          console.error("Error saving quiz result to Supabase:", error);
        }
      }
      
      setQuizResults(prev => {
        const filtered = prev.filter(r => !(r.levelId === result.levelId && r.sectionId === result.sectionId));
        return [...filtered, result];
      });
    } else if (isGuest) {
      setQuizResults(prev => {
        const filtered = prev.filter(r => !(r.levelId === result.levelId && r.sectionId === result.sectionId));
        const newResults = [...filtered, { ...result, id: `guest-${Date.now()}` }];
        localStorage.setItem(QUIZ_RESULTS_KEY, JSON.stringify(newResults));
        return newResults;
      });
    }
  }, [user, isGuest, quizResults]);

  const saveExamResult = useCallback(async (result: ExamResult) => {
    if (user && isSupabaseReady && supabase) {
      const existingResult = examResults.find(r => r.levelId === result.levelId);
      
      if (existingResult?.id) {
        const { error } = await supabase
          .from("exam_results")
          .update({
            score: result.score,
            total: result.total,
            passed: result.passed,
            answers: result.answers,
          })
          .eq("id", existingResult.id);
        
        if (error) {
          console.error("Error updating exam result to Supabase:", error);
        }
      } else {
        const { error } = await supabase.from("exam_results").insert({
          user_id: user.id,
          level_id: result.levelId,
          score: result.score,
          total: result.total,
          passed: result.passed,
          answers: result.answers,
        });
        if (error) {
          console.error("Error saving exam result to Supabase:", error);
        }
      }
      
      setExamResults(prev => {
        const filtered = prev.filter(r => r.levelId !== result.levelId);
        return [...filtered, result];
      });
    } else if (isGuest) {
      setExamResults(prev => {
        const filtered = prev.filter(r => r.levelId !== result.levelId);
        const newResults = [...filtered, { ...result, id: `guest-${Date.now()}` }];
        localStorage.setItem(EXAM_RESULTS_KEY, JSON.stringify(newResults));
        return newResults;
      });
    }
  }, [user, isGuest, examResults]);

  const getBestQuizResult = useCallback((levelId: string, sectionId: string): QuizResult | null => {
    const results = quizResults.filter(r => r.levelId === levelId && r.sectionId === sectionId);
    if (results.length === 0) return null;
    return results.reduce((best, current) => current.score > best.score ? current : best);
  }, [quizResults]);

  const getBestExamResult = useCallback((levelId: string): ExamResult | null => {
    const results = examResults.filter(r => r.levelId === levelId);
    if (results.length === 0) return null;
    return results.reduce((best, current) => current.score > best.score ? current : best);
  }, [examResults]);

  const getPassedExamResult = useCallback((levelId: string): ExamResult | null => {
    const passed = examResults.filter(r => r.levelId === levelId && r.passed);
    if (passed.length === 0) return null;
    return passed.reduce((best, current) => current.timestamp > best.timestamp ? current : best);
  }, [examResults]);

  const hasPassedQuiz = useCallback((levelId: string, sectionId: string): boolean => {
    const best = getBestQuizResult(levelId, sectionId);
    return best !== null && best.passed;
  }, [getBestQuizResult]);

  const hasPassedExam = useCallback((levelId: string): boolean => {
    const best = getBestExamResult(levelId);
    return best !== null && best.passed;
  }, [getBestExamResult]);

  return { checked, key, toggle, levelStats, secStats, totalStats, syncProgress, loading, quizResults, examResults, saveQuizResult, saveExamResult, getBestQuizResult, getBestExamResult, getPassedExamResult, hasPassedQuiz, hasPassedExam };
}
