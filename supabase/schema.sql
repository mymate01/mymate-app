-- Schema for Career Guidance Platform

-- Extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enum for Learning Module Types
CREATE TYPE learning_module_type AS ENUM ('3d_interactive', 'practice_pad', 'quiz');

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY, -- Intended to map to auth.users in Supabase
    email TEXT NOT NULL UNIQUE,
    current_standard TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Career Paths Table
CREATE TABLE career_paths (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    ai_generated_content JSONB
);

-- Goals Table
CREATE TABLE goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    path_id UUID REFERENCES career_paths(id) ON DELETE CASCADE,
    step_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending'
);

-- Job Alerts Table
CREATE TABLE job_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_title TEXT NOT NULL,
    company TEXT,
    source_url TEXT,
    matched_path_id UUID REFERENCES career_paths(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning Modules Table
CREATE TABLE learning_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    type learning_module_type NOT NULL,
    content_data JSONB
);

-- Assessments Table
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
    target_exam TEXT,
    questions JSONB
);

-- User Progress Table
CREATE TABLE user_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    module_id UUID REFERENCES learning_modules(id) ON DELETE CASCADE,
    score INT,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Scraping Sources Table
CREATE TABLE scraping_sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    target_url TEXT NOT NULL,
    css_selectors JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    last_scraped_at TIMESTAMPTZ
);
