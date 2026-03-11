import { C } from "../theme.js";

export function SectionHeader({ level, secIdx, setSecIdx, setOpenItem, secStats, lvlIdx }) {
  return (
    <div style={{
      padding: "14px 24px 12px",
      borderBottom: `1px solid ${C.border}`,
      flexShrink: 0,
      background: C.surface,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: level.color, letterSpacing: "1px" }}>
          NIVEL {level.id} · {level.title.toUpperCase()}
        </span>
        <span style={{ color: C.border }}>·</span>
        <span style={{ fontSize: "12px", color: C.textDim }}>👥 {level.team}</span>
      </div>

      <div style={{ color: C.textMid, fontSize: "13px", lineHeight: "1.6", maxWidth: "600px", marginBottom: "10px" }}>
        {level.desc}
      </div>

      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {level.sections.map((s, si) => {
          const ss = secStats(lvlIdx, si);
          const active = si === secIdx;
          return (
            <button
              key={si}
              onClick={() => { setSecIdx(si); setOpenItem(null); }}
              style={{
                padding: "4px 12px", borderRadius: "4px", fontSize: "12px",
                background: active ? `${level.color}18` : C.borderLight,
                color: active ? level.color : C.textDim,
                border: `1px solid ${active ? level.color + "40" : "transparent"}`,
                fontFamily: "inherit", transition: "all .1s",
                display: "flex", alignItems: "center", gap: "5px",
              }}
            >
              {s.title}
              {ss.pct > 0 && <span style={{ opacity: 0.7 }}>{ss.pct}%</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
