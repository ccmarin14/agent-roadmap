import { REFERENCES, getReferencesForItem } from "../data/references.js";

export function ContentView({ section, level, lvlIdx, secIdx, openItem, setOpenItem, checked, key_fn, toggle }) {
  const key = key_fn;
  return (
    <div className="max-w-full flex flex-col gap-[6px]">
      {section.items.map((item, ii) => {
        const open = openItem === ii;
        const itemChecked = item.checks.filter((_, ci) => checked[key(lvlIdx, secIdx, ii, ci)]).length;

        return (
          <div
            key={ii}
            className="rounded-md overflow-hidden transition-colors duration-150"
            style={{
              border: `1px solid ${open ? `${level.color}35` : "#252D3D"}`,
              backgroundColor: open ? `${level.color}06` : "#161B27",
            }}
          >
            <button
              onClick={() => setOpenItem(open ? null : ii)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-[6px] h-[6px] rounded-full flex-shrink-0 transition-colors duration-150"
                  style={{ backgroundColor: open ? level.color : "#252D3D" }}
                />
                <span
                  className="text-[15px]"
                  style={{
                    color: open ? "#E2E8F0" : "#94A3B8",
                    fontWeight: open ? "500" : "400",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {itemChecked > 0 && (
                  <span className="text-xs" style={{ color: level.color }}>
                    {itemChecked}/{item.checks.length}
                  </span>
                )}
                <span
                  className="text-sm transition-transform duration-150 inline-block"
                  style={{
                    color: open ? level.color : "#475569",
                    transform: open ? "rotate(45deg)" : "none",
                  }}
                >+</span>
              </div>
            </button>

            {open && (
              <div className="ani px-4 pb-4 pt-0" style={{ borderTop: `1px solid ${level.color}20` }}>
                <div
                  className="pt-3 text-sm leading-[1.85] whitespace-pre-line mb-4"
                  style={{ color: "#94A3B8" }}
                >
                  {item.body}
                </div>
                {item.references && item.references.length > 0 && (
                  <div className="mb-4 pt-3" style={{ borderTop: `1px solid ${level.color}20` }}>
                    <div className="text-xs tracking-widest mb-2" style={{ color: "#475569" }}>
                      REFERENCIAS
                    </div>
                    {item.references.map((refKey) => {
                      const refs = REFERENCES[refKey] || [];
                      return refs.map((ref, ri) => (
                        <a
                          key={ri}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-[10px] w-full text-left px-2 py-[6px] rounded transition-colors duration-100 mb-[2px] hover:bg-[#1e293b]"
                          style={{ textDecoration: "none" }}
                        >
                          <span className="text-xs mt-[2px]" style={{ color: level.color }}>↗</span>
                          <div>
                            <span className="text-sm block" style={{ color: "#E2E8F0" }}>{ref.title}</span>
                            <span className="text-xs block" style={{ color: "#64748B" }}>{ref.desc}</span>
                          </div>
                        </a>
                      ));
                    })}
                  </div>
                )}
                <div className="text-xs tracking-widest mb-2" style={{ color: "#475569" }}>
                  CRITERIOS DE DOMINIO
                </div>
                {item.checks.map((chk, ci) => {
                  const k = key(lvlIdx, secIdx, ii, ci);
                  const done = checked[k];
                  return (
                    <button
                      key={ci}
                      onClick={() => toggle(k)}
                      className="flex items-start gap-[10px] w-full text-left px-2 py-[6px] rounded transition-colors duration-100 mb-[2px]"
                      style={{
                        backgroundColor: done ? `${level.color}08` : "transparent",
                      }}
                    >
                      <div
                        className="w-[14px] h-[14px] min-w-[14px] mt-[1px] rounded flex items-center justify-center transition-all duration-150"
                        style={{
                          border: `1.5px solid ${done ? level.color : "#252D3D"}`,
                          backgroundColor: done ? `${level.color}20` : "transparent",
                        }}
                      >
                        {done && <div className="w-[6px] h-[6px] rounded-[1px]" style={{ backgroundColor: level.color }} />}
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        style={{
                          color: done ? "#475569" : "#94A3B8",
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
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
