export interface Check {
  text: string;
}

export type CheckItem = string | Check;

export interface Item {
  label: string;
  body: string;
  references?: string[];
  checks: CheckItem[];
}

export interface Section {
  id: string;
  title: string;
  items: Item[];
}

export interface Level {
  id: string;
  title: string;
  color: string;
  duration: string;
  team: string;
  desc: string;
  sections: Section[];
}

export interface Reference {
  id: string;
  title: string;
  url: string;
}

export interface ProgressStats {
  t: number;
  d: number;
  pct: number;
}

export interface UseProgressReturn {
  checked: Record<string, boolean>;
  key: (li: number, si: number, ii: number, ci: number) => string;
  toggle: (k: string) => void;
  levelStats: (li: number) => ProgressStats;
  secStats: (li: number, si: number) => ProgressStats;
  totalStats: () => ProgressStats;
}
