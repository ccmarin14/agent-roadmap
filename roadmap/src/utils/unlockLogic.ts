import { LEVELS } from "../data/index";
import type { ExamResult } from "../types";

export interface ProgressStats {
  t: number;
  d: number;
  pct: number;
}

const EXAM_PASSING_SCORE_PCT = 90;

export function canAccessLevel(
  levelIdx: number,
  examResults: ExamResult[]
): boolean {
  if (levelIdx === 0) return true;

  const prevLevel = LEVELS[levelIdx - 1];
  const examResult = examResults.find(r => r.levelId === prevLevel.id);
  
  return examResult ? examResult.passed : false;
}

export function getUnlockRequirements(levelIdx: number): string {
  if (levelIdx === 0) return "";

  const prevLevel = LEVELS[levelIdx - 1];
  return `Aprobar el examen del Nivel ${prevLevel.id} para desbloquear`;
}

export function getUnlockTooltip(levelIdx: number): string {
  if (levelIdx === 0) return "";
  const prevLevel = LEVELS[levelIdx - 1];
  return `Para desbloquear: aprueba el examen del Nivel ${prevLevel.id} (≥${EXAM_PASSING_SCORE_PCT}%) en EVALUACIONES.`;
}
