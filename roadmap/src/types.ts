export interface Check {
  text: string;
}

export type CheckItem = string | Check;

export type Item = {
  readonly label: string;
  readonly body: string;
  readonly references?: readonly string[];
  readonly checks: readonly CheckItem[];
};

export type Section = {
  readonly id: string;
  readonly title: string;
  readonly items: readonly Item[];
};

export type Level = {
  readonly id: string;
  readonly title: string;
  readonly color: string;
  readonly duration: string;
  readonly team: string;
  readonly desc: string;
  readonly sections: readonly Section[];
};

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
