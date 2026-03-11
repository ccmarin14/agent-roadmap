import { C } from "../theme.js";

export function ContentView({ section, level, lvlIdx, secIdx, openItem, setOpenItem, checked, key_fn, toggle }) {
  const key = key_fn;
  return (
    <div style={{ maxWidth: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
      {section.items.map((item, ii) => {
        const open = openItem === ii;
        const itemChecked = item.checks.filter((_, ci) => checked[key(lvlIdx, secIdx, ii, ci)]).length;

        return (
          <div
            key={ii}
            style={{
              borderRadius: "6px",
              border: `1px solid ${open ? level.color + "35" : C.border}`,
              background: open ? `${level.color}06` : C.surface,
              overflow: "hidden",
              transition: "border-color .15s, background .15s",
            }}
          >
            <button
              onClick={() => setOpenItem(open ? null : ii)}
              style={{
                width: "100%", display: "flex", alignItems: "center",
                justifyContent: "space-between", padding: "12px 16px",
                fontFamily: "inherit", textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: open ? level.color : C.border,
                  flexShrink: 0, transition: "background .15s",
                }} />
                <span style={{
                  fontSize: "15px",
                  color: open ? C.text : C.textMid,
                  fontWeight: open ? "500" : "400",
                }}>
                  {item.label}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {itemChecked > 0 && (
                  <span style={{ fontSize: "12px", color: level.color }}>
                    {itemChecked}/{item.checks.length}
                  </span>
                )}
                <span style={{
                  color: open ? level.color : C.textDim,
                  fontSize: "14px",
                  transform: open ? "rotate(45deg)" : "none",
                  display: "inline-block",
                  transition: "transform .15s",
                }}>+</span>
              </div>
            </button>

            {open && (
              <div className="ani" style={{ padding: "0 16px 16px", borderTop: `1px solid ${level.color}20` }}>
                <div style={{
                  paddingTop: "14px",
                  color: C.textMid, fontSize: "14px",
                  lineHeight: "1.85", whiteSpace: "pre-line",
                  marginBottom: "16px",
                }}>
                  {item.body}
                </div>
                <div style={{ fontSize: "12px", color: C.textDim, letterSpacing: "2px", marginBottom: "8px" }}>
                  CRITERIOS DE DOMINIO
                </div>
                {item.checks.map((chk, ci) => {
                  const k = key(lvlIdx, secIdx, ii, ci);
                  const done = checked[k];
                  return (
                    <button
                      key={ci}
                      onClick={() => toggle(k)}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: "10px",
                        width: "100%", textAlign: "left",
                        padding: "6px 8px", borderRadius: "4px",
                        background: done ? `${level.color}08` : "transparent",
                        marginBottom: "2px", fontFamily: "inherit",
                        transition: "background .1s",
                      }}
                    >
                      <div style={{
                        width: "14px", height: "14px", minWidth: "14px", marginTop: "1px",
                        borderRadius: "3px",
                        border: `1.5px solid ${done ? level.color : C.border}`,
                        background: done ? `${level.color}20` : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all .15s",
                      }}>
                        {done && <div style={{ width: "6px", height: "6px", background: level.color, borderRadius: "1px" }} />}
                      </div>
                      <span style={{
                        fontSize: "14px",
                        color: done ? C.textDim : C.textMid,
                        textDecoration: done ? "line-through" : "none",
                        lineHeight: "1.6",
                      }}>
                        {chk}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
