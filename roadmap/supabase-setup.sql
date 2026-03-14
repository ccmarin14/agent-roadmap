-- ============================================
-- TABLAS PARA ROADMAP AGENTES IA
-- ============================================

-- Tabla de perfiles (extiende auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Tabla de progreso del usuario
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  level text not null,
  section int not null,
  item int not null,
  check_item int not null,
  completed boolean default false,
  completed_at timestamptz,
  created_at timestamptz default now(),
  unique(user_id, level, section, item, check_item)
);

-- Tabla de exámenes
create table public.exams (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  score int,
  total_questions int,
  completed_at timestamptz default now(),
  created_at timestamptz default now()
);

-- ============================================
-- HABILITAR RLS (Row Level Security)
-- ============================================

alter table public.profiles enable row level security;
alter table public.user_progress enable row level security;
alter table public.exams enable row level security;

-- ============================================
-- POLÍTICAS RLS
-- ============================================

-- Profiles: usuario solo puede ver su propio perfil
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- User Progress: usuario solo puede ver/modificar su propio progreso
create policy "Users can view own progress" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Users can insert own progress" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Users can update own progress" on public.user_progress
  for update using (auth.uid() = user_id);

create policy "Users can delete own progress" on public.user_progress
  for delete using (auth.uid() = user_id);

-- Exams: usuario solo puede ver/modificar sus propios exámenes
create policy "Users can view own exams" on public.exams
  for select using (auth.uid() = user_id);

create policy "Users can insert own exams" on public.exams
  for insert with check (auth.uid() = user_id);

create policy "Users can update own exams" on public.exams
  for update using (auth.uid() = user_id);

create policy "Users can delete own exams" on public.exams
  for delete using (auth.uid() = user_id);

-- ============================================
-- FUNCIÓN AUTO-CREAR PERFIL AL REGISTRAR
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger para crear perfil automáticamente
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
