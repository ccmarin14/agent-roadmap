interface LevelLockProps {
  color: string;
  requirements: string;
  title: string;
  number: string;
  tooltip?: string;
}

export function LevelLock({ color, requirements, title, number, tooltip }: LevelLockProps) {
  return (
    <div
      className="w-full text-left px-4 py-[10px] border-l-[3px] transition-all duration-150 opacity-60 cursor-not-allowed"
      style={{ borderLeftColor: "transparent" }}
      title={tooltip}
    >
      <div className="flex justify-between items-center mb-[3px]">
        <span className="text-xs tracking-widest flex items-center gap-1" style={{ color }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M8 1a4 4 0 0 0-4 4v2H3a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4ZM6 5a2 2 0 0 1 4 0v2H6V5Z"
              clipRule="evenodd"
            />
          </svg>
          NIVEL {number}
        </span>
      </div>
      <div className="text-sm mb-1 leading-[1.3]">{title}</div>
      <div className="text-xs text-text-faint">{requirements}</div>
    </div>
  );
}
