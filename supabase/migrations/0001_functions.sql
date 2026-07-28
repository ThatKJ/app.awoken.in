-- Helper function: create organization with first user
-- Called after Supabase Auth signup

CREATE OR REPLACE FUNCTION create_organization_with_user(
  user_id UUID,
  user_name TEXT,
  user_email TEXT,
  org_name TEXT
) RETURNS void AS $$
DECLARE
  org_id UUID;
BEGIN
  -- Create organization
  INSERT INTO organizations (id, name)
  VALUES (gen_random_uuid(), org_name)
  RETURNING id INTO org_id;

  -- Create user profile
  INSERT INTO users (id, organization_id, name, email, password_hash)
  VALUES (user_id, org_id, user_name, user_email, '');

  -- Create default workers
  INSERT INTO workers (organization_id, type, mode) VALUES
    (org_id, 'lead_response', 'assisted'),
    (org_id, 'qualification', 'assisted'),
    (org_id, 'followup', 'assisted'),
    (org_id, 'recovery', 'assisted'),
    (org_id, 'appointment', 'assisted');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
