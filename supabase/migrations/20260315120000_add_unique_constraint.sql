-- Agregar constraint unique para upsert en user_progress
ALTER TABLE user_progress 
ADD CONSTRAINT user_progress_unique UNIQUE (user_id, level_idx, section_idx, item_idx, check_idx);
