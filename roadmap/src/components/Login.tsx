import { useState } from "react";
import { ALLOW_GUESTS, isSupabaseConfigured } from "../config";

interface LoginProps {
  onComplete: () => void;
  login: (email: string, password: string) => Promise<void>;
  continueAsGuest: () => void;
}

export function Login({ onComplete, login, continueAsGuest }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      onComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    onComplete();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-bg z-50">
      <div className="w-full max-w-[360px] bg-surface border border-border rounded-lg p-8">
        <div className="text-center mb-7">
          <div className="text-[13px] tracking-[3px] mb-2">
            AGENTES DE IA
          </div>
          <div className="text-sm text-text-mid">
            De cero a orquestación en equipo
          </div>
        </div>

        {ALLOW_GUESTS && (
          <>
            <button
              onClick={handleGuest}
              className="w-full py-3 bg-border-light border border-border rounded-md text-text-mid text-[13px] hover:bg-surface-hover transition-colors"
              style={{backgroundColor: "#323b52" }}
            >
              Continuar como invitado
            </button>

            <div className="flex items-center my-6 text-border">
              <div className="flex-1 h-px bg-border" />
              <span className="px-3 text-[11px] text-text-dim">O</span>
              <div className="flex-1 h-px bg-border" />
            </div>
          </>
        )}

        {isSupabaseConfigured ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-[11px] text-text-dim mb-1.5 tracking-wide">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-bg border border-border rounded text-text text-[13px] outline-none focus:border-text-dim"
              />
            </div>

            <div className="mb-5">
              <label className="block text-[11px] text-text-dim mb-1.5 tracking-wide">
                CONTRASEÑA
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2.5 bg-bg border border-border rounded text-text text-[13px] outline-none focus:border-text-dim"
              />
            </div>

            {error && (
              <div className="p-2.5 bg-red-900/20 border border-red-500 rounded text-red-400 text-xs mb-4">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-md text-[13px] font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#22c55e", color: "#000" }}
            >
              {loading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>
          </form>
        ) : (
          <div className="text-center py-5 text-text-dim text-xs">
            No hay autenticación configurada.
            <br />
            Solo disponible modo invitado.
          </div>
        )}
      </div>
    </div>
  );
}
