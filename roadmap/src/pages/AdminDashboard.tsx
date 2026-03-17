import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ADMIN_EMAIL } from "../config";
import { useState as useState2, useEffect as useEffect2, useMemo as useMemo2 } from "react";
import { LEVELS } from "../data/index";
import { INACTIVE_DAYS_THRESHOLD } from "../config";

interface UserData {
  id: string;
  email: string;
  created_at: string;
  lastAccess: string | null;
  progress: {
    levelIdx: number;
    sectionIdx: number;
    itemIdx: number;
    checkIdx: number;
    completed: boolean;
    updatedAt: string;
  }[];
  quizResults: {
    levelId: string;
    sectionId: string;
    score: number;
    total: number;
    passed: boolean;
    createdAt: string;
  }[];
  examResults: {
    levelId: string;
    score: number;
    total: number;
    passed: boolean;
    createdAt: string;
  }[];
}

interface ActivityRecord {
  id: string;
  userEmail: string;
  type: "check" | "quiz" | "exam";
  detail: string;
  timestamp: string;
}

function getLevelProgress(levelIdx: number, progress: UserData["progress"]): { completed: number; total: number } {
  if (levelIdx >= LEVELS.length) return { completed: 0, total: 0 };
  
  const level = LEVELS[levelIdx];
  let total = 0;
  let completed = 0;
  
  level.sections.forEach((section, si) => {
    section.items.forEach((item, ii) => {
      item.checks.forEach((_, ci) => {
        total++;
        const isCompleted = progress.some(
          p => p.levelIdx === levelIdx && p.sectionIdx === si && p.itemIdx === ii && p.checkIdx === ci && p.completed
        );
        if (isCompleted) completed++;
      });
    });
  });
  
  return { completed, total };
}

function isLevelCompleted(levelIdx: number, progress: UserData["progress"]): boolean {
  const { completed, total } = getLevelProgress(levelIdx, progress);
  return total > 0 && completed === total;
}

function getCurrentLevel(progress: UserData["progress"]): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (isLevelCompleted(i, progress)) {
      return i + 1;
    }
  }
  return 0;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "Sin actividad";
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Ayer";
  if (diffDays < 7) return `Hace ${diffDays} días`;
  return date.toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" });
}

function isInactive(lastAccess: string | null): boolean {
  if (!lastAccess) return true;
  const date = new Date(lastAccess);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  return diffDays >= INACTIVE_DAYS_THRESHOLD;
}

