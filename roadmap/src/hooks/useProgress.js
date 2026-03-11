import { useState, useEffect } from "react";
import { LEVELS } from "../data/index.js";

const STORAGE_KEY = "agent-kit-progress";

export function useProgress() {
  const [checked, setChecked] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  const key = (li, si, ii, ci) => `${li},${si},${ii},${ci}`;

  const toggle = (k) => setChecked((prev) => ({ ...prev, [k]: !prev[k] }));

  const levelStats = (li) => {
    let t = 0, d = 0;
    LEVELS[li].sections.forEach((s, si) =>
      s.items.forEach((it, ii) =>
        it.checks.forEach((_, ci) => {
          t++;
          if (checked[key(li, si, ii, ci)]) d++;
        })
      )
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  const secStats = (li, si) => {
    let t = 0, d = 0;
    LEVELS[li].sections[si].items.forEach((it, ii) =>
      it.checks.forEach((_, ci) => {
        t++;
        if (checked[key(li, si, ii, ci)]) d++;
      })
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  const totalStats = () => {
    let t = 0, d = 0;
    LEVELS.forEach((lv, li) =>
      lv.sections.forEach((s, si) =>
        s.items.forEach((it, ii) =>
          it.checks.forEach((_, ci) => {
            t++;
            if (checked[key(li, si, ii, ci)]) d++;
          })
        )
      )
    );
    return { t, d, pct: t ? Math.round((d / t) * 100) : 0 };
  };

  return { checked, key, toggle, levelStats, secStats, totalStats };
}
