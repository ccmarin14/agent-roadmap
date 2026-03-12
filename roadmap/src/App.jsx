import { useState } from "react";
import { LEVELS } from "./data/index.js";
import { useProgress } from "./hooks/useProgress.js";
import { C } from "./theme.js";
import { TopBar } from "./components/TopBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { SectionHeader } from "./components/SectionHeader.jsx";
import { ContentView } from "./components/ContentView.jsx";
import { ProgressView } from "./components/ProgressView.jsx";

export default function App() {
  const [lvlIdx, setLvlIdx] = useState(0);
  const [secIdx, setSecIdx] = useState(0);
  const [openItem, setOpenItem] = useState(null);
  const [tab, setTab] = useState("content");

  const { checked, key, toggle, levelStats, secStats, totalStats } = useProgress();

  const level = LEVELS[lvlIdx];
  const section = level.sections[secIdx];
  const total = totalStats();

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh",
      background: C.bg, color: C.text,
      fontFamily: "'DM Mono', monospace",
      fontSize: "13px",
      overflow: "hidden",
    }}>
      <TopBar level={level} tab={tab} setTab={setTab} total={total} />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <Sidebar
          lvlIdx={lvlIdx} setLvlIdx={setLvlIdx}
          secIdx={secIdx} setSecIdx={setSecIdx}
          setOpenItem={setOpenItem}
          levelStats={levelStats}
        />

        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {tab === "content" && (
            <SectionHeader
              level={level}
              lvlIdx={lvlIdx}
              secIdx={secIdx} setSecIdx={setSecIdx}
              setOpenItem={setOpenItem}
              secStats={secStats}
            />
          )}

          <div
            style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}
            className="ani"
            key={`${lvlIdx}-${secIdx}-${tab}`}
          >
            {tab === "content" ? (
              <ContentView
                section={section}
                level={level}
                lvlIdx={lvlIdx}
                secIdx={secIdx}
                openItem={openItem}
                setOpenItem={setOpenItem}
                checked={checked}
                key_fn={key}
                toggle={toggle}
              />
            ) : (
              <ProgressView
                lvlIdx={lvlIdx}
                setLvlIdx={setLvlIdx}
                setSecIdx={setSecIdx}
                setTab={setTab}
                checked={checked}
                key_fn={key}
                toggle={toggle}
                levelStats={levelStats}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
