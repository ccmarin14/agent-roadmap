import { C } from "../theme.js";
import { LEVELS } from "../data/index.js";

export function ProgressView({ lvlIdx, setLvlIdx, setSecIdx, setTab, checked, key, toggle, levelStats }) {
  return (
    <div style={{ maxWidth: "860px" }}>
      {/* Level summary cards */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "12px", color: C.textDim, letterSpacing: "2px", marginBottom: "10px" }}>
          PROGRESO TOTAL DEL ROADMAP
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {LEVELS.map((lv, li) => {
            const st = levelStats(li);
            return (
              <div
                key={li}
                onClick={() => { setLvlIdx(li); setSecIdx(0); setTab("content"); }}
                style={{
                  cursor: "pointer", padding: "12px 16px", borderRadius: "6px",
                  border: `1px solid ${li === lvlIdx ? lv.color + "40" : C.border}`,
                  background: li === lvlIdx ? `${lv.color}08` : C.surface,
                  minWidth: "160px", flex: "1",
                }}
              >
                <div style={{ fontSize: "11px", color: lv.color, letterSpacing: "2px", marginBottom: "4px" }}>
                  NIVEL {lv.id}
                </div>
                <div style={{ fontSize: "14px", color: C.textMid, marginBottom: "8px" }}>
                  {lv.title}
                </div>
                <div style={{ height: "3px", background: C.borderLight, borderRadius: "2px", overflow: "hidden", marginBottom: "4px" }}>
                  <div style={{ height: "100%", width: `${st.pct}%`, background: lv.color, borderRadius: "2px", transition: "width .3s" }} />
                </div>
                <div style={{ fontSize: "12px", color: st.pct > 0 ? lv.color : C.textFaint }}>
                  {st.d}/{st.t} · {st.pct}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full checklist */}
      {LEVELS.map((lv, li) => (
        <div key={li} style={{ marginBottom: "28px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: "10px",
            marginBottom: "12px", paddingBottom: "8px",
            borderBottom: `1px solid ${C.border}`,
          }}>
            <span style={{ fontSize: "12px", color: lv.color, letterSpacing: "2px" }}>
              NIVEL {lv.id} — {lv.title.toUpperCase()}
            </span>
          </div>

          {lv.sections.map((s, si) => (
            <div key={si} style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "12px", color: C.textDim, marginBottom: "8px", paddingLeft: "4px", letterSpacing: "1px" }}>
                {s.title}
              </div>
              {s.items.map((item, ii) => (
                <div key={ii} style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "13px", color: C.textDim, marginBottom: "4px", paddingLeft: "12px" }}>
                    {item.label}
                  </div>
                  {item.checks.map((chk, ci) => {
                    const k = key(li, si, ii, ci);
                    const done = checked[k];
                    return (
                      <button
                        key={ci}
                        onClick={() => toggle(k)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "10px",
                          width: "100%", textAlign: "left",
                          padding: "5px 12px", borderRadius: "3px",
                          background: done ? `${lv.color}06` : "transparent",
                          marginBottom: "1px", fontFamily: "inherit",
                          transition: "background .1s",
                        }}
                      >
                        <div style={{
                          width: "13px", height: "13px", minWidth: "13px", marginTop: "2px",
                          borderRadius: "3px",
                          border: `1.5px solid ${done ? lv.color : C.border}`,
                          background: done ? `${lv.color}20` : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          transition: "all .15s",
                        }}>
                          {done && <div style={{ width: "5px", height: "5px", background: lv.color, borderRadius: "1px" }} />}
                        </div>
                        <span style={{
                          fontSize: "13px",
                          color: done ? C.textFaint : C.textMid,
                          textDecoration: done ? "line-through" : "none",
                          lineHeight: "1.6",
                        }}>
                          {chk}
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
