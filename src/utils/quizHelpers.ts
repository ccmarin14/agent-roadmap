import { LEVELS } from "../data/index";
import type { Quiz, QuizQuestion, QuizResult, ExamResult, ProgressStats } from "../types";

export function getQuizForSection(levelIdx: number, sectionIdx: number): Quiz | undefined {
  const level = LEVELS[levelIdx];
  if (!level) return undefined;
  
  const section = level.sections[sectionIdx];
  return section?.quiz;
}

function shuffleArray<T>(array: readonly T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getExamForLevel(levelIdx: number): Quiz {
  const level = LEVELS[levelIdx];
  if (!level) {
    return { questions: [], passingScore: 90 };
  }

  const quizQuestions: QuizQuestion[] = [];
  const examQuestions = level.examQuestions || [];
  
  for (const section of level.sections) {
    if (section.quiz) {
      quizQuestions.push(...section.quiz.questions);
    }
  }

  const totalQuestions = quizQuestions.length + examQuestions.length;
  const quizCount = Math.round(totalQuestions * 0.6);
  const examCount = Math.round(totalQuestions * 0.4);

  const shuffledQuiz = shuffleArray(quizQuestions);
  const shuffledExam = shuffleArray(examQuestions);

  const selectedQuiz = shuffledQuiz.slice(0, Math.min(quizCount, quizQuestions.length));
  const selectedExam = shuffledExam.slice(0, Math.min(examCount, examQuestions.length));

  const combined = shuffleArray([...selectedQuiz, ...selectedExam]);

  return {
    questions: combined,
    passingScore: 90
  };
}

export function calculateScore(quiz: Quiz, answers: Record<string, number>): { score: number; passed: boolean } {
  if (quiz.questions.length === 0) {
    return { score: 0, passed: false };
  }

  let correct = 0;
  for (const question of quiz.questions) {
    const selectedAnswer = answers[question.id];
    if (selectedAnswer === question.correctIndex) {
      correct++;
    }
  }

  const score = Math.round((correct / quiz.questions.length) * 100);
  const passed = score >= quiz.passingScore;

  return { score, passed };
}

export function getAvailableQuizzesForLevel(levelIdx: number): Array<{ sectionIdx: number; sectionId: string; sectionTitle: string; quiz: Quiz }> {
  const level = LEVELS[levelIdx];
  if (!level) return [];

  const quizzes: Array<{ sectionIdx: number; sectionId: string; sectionTitle: string; quiz: Quiz }> = [];

  level.sections.forEach((section, idx) => {
    if (section.quiz) {
      quizzes.push({
        sectionIdx: idx,
        sectionId: section.id,
        sectionTitle: section.title,
        quiz: section.quiz
      });
    }
  });

  return quizzes;
}

export function getQuizzesRequiredForExam(levelIdx: number): Array<{ sectionId: string; sectionTitle: string }> {
  const level = LEVELS[levelIdx];
  if (!level) return [];

  return level.sections
    .filter(section => section.quiz)
    .map(section => ({
      sectionId: section.id,
      sectionTitle: section.title
    }));
}

export function canAccessExam(levelIdx: number, quizResults: QuizResult[]): { canAccess: boolean; passedCount: number; totalRequired: number } {
  const level = LEVELS[levelIdx];
  if (!level) return { canAccess: false, passedCount: 0, totalRequired: 0 };

  const quizzesRequired = getQuizzesRequiredForExam(levelIdx);
  const totalRequired = quizzesRequired.length;
  
  if (totalRequired === 0) {
    return { canAccess: false, passedCount: 0, totalRequired: 0 };
  }

  let passedCount = 0;
  for (const quiz of quizzesRequired) {
    const result = quizResults.find(r => r.levelId === level.id && r.sectionId === quiz.sectionId);
    if (result && result.passed) {
      passedCount++;
    }
  }

  const canAccess = passedCount === totalRequired;

  return { canAccess, passedCount, totalRequired };
}

export function canAccessExamFromStats(levelIdx: number, getLevelStats: (li: number) => ProgressStats): boolean {
  return getLevelStats(levelIdx).pct >= 90;
}

export function getUnlockExamRequirements(levelIdx: number): string {
  const level = LEVELS[levelIdx];
  if (!level) return "";
  
  const quizzes = getQuizzesRequiredForExam(levelIdx);
  return `Requiere ${quizzes.length} quiz${quizzes.length !== 1 ? 's' : ''} aprobado${quizzes.length !== 1 ? 's' : ''} del nivel`;
}

export function createQuizResult(
  levelId: string,
  sectionId: string,
  quiz: Quiz,
  answers: Record<string, number>
): QuizResult {
  const { score, passed } = calculateScore(quiz, answers);
  
  return {
    levelId,
    sectionId,
    score,
    total: quiz.questions.length,
    answers,
    passed,
    timestamp: Date.now()
  };
}

export function createExamResult(
  levelId: string,
  quiz: Quiz,
  answers: Record<string, number>
): ExamResult {
  const { score, passed } = calculateScore(quiz, answers);
  
  return {
    levelId,
    score,
    total: quiz.questions.length,
    answers,
    passed,
    timestamp: Date.now()
  };
}
