import { LEVELS } from "../data/index";
import type { ExamResult } from "../types";

export interface ProgressStats {
  t: number;
  d: number;
  pct: number;
}

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
