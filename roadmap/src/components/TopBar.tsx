import type { Level, ProgressStats } from "../types";

interface TopBarProps {
  level: Level;
  tab: "content" | "progress" | "exams";
  setTab: React.Dispatch<React.SetStateAction<"content" | "progress" | "exams">>;
  total: ProgressStats;
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export function TopBar({ level, tab, setTab, total, onToggleSidebar, sidebarOpen }: TopBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 sm:px-5 py-2 sm:h-12 border-b border-border shrink-0 bg-surface relative gap-2">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          className="md:hidden p-2 -ml-2 rounded hover:bg-surface-hover transition-colors"
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={sidebarOpen ?? false}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 5.5A.75.75 0 0 1 3.75 4.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.5Zm0 4.5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 10Zm0 4.5a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 14.5Z" clipRule="evenodd" />
          </svg>
        </button>
        <span className="text-[13px] tracking-widest">
          AGENTES DE IA
        </span>
        <span className="text-border hidden sm:inline">|</span>
        <span className="text-sm text-text-mid truncate hidden sm:inline">
          De cero a orquestación en equipo
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-end">
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
          {(["content", "progress", "exams"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-3 py-1 rounded text-xs tracking-widest transition-all duration-150"
              style={{
                backgroundColor: tab === t ? level.color : undefined,
                color: tab === t ? "#000" : undefined,
              }}
            >
              {t === "content" ? "CONTENIDO" : t === "progress" ? "PROGRESO" : "EVALUACIONES"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
