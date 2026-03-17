import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ADMIN_EMAIL } from "../config";

export function AdminDashboard() {
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!supabase) {
      setError("Supabase no está configurado");
      setLoading(false);
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    if (authError) {
      setError("Contraseña incorrecta");
      setLoading(false);
    } else {
      setIsVerified(true);
      setLoading(false);
    }
  };

  if (isVerified) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg text-text font-mono text-[13px]">
        Panel de Reportes - EN CONSTRUCCIÓN
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-bg text-text font-mono text-[13px]">
      <form onSubmit={handleVerify} className="flex flex-col gap-4 w-80">
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
            placeholder="Contraseña"
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
          {loading ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
