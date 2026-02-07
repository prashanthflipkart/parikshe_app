-- Parikshe core schema (MVP)

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  category VARCHAR(32) NOT NULL,
  grade VARCHAR(16) NOT NULL,
  exam_month VARCHAR(16),
  language_pref VARCHAR(32),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(32) PRIMARY KEY,
  name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY,
  category_id VARCHAR(32) REFERENCES categories(id),
  title VARCHAR(128) NOT NULL,
  type VARCHAR(24) NOT NULL,
  duration_months INT,
  price INT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  source VARCHAR(32) DEFAULT 'manual',
  last_synced_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  status VARCHAR(24) NOT NULL,
  amount INT NOT NULL,
  payment_order_id VARCHAR(64),
  payment_id VARCHAR(64),
  payment_status VARCHAR(24),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS access_grants (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY,
  category_id VARCHAR(32) REFERENCES categories(id),
  name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS chapters (
  id UUID PRIMARY KEY,
  subject_id UUID REFERENCES subjects(id),
  name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY,
  chapter_id UUID REFERENCES chapters(id),
  name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY,
  topic_id UUID REFERENCES topics(id),
  title VARCHAR(128) NOT NULL,
  duration_minutes INT DEFAULT 0,
  is_free BOOLEAN DEFAULT FALSE,
  video_url TEXT,
  notes_url TEXT
);

CREATE TABLE IF NOT EXISTS live_classes (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  title VARCHAR(128) NOT NULL,
  teacher_name VARCHAR(128),
  starts_at TIMESTAMP NOT NULL,
  duration_minutes INT DEFAULT 0,
  recording_url TEXT
);

CREATE TABLE IF NOT EXISTS tests (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  title VARCHAR(128) NOT NULL,
  duration_minutes INT NOT NULL,
  question_count INT NOT NULL,
  is_free BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY,
  test_id UUID REFERENCES tests(id),
  prompt TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option CHAR(1) NOT NULL,
  explanation TEXT
);

CREATE TABLE IF NOT EXISTS attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  test_id UUID REFERENCES tests(id),
  score INT DEFAULT 0,
  accuracy FLOAT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attempt_answers (
  id UUID PRIMARY KEY,
  attempt_id UUID REFERENCES attempts(id),
  question_id VARCHAR(64) NOT NULL,
  selected_index INT,
  is_correct BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY,
  actor VARCHAR(64),
  action VARCHAR(64),
  entity VARCHAR(64),
  entity_id VARCHAR(64),
  payload JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sync_logs (
  id UUID PRIMARY KEY,
  source VARCHAR(64),
  status VARCHAR(24),
  synced_count INT,
  details JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS coupons (
  id UUID PRIMARY KEY,
  code VARCHAR(32) UNIQUE NOT NULL,
  type VARCHAR(24) NOT NULL,
  discount_percent INT,
  is_open BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS offers (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  coupon_id UUID REFERENCES coupons(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(128) NOT NULL,
  body TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS doubts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  subject_id UUID REFERENCES subjects(id),
  chapter_id UUID REFERENCES chapters(id),
  message TEXT NOT NULL,
  attachment_url TEXT,
  status VARCHAR(24) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT NOW()
);
