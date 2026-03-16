import { useState } from "react";
import type { Quiz as QuizType, Level, Section, QuizResult } from "../types";

interface QuizProps {
  quiz: QuizType;
  level: Level;
  section: Section;
  previousResult?: QuizResult | null;
  onComplete: (result: QuizResult) => void;
  onClose: () => void;
}

export function Quiz({ quiz, level, section, previousResult, onComplete, onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [showAnswers, setShowAnswers] = useState(false);

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  const handleSelectOption = (optionIndex: number) => {
    if (showResult) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [question.id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    const correct = quiz.questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const result: QuizResult = {
      levelId: level.id,
      sectionId: section.id,
      score,
      total: quiz.questions.length,
      answers: selectedAnswers,
      passed,
      timestamp: Date.now()
    };

    setShowResult(true);
    onComplete(result);
  };

  const isAnswered = selectedAnswers[question.id] !== undefined;
  const isLastQuestion = currentQuestion === quiz.questions.length - 1;

  const getAnswerStatus = (questionId: string) => {
    const selected = selectedAnswers[questionId];
    const questionData = quiz.questions.find(q => q.id === questionId);
    if (!questionData) return "unanswered";
    return selected === questionData.correctIndex ? "correct" : "incorrect";
  };

  if (showResult || showAnswers) {
    const correct = quiz.questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;
    const score = Math.round((correct / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto">
          <div className="mb-6 text-center">
            <div
              className="text-4xl mb-2"
              style={{ color: passed ? level.color : "#F87171" }}
            >
              {passed ? "✓" : "✗"}
            </div>
            <h2
              className="text-xl font-bold"
              style={{ color: passed ? level.color : "#F87171" }}
            >
              {passed ? "¡Aprobado!" : "Intenta de nuevo"}
            </h2>
            <p className="text-lg mt-2" style={{ color: "#94A3B8" }}>
              Puntuación: <span style={{ color: level.color }}>{score}%</span>
            </p>
            <p className="text-sm" style={{ color: "#64748B" }}>
              {correct} de {quiz.questions.length} respuestas correctas
            </p>
          </div>

          <div className="space-y-3">
            {quiz.questions.map((q, idx) => {
              const status = getAnswerStatus(q.id);
              const selected = selectedAnswers[q.id];
              
              return (
                <div
                  key={q.id}
                  className="p-3 rounded-md"
                  style={{
                    backgroundColor: status === "correct" ? `${level.color}10` : status === "incorrect" ? "#F8717110" : "#1E2535",
                    border: `1px solid ${status === "correct" ? level.color : status === "incorrect" ? "#F87171" : "#252D3D"}`
                  }}
                >
                  <div className="flex gap-2 mb-2">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: status === "correct" ? level.color : status === "incorrect" ? "#F87171" : "#252D3D",
                        color: status === "unanswered" ? "#64748B" : "#000"
                      }}
                    >
                      {status === "correct" ? "✓" : status === "incorrect" ? "✗" : "?"}
                    </span>
                    <span className="text-sm" style={{ color: "#E2E8F0" }}>
                      {idx + 1}. {q.question}
                    </span>
                  </div>
                  <div className="text-sm pl-7" style={{ color: "#94A3B8" }}>
                    Tu respuesta: <span style={{ color: selected !== undefined ? "#E2E8F0" : "#64748B" }}>
                      {selected !== undefined ? q.options[selected] : "Sin responder"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4 border-t border-[#252D3D]">
          {!showAnswers && (
            <button
              onClick={() => setShowAnswers(true)}
              className="px-4 py-2 rounded text-sm transition-all duration-150"
              style={{
                backgroundColor: "#1E2535",
                color: "#94A3B8"
              }}
            >
              Ver mis respuestas
            </button>
          )}
          <button
            onClick={onClose}
            className="px-6 py-2 rounded text-sm font-medium transition-all duration-150"
            style={{
              backgroundColor: level.color,
              color: "#000"
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs tracking-widest" style={{ color: level.color }}>
            QUIZ · {section.title}
          </span>
          <span className="text-xs" style={{ color: "#64748B" }}>
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
        <div className="h-[2px] bg-[#252D3D] rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{ width: `${progress}%`, backgroundColor: level.color }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-lg mb-4" style={{ color: "#E2E8F0" }}>
            {question.question}
          </h3>

          <div className="flex flex-col gap-2">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswers[question.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left px-4 py-3 rounded-md transition-all duration-150"
                  style={{
                    backgroundColor: isSelected ? `${level.color}15` : "#1E2535",
                    border: `1.5px solid ${isSelected ? level.color : "#252D3D"}`,
                    color: isSelected ? "#E2E8F0" : "#94A3B8"
                  }}
                >
                  <span className="mr-3" style={{ color: isSelected ? level.color : "#475569" }}>
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t border-[#252D3D]">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className="px-4 py-2 rounded text-sm transition-all duration-150 disabled:opacity-30"
          style={{
            backgroundColor: "#1E2535",
            color: "#94A3B8"
          }}
        >
          Anterior
        </button>

        {isLastQuestion ? (
          <button
            onClick={handleFinish}
            disabled={!isAnswered}
            className="px-6 py-2 rounded text-sm font-medium transition-all duration-150 disabled:opacity-30"
            style={{
              backgroundColor: level.color,
              color: "#000"
            }}
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!isAnswered}
            className="px-6 py-2 rounded text-sm font-medium transition-all duration-150 disabled:opacity-30"
            style={{
              backgroundColor: level.color,
              color: "#000"
            }}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
