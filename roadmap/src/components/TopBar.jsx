import { C } from "../theme.js";

export function TopBar({ level, tab, setTab, total }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", height: "48px",
      borderBottom: `1px solid ${C.border}`,
      flexShrink: 0,
      background: C.surface,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span style={{ color: C.textDim, fontSize: "13px", letterSpacing: "2px" }}>
          AGENTES DE IA
        </span>
        <span style={{ color: C.border }}>|</span>
        <span style={{ color: C.textMid, fontSize: "14px" }}>
          De cero a orquestación en equipo
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{
            height: "4px", width: "100px",
            background: C.borderLight, borderRadius: "2px", overflow: "hidden",
          }}>
            <div style={{
              height: "100%", width: `${total.pct}%`,
              background: level.color, borderRadius: "2px", transition: "width .3s",
            }} />
          </div>
          <span style={{ fontSize: "13px", color: C.textDim }}>
            {total.d}/{total.t}
          </span>
        </div>

        <div style={{ display: "flex", gap: "3px" }}>
          {["content", "progress"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "4px 12px", borderRadius: "4px",
                fontSize: "12px", letterSpacing: "1px",
                background: tab === t ? level.color : C.borderLight,
                color: tab === t ? "#000" : C.textDim,
                fontFamily: "inherit", transition: "all .15s",
              }}
            >
              {t === "content" ? "CONTENIDO" : "PROGRESO"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
