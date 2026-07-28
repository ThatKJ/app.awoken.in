-- Seed data for development

INSERT INTO organizations (id, name) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Demo Real Estate');

INSERT INTO users (id, organization_id, name, email, password_hash) VALUES
  ('00000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000001', 'Alex Sterling', 'alex@demo.com', '$2a$10$placeholder_hash');

INSERT INTO workers (organization_id, type, mode) VALUES
  ('00000000-0000-0000-0000-000000000001', 'lead_response', 'assisted'),
  ('00000000-0000-0000-0000-000000000001', 'qualification', 'assisted'),
  ('00000000-0000-0000-0000-000000000001', 'followup', 'assisted'),
  ('00000000-0000-0000-0000-000000000001', 'recovery', 'assisted'),
  ('00000000-0000-0000-0000-000000000001', 'appointment', 'assisted');
