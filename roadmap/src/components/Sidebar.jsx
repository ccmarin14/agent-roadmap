import { C } from "../theme.js";
import { LEVELS } from "../data/index.js";

export function Sidebar({ lvlIdx, setLvlIdx, secIdx, setSecIdx, setOpenItem, levelStats }) {
  return (
    <div style={{
      width: "220px", flexShrink: 0,
      borderRight: `1px solid ${C.border}`,
      display: "flex", flexDirection: "column",
      overflow: "hidden",
    }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
        {LEVELS.map((lv, li) => {
          const st = levelStats(li);
          const active = li === lvlIdx;
          return (
            <div key={li}>
              <button
                onClick={() => { setLvlIdx(li); setSecIdx(0); setOpenItem(null); }}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "10px 16px",
                  borderLeft: `3px solid ${active ? lv.color : "transparent"}`,
                  background: active ? `${lv.color}10` : "transparent",
                  transition: "all .15s",
                }}
              >
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "center", marginBottom: "3px",
                }}>
                  <span style={{ fontSize: "12px", color: active ? lv.color : C.textDim, letterSpacing: "1px" }}>
                    NIVEL {lv.id}
                  </span>
                  <span style={{ fontSize: "12px", color: st.pct > 0 ? lv.color : C.textFaint }}>
                    {st.pct}%
                  </span>
                </div>
                <div style={{ color: active ? C.text : C.textDim, fontSize: "14px", marginBottom: "4px", lineHeight: "1.3" }}>
                  {lv.title}
                </div>
                <div style={{ fontSize: "12px", color: C.textFaint }}>
                  {lv.duration} · {lv.team}
                </div>
                {st.t > 0 && (
                  <div style={{ marginTop: "6px", height: "2px", background: C.borderLight, borderRadius: "1px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${st.pct}%`, background: lv.color, transition: "width .3s", borderRadius: "1px" }} />
                  </div>
                )}
              </button>

              {active && (
                <div style={{ paddingLeft: "16px", paddingBottom: "4px" }}>
                  {lv.sections.map((s, si) => (
                    <button
                      key={si}
                      onClick={() => { setSecIdx(si); setOpenItem(null); }}
                      style={{
                        width: "100%", textAlign: "left",
                        padding: "5px 8px",
                        borderLeft: `2px solid ${si === secIdx ? lv.color + "80" : C.borderLight}`,
                        marginBottom: "2px", background: "transparent",
                        transition: "all .1s",
                      }}
                    >
                      <span style={{ fontSize: "12px", color: si === secIdx ? C.textMid : C.textDim, lineHeight: "1.4" }}>
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
    </div>
  );
}
