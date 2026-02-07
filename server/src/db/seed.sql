INSERT INTO categories (id, name)
VALUES
  ('sslc', 'SSLC (Class 10)'),
  ('puc_science', 'PUC Science (PU1 + PU2)'),
  ('puc_commerce', 'PUC Commerce (PU1 + PU2)')
ON CONFLICT (id) DO NOTHING;

INSERT INTO products (id, category_id, title, type, duration_months, price, is_active)
VALUES
  (gen_random_uuid(), 'sslc', 'SSLC Full-year Batch', 'full_year', 12, 4999, TRUE),
  (gen_random_uuid(), 'sslc', 'SSLC Crash Course', 'crash', 3, 1299, TRUE),
  (gen_random_uuid(), 'puc_science', 'PU Science Full-year Batch', 'full_year', 12, 6999, TRUE),
  (gen_random_uuid(), 'puc_commerce', 'PU Commerce Full-year Batch', 'full_year', 12, 5999, TRUE)
ON CONFLICT DO NOTHING;

WITH science_subject AS (
  INSERT INTO subjects (id, category_id, name)
  VALUES (gen_random_uuid(), 'sslc', 'Science')
  RETURNING id
),
light_chapter AS (
  INSERT INTO chapters (id, subject_id, name)
  SELECT gen_random_uuid(), id, 'Light'
  FROM science_subject
  RETURNING id
),
refraction_topic AS (
  INSERT INTO topics (id, chapter_id, name)
  SELECT gen_random_uuid(), id, 'Refraction'
  FROM light_chapter
  RETURNING id
)
INSERT INTO lessons (id, topic_id, title, duration_minutes, is_free, video_url, notes_url)
SELECT gen_random_uuid(), id, 'Refractive Index Basics', 12, TRUE,
       'https://www.youtube.com/watch?v=nMYMD0lrYpM',
       'https://example.com/notes/refraction.pdf'
FROM refraction_topic;
