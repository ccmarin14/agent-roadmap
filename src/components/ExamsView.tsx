import { useState } from "react";
import { LEVELS } from "../data/index";
import type { Level, Quiz as QuizType, QuizResult, ExamResult, ProgressStats } from "../types";
import { getAvailableQuizzesForLevel, getExamForLevel, canAccessExam } from "../utils/quizHelpers";
import { Quiz } from "./Quiz";
import { Exam } from "./Exam";

interface ExamsViewProps {
  lvlIdx: number;
  levelStats: (li: number) => ProgressStats;
  quizResults: QuizResult[];
  examResults: ExamResult[];
  onQuizComplete: (result: QuizResult) => void;
  onExamComplete: (result: ExamResult) => void;
}

type ActiveQuiz = {
  type: "quiz";
  level: Level;
  sectionIdx: number;
  sectionId: string;
  sectionTitle: string;
  quiz: QuizType;
  previousResult?: QuizResult | null;
};

type ActiveExam = {
  type: "exam";
  level: Level;
  quiz: QuizType;
  previousResult?: ExamResult | null;
};

type ActiveEvaluation = ActiveQuiz | ActiveExam | null;

export function ExamsView({ lvlIdx, levelStats, quizResults, examResults, onQuizComplete, onExamComplete }: ExamsViewProps) {
  const [activeEval, setActiveEval] = useState<ActiveEvaluation>(null);

  const currentLevel = LEVELS[lvlIdx];
  const quizzes = getAvailableQuizzesForLevel(lvlIdx);

  if (activeEval) {
    if (activeEval.type === "quiz") {
      return (
        <div className="h-full flex flex-col">
          <Quiz
            quiz={activeEval.quiz}
            level={activeEval.level}
            section={{ id: activeEval.sectionId, title: activeEval.sectionTitle, items: [] }}
            previousResult={activeEval.previousResult}
            onComplete={(result) => {
              onQuizComplete(result);
            }}
            onClose={() => setActiveEval(null)}
          />
        </div>
      );
    } else {
      return (
        <div className="h-full flex flex-col">
          <Exam
            quiz={activeEval.quiz}
            level={activeEval.level}
            previousResult={activeEval.previousResult}
            onComplete={(result) => {
              onExamComplete(result);
            }}
            onClose={() => setActiveEval(null)}
          />
        </div>
      );
    }
  }

  return (
    <div className="max-w-[860px]">
      <div className="mb-6">
        <div className="text-xs tracking-widest mb-[10px]" style={{ color: "#475569" }}>
          EVALUACIONES DEL NIVEL ACTUAL
        </div>
        <div className="flex gap-3 flex-wrap">
          <div
            className="px-4 py-3 rounded-md min-w-[160px] flex-1"
            style={{
              border: `1px solid ${currentLevel.color}40`,
              backgroundColor: `${currentLevel.color}08`,
            }}
          >
            <div className="text-[11px] tracking-widest mb-1" style={{ color: currentLevel.color }}>
              NIVEL {currentLevel.id}
            </div>
            <div className="text-sm" style={{ color: "#94A3B8" }}>
              {currentLevel.title}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-[10px] mb-3 pb-2 border-b border-border">
          <span className="text-xs tracking-widest" style={{ color: currentLevel.color }}>
            QUIZZES DISPONIBLES
          </span>
        </div>

        {quizzes.length === 0 ? (
          <div className="text-sm p-4 rounded-md" style={{ backgroundColor: "#161B27", color: "#64748B" }}>
            No hay quizzes disponibles para este nivel aún.
          </div>
        ) : (
          <div className="grid gap-3">
            {quizzes.map((q) => {
              const quizResult = quizResults.find(r => r.levelId === currentLevel.id && r.sectionId === q.sectionId);
              const bestScore = quizResult ? quizResult.score : null;
              const passed = quizResult ? quizResult.passed : null;
              
              return (
                <button
                  key={q.sectionId}
                  onClick={() =>
                    setActiveEval({
                      type: "quiz",
                      level: currentLevel,
                      sectionIdx: q.sectionIdx,
                      sectionId: q.sectionId,
                      sectionTitle: q.sectionTitle,
                      quiz: q.quiz,
                      previousResult: quizResult
                    })
                  }
                  className="w-full text-left px-4 py-3 rounded-md transition-all duration-150"
                  style={{
                    border: `1px solid ${passed === true ? currentLevel.color : passed === false ? "#F87171" : "#252D3D"}`,
                    backgroundColor: "#161B27",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm mb-1" style={{ color: "#E2E8F0" }}>
                        {q.sectionTitle}
                      </div>
                      <div className="text-xs" style={{ color: "#64748B" }}>
                        {q.quiz.questions.length} preguntas · {q.quiz.passingScore}% para aprobar
                      </div>
                      {bestScore !== null && (
                        <div className="text-xs mt-1" style={{ color: passed ? currentLevel.color : "#F87171" }}>
                          {passed ? "Aprobado" : "Reprobado"} · Mejor puntuación: {bestScore}%
                        </div>
                      )}
                    </div>
                    <div
                      className="px-3 py-1 rounded text-xs"
                      style={{ 
                        backgroundColor: passed === true ? currentLevel.color : passed === false ? "#F87171" : `${currentLevel.color}20`, 
                        color: passed !== null ? "#000" : currentLevel.color 
                      }}
                    >
                      {passed === true ? "APROBADO" : passed === false ? "REPROBADO" : "HACER QUIZ"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center gap-[10px] mb-3 pb-2 border-b border-border">
          <span className="text-xs tracking-widest" style={{ color: "#475569" }}>
            EXAMEN DEL NIVEL ACTUAL
          </span>
        </div>

        <div className="grid gap-3">
          {(() => {
            const lv = currentLevel;
            const li = lvlIdx;
            const examQuiz = getExamForLevel(li);
            const { canAccess: isAccessible, passedCount, totalRequired } = canAccessExam(li, quizResults);
            const stats = levelStats(li);
            const examResult = examResults.find(r => r.levelId === lv.id);
            const bestExamScore = examResult ? examResult.score : null;
            const examPassed = examResult ? examResult.passed : null;

            if (examQuiz.questions.length === 0) {
              return (
                <div className="text-sm p-4 rounded-md" style={{ backgroundColor: "#161B27", color: "#64748B" }}>
                  No hay examen disponible para este nivel aún.
                </div>
              );
            }

            return (
              <div
                className="px-4 py-3 rounded-md"
                style={{
                  border: `1px solid ${examPassed === true ? lv.color : isAccessible ? `${lv.color}40` : "#252D3D"}`,
                  backgroundColor: isAccessible ? `${lv.color}08` : "#161B27",
                  opacity: isAccessible ? 1 : 0.6,
                }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm mb-1" style={{ color: isAccessible ? "#E2E8F0" : "#64748B" }}>
                      Examen Nivel {lv.id}
                    </div>
                    <div className="text-xs" style={{ color: "#64748B" }}>
                      {examQuiz.questions.length} preguntas · {examQuiz.passingScore}% para aprobar
                      {!isAccessible && ` · Requiere: ${passedCount}/${totalRequired} quizzes aprobados`}
                    </div>
                    {bestExamScore !== null && (
                      <div className="text-xs mt-1" style={{ color: examPassed ? lv.color : "#F87171" }}>
                        {examPassed ? "Aprobado" : "Reprobado"} · Mejor puntuación: {bestExamScore}%
                      </div>
                    )}
                    {isAccessible && (
                      <div className="text-xs mt-1" style={{ color: lv.color }}>
                        Progreso: {stats.pct}% · {passedCount}/{totalRequired} quizzes aprobados
                      </div>
                    )}
                  </div>
                  {isAccessible ? (
                    <button
                      onClick={() =>
                        setActiveEval({
                          type: "exam",
                          level: lv,
                          quiz: examQuiz,
                          previousResult: examResult
                        })
                      }
                      className="px-3 py-1 rounded text-xs transition-all duration-150"
                      style={{ 
                        backgroundColor: examPassed === true ? lv.color : examPassed === false ? "#F87171" : lv.color, 
                        color: "#000" 
                      }}
                    >
                      {examPassed === true ? "APROBADO" : examPassed === false ? "REPETIR" : "TOMAR EXAMEN"}
                    </button>
                  ) : (
                    <div
                      className="px-3 py-1 rounded text-xs"
                      style={{ backgroundColor: "#1E2535", color: "#475569" }}
                    >
                      BLOQUEADO
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
