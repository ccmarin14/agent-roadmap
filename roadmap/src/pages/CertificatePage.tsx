import { useEffect, useMemo } from "react";
import { Navigate, useLocation, useParams, useNavigate } from "react-router-dom";
import { LEVELS } from "../data/index";
import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import { CertificateView } from "../components/CertificateView";

function useQueryParam(name: string): string | null {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search).get(name), [name, search]);
}

export function CertificatePage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const autoPrint = useQueryParam("autoprint");

  const { user, isGuest, loading } = useAuth();
  const { getPassedExamResult } = useProgress({ user, isGuest });

  const level = LEVELS.find((l) => l.id === levelId);
  const passedExam = levelId ? getPassedExamResult(levelId) : null;

  useEffect(() => {
    if (!autoPrint) return;
    if (!passedExam) return;
    const t = window.setTimeout(() => window.print(), 150);
    return () => window.clearTimeout(t);
  }, [autoPrint, passedExam]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg text-text-dim font-mono text-[13px]">
        Cargando...
      </div>
    );
  }

  if (!user && !isGuest) {
    return <Navigate to="/" replace />;
  }

  if (!level || !levelId) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg text-text font-mono text-[13px] gap-4">
        <div style={{ color: "#94A3B8" }}>Nivel no encontrado.</div>
        <button
          className="no-print px-4 py-2 rounded text-sm"
          style={{ backgroundColor: "#1E2535", color: "#E2E8F0" }}
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    );
  }

  if (!passedExam) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-bg text-text font-mono text-[13px] gap-4">
        <div style={{ color: "#94A3B8" }}>
          No hay un examen aprobado para el Nivel {level.id}. Debes aprobar el examen para generar el certificado.
        </div>
        <button
          className="no-print px-4 py-2 rounded text-sm"
          style={{ backgroundColor: level.color, color: "#000" }}
          onClick={() => navigate("/")}
        >
          Volver al roadmap
        </button>
      </div>
    );
  }

  const userLabel = user?.email || "Invitado";

  return (
    <div className="min-h-screen bg-bg text-text font-mono text-[13px]">
      <div className="no-print flex items-center justify-between px-6 py-4 border-b border-border bg-surface">
        <div className="text-xs tracking-widest" style={{ color: "#64748B" }}>
          CERTIFICADO · NIVEL {level.id}
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded text-sm"
            style={{ backgroundColor: "#1E2535", color: "#E2E8F0" }}
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
          <button
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ backgroundColor: level.color, color: "#000" }}
            onClick={() => window.print()}
          >
            Imprimir / Guardar PDF
          </button>
        </div>
      </div>

      <div className="p-6">
        <CertificateView level={level} examResult={passedExam} userLabel={userLabel} />
      </div>
    </div>
  );
}

