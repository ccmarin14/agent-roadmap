import { useState } from "react";
import { LEVELS } from "./data/index";
import { useProgress } from "./hooks/useProgress";
import { useAuth } from "./hooks/useAuth";
import { C } from "./theme";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { SectionHeader } from "./components/SectionHeader";
import { ContentView } from "./components/ContentView";
import { ProgressView } from "./components/ProgressView";
import { Login } from "./components/Login";

export default function App() {
  const [lvlIdx, setLvlIdx] = useState(0);
  const [secIdx, setSecIdx] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [tab, setTab] = useState<"content" | "progress">("content");

  const { checked, key, toggle, levelStats, secStats, totalStats } = useProgress();
  const { user, isGuest, loading, login, logout, continueAsGuest } = useAuth();

  const level = LEVELS[lvlIdx];
  const section = level.sections[secIdx];
  const total = totalStats();

  if (loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: C.bg,
        color: C.textDim,
        fontSize: "13px",
      }}>
        Cargando...
      </div>
    );
  }

  if (!user && !isGuest) {
    return (
      <Login
        onComplete={() => {}}
        login={login}
        continueAsGuest={continueAsGuest}
      />
    );
  }

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
          user={user}
          onLogout={logout}
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
