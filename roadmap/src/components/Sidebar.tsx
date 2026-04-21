import { LEVELS } from "../data/index";
import type { ProgressStats, ExamResult } from "../types";
import type { User } from "@supabase/supabase-js";
import { canAccessLevel, getUnlockRequirements, getUnlockTooltip } from "../utils/unlockLogic";
import { LevelLock } from "./LevelLock";
import { formatHourRange, parseDurationToHourRange } from "../utils/durationHours";

interface SidebarProps {
  lvlIdx: number;
  setLvlIdx: (idx: number) => void;
  secIdx: number;
  setSecIdx: (idx: number) => void;
  setOpenItem: (idx: number | null) => void;
  levelStats: (li: number) => ProgressStats;
  examResults: ExamResult[];
  levelColor: string;
  user: User | null;
  onLogout: () => void;
}

export function Sidebar({ lvlIdx, setLvlIdx, secIdx, setSecIdx, setOpenItem, levelStats, examResults, levelColor, user, onLogout }: SidebarProps) {
  return (
    <div className="w-[220px] shrink-0 border-r border-border flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto py-2">
        {LEVELS.map((lv, li) => {
          const st = levelStats(li);
          const active = li === lvlIdx;
          const isLocked = !canAccessLevel(li, examResults);
          const requirements = getUnlockRequirements(li);
          const tooltip = getUnlockTooltip(li);
          const hoursRange = parseDurationToHourRange(lv.duration);

          return (
            <div key={li}>
              {isLocked ? (
                <LevelLock
                  color={lv.color}
                  title={lv.title}
                  requirements={requirements || ""}
                  number={lv.id}
                  tooltip={tooltip || undefined}
                />
              ) : (
                <button
                  onClick={() => { setLvlIdx(li); setSecIdx(0); setOpenItem(null); }}
                  className="w-full text-left px-4 py-[10px] border-l-[3px] transition-all duration-150"
                  style={{
                    borderLeftColor: active ? lv.color : "transparent",
                    backgroundColor: active ? `${lv.color}10` : "transparent",
                  }}
                >
                  <div className="flex justify-between items-center mb-[3px]">
                    <span
                      className="text-xs tracking-widest"
                      style={{ color: active ? lv.color : undefined }}
                    >
                      NIVEL {lv.id}
                    </span>
                    <span
                      className="text-xs"
                      style={{ color: st.pct > 0 ? lv.color : undefined }}
                    >
                      {st.pct}%
                    </span>
                  </div>
                  <div
                    className="text-sm mb-1 leading-[1.3]"
                    style={{ color: active ? undefined : undefined }}
                  >
                    {lv.title}
                  </div>
                  <div className="text-xs text-text-faint">
                    {lv.duration}
                    {hoursRange ? ` · ${formatHourRange(hoursRange)}` : ""}
                    {" · "}
                    {lv.team}
                  </div>
                  {st.t > 0 && (
                    <div className="mt-[6px] h-[2px] bg-border-light rounded-[1px] overflow-hidden">
                      <div
                        className="h-full transition-all duration-300 rounded-[1px]"
                        style={{ width: `${st.pct}%`, backgroundColor: lv.color }}
                      />
                    </div>
                  )}
                </button>
              )}

              {active && (
                <div className="pl-4 pb-1">
                  {lv.sections.map((s, si) => (
                    <button
                      key={si}
                      onClick={() => { setSecIdx(si); setOpenItem(null); }}
                      className="w-full text-left px-2 py-[5px] border-l-2 mb-[2px] bg-transparent transition-all duration-100"
                      style={{
                        borderLeftColor: si === secIdx ? `${lv.color}80` : undefined,
                      }}
                    >
                      <span
                        className="text-xs leading-[1.4]"
                        style={{ color: si === secIdx ? undefined : undefined }}
                      >
                        {s.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="p-3 border-t border-border justify-between">
        <span className="text-xs truncate text-text-mid">
          {user?.email || "Invitado"}
        </span>
        <br />
        <button
          onClick={onLogout}
          className="px-3 py-1 rounded text-xs tracking-widest transition-all duration-150"
          style={{ backgroundColor: levelColor, color: "#000" }}
        >
          SALIR
        </button>
      </div>
    </div>
  );
}
