-- Tabla de progreso de usuario
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  level_idx INTEGER NOT NULL,
  section_idx INTEGER,
  item_idx INTEGER,
  check_idx INTEGER,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de resultados de quiz
CREATE TABLE quiz_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_key VARCHAR(255),
  level_id VARCHAR(10) NOT NULL,
  section_id VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Tabla de resultados de exámenes
CREATE TABLE exam_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  session_key VARCHAR(255),
  level_id VARCHAR(10) NOT NULL,
  score INTEGER NOT NULL,
  total INTEGER NOT NULL,
  time_seconds INTEGER,
  passed BOOLEAN NOT NULL,
  answers JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índices para optimizar queries
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX idx_quiz_results_session_key ON quiz_results(session_key);
CREATE INDEX idx_exam_results_user_id ON exam_results(user_id);
CREATE INDEX idx_exam_results_session_key ON exam_results(session_key);

-- RLS
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own progress" ON user_progress
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users see own results" ON quiz_results
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users see own results exam" ON exam_results
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);
