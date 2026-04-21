import type { Level, ExamResult } from "../types";

interface CertificateViewProps {
  level: Level;
  examResult: ExamResult;
  userLabel: string;
}

function formatIssuedAt(timestampMs: number): string {
  const d = new Date(timestampMs);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "2-digit" });
}

export function CertificateView({ level, examResult, userLabel }: CertificateViewProps) {
  const issuedAt = formatIssuedAt(examResult.timestamp);
  const scoreLabel = `${examResult.score}%`;

  return (
    <div className="w-full flex justify-center">
      <div
        className="certificate-paper w-full max-w-[980px] rounded-xl border p-10"
        style={{
          borderColor: "#252D3D",
          backgroundColor: "#0F1117",
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <div className="text-xs tracking-widest" style={{ color: "#64748B" }}>
            CERTIFICADO DE APROBACIÓN
          </div>
          <div className="text-xs tracking-widest" style={{ color: "#64748B" }}>
            {issuedAt}
          </div>
        </div>

        <div className="mb-8">
          <div className="text-[11px] tracking-widest mb-2" style={{ color: level.color }}>
            NIVEL {level.id}
          </div>
          <div className="text-3xl font-bold mb-3" style={{ color: "#E2E8F0" }}>
            {level.title}
          </div>
          <div className="text-sm leading-relaxed" style={{ color: "#94A3B8" }}>
            Se certifica que <span style={{ color: "#E2E8F0" }}>{userLabel}</span> ha aprobado el examen del nivel con una
            puntuación de <span style={{ color: level.color }}>{scoreLabel}</span>.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="certificate-card rounded-lg border p-4" style={{ borderColor: "#252D3D", backgroundColor: "#161B27" }}>
            <div className="text-[11px] tracking-widest mb-1" style={{ color: "#64748B" }}>
              NIVEL
            </div>
            <div className="text-sm" style={{ color: "#E2E8F0" }}>
              {level.id}
            </div>
          </div>
          <div className="certificate-card rounded-lg border p-4" style={{ borderColor: "#252D3D", backgroundColor: "#161B27" }}>
            <div className="text-[11px] tracking-widest mb-1" style={{ color: "#64748B" }}>
              FECHA
            </div>
            <div className="text-sm" style={{ color: "#E2E8F0" }}>
              {issuedAt}
            </div>
          </div>
          <div className="certificate-card rounded-lg border p-4" style={{ borderColor: "#252D3D", backgroundColor: "#161B27" }}>
            <div className="text-[11px] tracking-widest mb-1" style={{ color: "#64748B" }}>
              PUNTUACIÓN
            </div>
            <div className="text-sm" style={{ color: "#E2E8F0" }}>
              {scoreLabel}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="text-xs" style={{ color: "#64748B" }}>
            Emitido automáticamente a partir de resultados del examen.
          </div>
          <div className="text-xs tracking-widest" style={{ color: level.color }}>
            AGENT FORGE
          </div>
        </div>
      </div>
    </div>
  );
}

