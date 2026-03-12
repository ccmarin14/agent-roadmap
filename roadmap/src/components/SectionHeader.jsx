export function SectionHeader({ level, secIdx, setSecIdx, setOpenItem, secStats, lvlIdx }) {
  return (
    <div className="px-6 py-3 border-b border-border flex-shrink-0 bg-surface">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs tracking-wider" style={{ color: level.color }}>
          NIVEL {level.id} · {level.title.toUpperCase()}
        </span>
        <span style={{ color: "#252D3D" }}>·</span>
        <span className="text-xs" style={{ color: "#475569" }}>👥 {level.team}</span>
      </div>

      <div className="text-[13px] leading-relaxed max-w-[600px] mb-2" style={{ color: "#94A3B8" }}>
        {level.desc}
      </div>

      <div className="flex gap-1 flex-wrap">
        {level.sections.map((s, si) => {
          const ss = secStats(lvlIdx, si);
          const active = si === secIdx;
          return (
            <button
              key={si}
              onClick={() => { setSecIdx(si); setOpenItem(null); }}
              className="px-3 py-1 rounded text-xs transition-all duration-100 flex items-center gap-[5px]"
              style={{
                backgroundColor: active ? `${level.color}18` : "#1E2535",
                color: active ? level.color : "#475569",
                border: active ? `1px solid ${level.color}40` : "1px solid transparent",
              }}
            >
              {s.title}
              {ss.pct > 0 && <span className="opacity-70">{ss.pct}%</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
