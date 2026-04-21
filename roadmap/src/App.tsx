import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LEVELS } from "./data/index";
import { useProgress } from "./hooks/useProgress";
import { useAuth } from "./hooks/useAuth";
import { TopBar } from "./components/TopBar";
import { Sidebar } from "./components/Sidebar";
import { SectionHeader } from "./components/SectionHeader";
import { ContentView } from "./components/ContentView";
import { ProgressView } from "./components/ProgressView";
import { ExamsView } from "./components/ExamsView";
import { Login } from "./components/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { CertificatePage } from "./pages/CertificatePage";
import { canAccessLevel } from "./utils/unlockLogic";

export default function App() {
  const [lvlIdx, setLvlIdx] = useState(0);
  const [secIdx, setSecIdx] = useState(0);
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [tab, setTab] = useState<"content" | "progress" | "exams">("content");

  const { user, isGuest, loading, login, logout, continueAsGuest } = useAuth();
  const { checked, key, toggle, levelStats, secStats, totalStats, saveQuizResult, saveExamResult, quizResults, examResults } = useProgress({ user, isGuest });

  const level = LEVELS[lvlIdx];
  const section = level.sections[secIdx];
  const total = totalStats();

  const handleSetLvlIdx = (newLvlIdx: number) => {
    if (canAccessLevel(newLvlIdx, examResults)) {
      setLvlIdx(newLvlIdx);
      setSecIdx(0);
      setOpenItem(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-bg text-text-dim text-[13px]">
        Cargando...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        !user && !isGuest ? (
          <Login
            onComplete={() => {}}
            login={login}
            continueAsGuest={continueAsGuest}
          />
        ) : (
          <div className="flex flex-col h-screen bg-bg text-text font-mono text-[13px] overflow-hidden">
            <TopBar level={level} tab={tab} setTab={setTab} total={total} />

            <div className="flex flex-1 overflow-hidden">
              <Sidebar
                lvlIdx={lvlIdx} setLvlIdx={handleSetLvlIdx}
                secIdx={secIdx} setSecIdx={setSecIdx}
                setOpenItem={setOpenItem}
                levelStats={levelStats}
                examResults={examResults}
                levelColor={level.color}
                user={user}
                onLogout={logout}
              />

              <div className="flex-1 overflow-hidden flex flex-col">
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
                  className="ani flex-1 overflow-y-auto"
                  style={{ padding: "16px 24px" }}
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
                      levelStats={levelStats}
                      examResults={examResults}
                    />
                  ) : tab === "progress" ? (
                    <ProgressView
                      lvlIdx={lvlIdx}
                      setLvlIdx={setLvlIdx}
                      setSecIdx={setSecIdx}
                      setTab={setTab}
                      checked={checked}
                      key_fn={key}
                      toggle={toggle}
                      levelStats={levelStats}
                      examResults={examResults}
                    />
                  ) : (
                    <ExamsView
                      lvlIdx={lvlIdx}
                      levelStats={levelStats}
                      quizResults={quizResults}
                      examResults={examResults}
                      onQuizComplete={saveQuizResult}
                      onExamComplete={saveExamResult}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      } />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/certificate/:levelId" element={<CertificatePage />} />
    </Routes>
  );
}