function AdminDashboardContent() {
  const [users, setUsers] = useState2<UserData[]>([]);
  const [recentActivity, setRecentActivity] = useState2<ActivityRecord[]>([]);
  const [loading, setLoading] = useState2(true);
  const [filters, setFilters] = useState2({
    email: "",
    level: "",
    dateFrom: "",
    dateTo: "",
  });
  const [selectedUserId, setSelectedUserId] = useState2<string | null>(null);

  useEffect2(() => {
    const loadData = async () => {
      const client = supabase;
      if (!client) {
        setLoading(false);
        return;
      }

      const { data: profiles } = await client
        .from("profiles")
        .select("id, email, created_at")
        .order("created_at", { ascending: false });

      if (!profiles || profiles.length === 0) {
        setLoading(false);
        return;
      }

      const usersData: UserData[] = await Promise.all(
        profiles.map(async (profile) => {
          const { data: progressData } = await client
            .from("user_progress")
            .select("level_idx, section_idx, item_idx, check_idx, completed, updated_at")
            .eq("user_id", profile.id)
            .order("updated_at", { ascending: false });

          const { data: quizData } = await client
            .from("quiz_results")
            .select("level_id, section_id, score, total, passed, created_at")
            .eq("user_id", profile.id)
            .order("created_at", { ascending: false });

          const { data: examData } = await client
            .from("exam_results")
            .select("level_id, score, total, passed, created_at")
            .eq("user_id", profile.id)
            .order("created_at", { ascending: false });

          const lastProgress = progressData?.[0];
          const lastQuiz = quizData?.[0];
          const lastExam = examData?.[0];

          const timestamps = [lastProgress?.updated_at, lastQuiz?.created_at, lastExam?.created_at]
            .filter(Boolean)
            .sort((a, b) => new Date(b!).getTime() - new Date(a!).getTime());

          return {
            id: profile.id,
            email: profile.email,
            created_at: profile.created_at,
            lastAccess: timestamps[0] || null,
            progress: (progressData || []).map(p => ({
              levelIdx: p.level_idx,
              sectionIdx: p.section_idx,
              itemIdx: p.item_idx,
              checkIdx: p.check_idx,
              completed: p.completed,
              updatedAt: p.updated_at,
            })),
            quizResults: (quizData || []).map(q => ({
              levelId: q.level_id,
              sectionId: q.section_id,
              score: q.score,
              total: q.total,
              passed: q.passed,
              createdAt: q.created_at,
            })),
            examResults: (examData || []).map(e => ({
              levelId: e.level_id,
              score: e.score,
              total: e.total,
              passed: e.passed,
              createdAt: e.created_at,
            })),
          };
        })
      );

      setUsers(usersData);

      const activities: ActivityRecord[] = [];
      
      usersData.forEach(user => {
        user.progress.slice(0, 2).forEach(p => {
          const level = LEVELS[p.levelIdx];
          const section = level?.sections[p.sectionIdx];
          activities.push({
            id: `progress-${user.id}-${p.updatedAt}`,
            userEmail: user.email,
            type: "check",
            detail: `Nivel ${p.levelIdx + 1} - ${section?.title || 'Sección'} - Check completado`,
            timestamp: p.updatedAt,
          });
        });
      });

      usersData.forEach(user => {
        user.quizResults.slice(0, 1).forEach(q => {
          activities.push({
            id: `quiz-${user.id}-${q.createdAt}`,
            userEmail: user.email,
            type: "quiz",
            detail: `Quiz ${q.levelId}/${q.sectionId} - ${q.score}/${q.total}`,
            timestamp: q.createdAt,
          });
        });
      });

      usersData.forEach(user => {
        user.examResults.slice(0, 1).forEach(e => {
          activities.push({
            id: `exam-${user.id}-${e.createdAt}`,
            userEmail: user.email,
            type: "exam",
            detail: `Examen ${e.levelId} - ${e.score}/${e.total}`,
            timestamp: e.createdAt,
          });
        });
      });

      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivity(activities.slice(0, 5));

      setLoading(false);
    };

    loadData();
  }, []);

  const filteredUsers = useMemo2(() => {
    return users.filter(user => {
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false;
      }
      
      if (filters.level) {
        const currentLevel = getCurrentLevel(user.progress);
        if (currentLevel !== parseInt(filters.level)) {
          return false;
        }
      }
      
      if (filters.dateFrom && user.lastAccess) {
        if (new Date(user.lastAccess) < new Date(filters.dateFrom)) {
          return false;
        }
      }
      
      if (filters.dateTo && user.lastAccess) {
        if (new Date(user.lastAccess) > new Date(filters.dateTo)) {
          return false;
        }
      }
      
      return true;
    });
  }, [users, filters]);

  const hasActiveFilters = filters.email || filters.level || filters.dateFrom || filters.dateTo;

  const inactiveUsers = useMemo2(() => {
    return users.filter(u => isInactive(u.lastAccess)).length;
  }, [users]);

  const handleUserClick = (userId: string) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg text-text-dim font-mono text-[13px]">
        Cargando...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-bg text-text font-mono text-[13px] overflow-hidden">
      <div className="p-4 border-b border-border">
        <h1 className="text-lg font-bold mb-4">Dashboard de Administración</h1>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="p-4 bg-surface rounded border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-[11px] uppercase tracking-wider text-text">Usuarios Totales</span>
            </div>
            <div className="text-4xl font-bold text-text">{users.length}</div>
          </div>
          <div className="p-4 bg-surface rounded border border-border">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              <span className="text-[11px] uppercase tracking-wider text-text">Inactivos ({INACTIVE_DAYS_THRESHOLD} días)</span>
            </div>
            <div className="text-4xl font-bold text-orange-400">{inactiveUsers}</div>
          </div>
          <div className="p-4 bg-surface rounded border border-border col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-[11px] uppercase tracking-wider text-text">Progreso Reciente</span>
            </div>
            <div className="space-y-1">
              {recentActivity.length === 0 ? (
                <div className="text-text-dim text-[11px]">Sin actividad reciente</div>
              ) : (
                recentActivity.map((activity, idx) => (
                  <div key={idx} className="text-[11px] flex justify-between gap-2">
                    <span className="text-text-dim">{activity.userEmail}</span>
                    <span className="text-text-dim shrink-0">{activity.detail}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Buscar por email..."
            value={filters.email}
            onChange={(e) => setFilters(f => ({ ...f, email: e.target.value }))}
            className="px-3 py-2 bg-bg border border-border rounded text-[13px] outline-none focus:border-text-dim flex-1"
          />
          <select
            value={filters.level}
            onChange={(e) => setFilters(f => ({ ...f, level: e.target.value }))}
            className="px-3 py-2 bg-bg border border-border rounded text-[13px] outline-none focus:border-text-dim"
          >
            <option value="">Todos los niveles</option>
            {LEVELS.map((level, idx) => (
              <option key={idx} value={idx}>{level.title}</option>
            ))}
          </select>
          <div className="relative">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => setFilters(f => ({ ...f, dateFrom: e.target.value }))}
              className="px-3 py-2 pr-8 bg-bg border border-border rounded text-[13px] outline-none focus:border-text-dim"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none">📅</span>
          </div>
          <div className="relative">
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => setFilters(f => ({ ...f, dateTo: e.target.value }))}
              className="px-3 py-2 pr-8 bg-bg border border-border rounded text-[13px] outline-none focus:border-text-dim"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-text-dim pointer-events-none">📅</span>
          </div>
          <button
            onClick={() => setFilters({ email: "", level: "", dateFrom: "", dateTo: "" })}
            disabled={!hasActiveFilters}
            className="px-3 py-2 bg-green-500/10 border border-green-500/30 rounded text-[13px] text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-green-500/10"
          >
            ✕ Limpiar
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-text-dim py-8">No hay usuarios que coincidan con los filtros</div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map(user => {
              const currentLevel = getCurrentLevel(user.progress);
              const levelProgress = currentLevel < LEVELS.length ? getLevelProgress(currentLevel, user.progress) : { completed: 0, total: 0 };
              const isSelected = selectedUserId === user.id;
              
              return (
                <div key={user.id}>
                  <div
                    onClick={() => handleUserClick(user.id)}
                    className={`p-3 rounded border cursor-pointer transition-colors ${
                      isSelected ? "bg-surface border-text-dim" : "bg-surface border-border hover:border-text-dim"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="truncate flex-1">{user.email}</span>
                      <span className={`text-xs ml-3 ${isInactive(user.lastAccess) ? "text-orange-400" : "text-text-dim"}`}>
                        {formatDate(user.lastAccess)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {LEVELS.map((_, idx) => {
                        const { completed, total } = getLevelProgress(idx, user.progress);
                        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                        const isCurrent = idx === currentLevel;
                        return (
                          <div
                            key={idx}
                            className={`flex-1 h-2 rounded-full bg-border overflow-hidden relative ${
                              isCurrent ? "ring-1 ring-text-dim" : ""
                            }`}
                          >
                            <div
                              className="h-full bg-green-500 rounded-full transition-all"
                              style={{ width: `${pct}%` }}
                            />
                            {isCurrent && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-1 h-1 bg-text rounded-full" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between mt-1 text-[11px] text-text-dim">
                      <span>Nivel {currentLevel + 1}</span>
                      {currentLevel < LEVELS.length && (
                        <span>{levelProgress.completed}/{levelProgress.total} checks</span>
                      )}
                    </div>
                  </div>
                  
                  {isSelected && (
                    <div className="mt-2 p-3 bg-bg border border-border rounded">
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-[11px] text-text-dim">CHECKS COMPLETADOS</div>
                          <div className="text-lg">{user.progress.filter(p => p.completed).length}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-text-dim">QUIZZES</div>
                          <div className="text-lg">{user.quizResults.length}</div>
                        </div>
                        <div>
                          <div className="text-[11px] text-text-dim">EXÁMENES</div>
                          <div className="text-lg">{user.examResults.length}</div>
                        </div>
                      </div>
                      
                      {user.quizResults.length > 0 && (
                        <div className="mb-2">
                          <div className="text-[11px] text-text-dim mb-1">RESULTADOS DE QUIZZES</div>
                          <div className="space-y-1">
                            {user.quizResults.map((q, idx) => (
                              <div key={idx} className="flex justify-between text-[11px]">
                                <span>{q.levelId}/{q.sectionId}</span>
                                <span className={q.passed ? "text-green-400" : "text-red-400"}>
                                  {q.score}/{q.total} ({q.passed ? "Aprobado" : "Reprobado"})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {user.examResults.length > 0 && (
                        <div>
                          <div className="text-[11px] text-text-dim mb-1">RESULTADOS DE EXÁMENES</div>
                          <div className="space-y-1">
                            {user.examResults.map((e, idx) => (
                              <div key={idx} className="flex justify-between text-[11px]">
                                <span>Nivel {e.levelId}</span>
                                <span className={e.passed ? "text-green-400" : "text-red-400"}>
                                  {e.score}/{e.total} ({e.passed ? "Aprobado" : "Reprobado"})
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

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
    return <AdminDashboardContent />;
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