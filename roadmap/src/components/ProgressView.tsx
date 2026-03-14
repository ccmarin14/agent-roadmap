import { LEVELS } from "../data/index";
import type { ProgressStats } from "../types";

interface ProgressViewProps {
  lvlIdx: number;
  setLvlIdx: (idx: number) => void;
  setSecIdx: (idx: number) => void;
  setTab: (tab: string) => void;
  checked: Record<string, boolean>;
  key_fn: (li: number, si: number, ii: number, ci: number) => string;
  toggle: (k: string) => void;
  levelStats: (li: number) => ProgressStats;
}

export function ProgressView({ lvlIdx, setLvlIdx, setSecIdx, setTab, checked, key_fn, toggle, levelStats }: ProgressViewProps) {
  return (
    <div className="max-w-[860px]">
      <div className="mb-6">
        <div className="text-xs tracking-widest mb-[10px]" style={{ color: "#475569" }}>
          PROGRESO TOTAL DEL ROADMAP
        </div>
        <div className="flex gap-3 flex-wrap">
          {LEVELS.map((lv, li) => {
            const st = levelStats(li);
            return (
              <div
                key={li}
                onClick={() => { setLvlIdx(li); setSecIdx(0); setTab("content"); }}
                className="cursor-pointer px-4 py-3 rounded-md min-w-[160px] flex-1 transition-colors duration-150"
                style={{
                  border: `1px solid ${li === lvlIdx ? `${lv.color}40` : "#252D3D"}`,
                  backgroundColor: li === lvlIdx ? `${lv.color}08` : "#161B27",
                }}
              >
                <div className="text-[11px] tracking-widest mb-1" style={{ color: lv.color }}>
                  NIVEL {lv.id}
                </div>
                <div className="text-sm mb-2" style={{ color: "#94A3B8" }}>
                  {lv.title}
                </div>
                <div className="h-[3px] bg-border-light rounded-[2px] overflow-hidden mb-1">
                  <div
                    className="h-full transition-all duration-300 rounded-[2px]"
                    style={{ width: `${st.pct}%`, backgroundColor: lv.color }}
                  />
                </div>
                <div className="text-xs" style={{ color: st.pct > 0 ? lv.color : "#65738b" }}>
                  {st.d}/{st.t} · {st.pct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {LEVELS.map((lv, li) => (
        <div key={li} className="mb-7">
          <div className="flex items-center gap-[10px] mb-3 pb-2 border-b border-border">
            <span className="text-xs tracking-widest" style={{ color: lv.color }}>
              NIVEL {lv.id} — {lv.title.toUpperCase()}
            </span>
          </div>

          {lv.sections.map((s, si) => (
            <div key={si} className="mb-4">
              <div className="text-xs mb-2 pl-1 tracking-wider" style={{ color: "#475569" }}>
                {s.title}
              </div>
              {s.items.map((item, ii) => (
                <div key={ii} className="mb-[10px]">
                  <div className="text-sm mb-1 pl-3" style={{ color: "#475569" }}>
                    {item.label}
                  </div>
                  {item.checks.map((chk, ci) => {
                    const k = key_fn(li, si, ii, ci);
                    const done = checked[k];
                    const checkText = typeof chk === 'string' ? chk : chk.text;
                    return (
                      <button
                        key={ci}
                        onClick={() => toggle(k)}
                        className="flex items-start gap-[10px] w-full text-left px-3 py-[5px] rounded transition-colors duration-100 mb-[1px]"
                        style={{
                          backgroundColor: done ? `${lv.color}06` : "transparent",
                        }}
                      >
                        <div
                          className="w-[13px] h-[13px] min-w-[13px] mt-[2px] rounded flex items-center justify-center transition-all duration-150"
                          style={{
                            border: `1.5px solid ${done ? lv.color : "#252D3D"}`,
                            backgroundColor: done ? `${lv.color}20` : "transparent",
                          }}
                        >
                          {done && <div className="w-[5px] h-[5px] rounded-[1px]" style={{ backgroundColor: lv.color }} />}
                        </div>
                        <span
                          className="text-sm leading-relaxed"
                          style={{
                            color: done ? "#65738b" : "#94A3B8",
                            textDecoration: done ? "line-through" : "none",
                          }}
                        >
                          {checkText}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
