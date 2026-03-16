import type { Level, ProgressStats } from "../types";

interface TopBarProps {
  level: Level;
  tab: "content" | "progress";
  setTab: React.Dispatch<React.SetStateAction<"content" | "progress">>;
  total: ProgressStats;
}

export function TopBar({ level, tab, setTab, total }: TopBarProps) {
  return (
    <div className="flex items-center justify-between px-5 h-12 border-b border-border flex-shrink-0 bg-surface relative">
      <div className="flex items-center gap-4">
        <span className="text-[13px] tracking-widest">
          AGENTES DE IA
        </span>
        <span className="text-border">|</span>
        <span className="text-sm text-text-mid">
          De cero a orquestación en equipo
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-[6px]">
          <div className="h-1 w-[100px] bg-border-light rounded-[2px] overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-[2px]"
              style={{ width: `${total.pct}%`, backgroundColor: level.color }}
            />
          </div>
          <span className="text-[13px]">
            {total.d}/{total.t}
          </span>
        </div>

        <div className="flex gap-[3px]">
          {(["content", "progress"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1 rounded text-xs tracking-widest transition-all duration-150"
              style={{
                backgroundColor: tab === t ? level.color : undefined,
                color: tab === t ? "#000" : undefined,
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
