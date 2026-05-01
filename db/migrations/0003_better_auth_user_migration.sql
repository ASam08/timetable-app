-- Migrate accountEnabled=false → banned=true
UPDATE users SET banned = true, ban_reason = 'Pending admin approval'
WHERE account_enabled = false;

UPDATE users SET banned = false
WHERE account_enabled = true OR account_enabled IS NULL;

-- Migrate existing passwords into account table
INSERT INTO "account" (
  id,
  account_id,
  provider_id,
  user_id,
  password,
  created_at,
  updated_at
)
SELECT
  gen_random_uuid()::text,
  id::text,
  'credential',
  id::uuid,
  password,
  COALESCE(created_at::timestamp, NOW()),
  COALESCE(updated_at::timestamp, NOW())
FROM users
WHERE password IS NOT NULL
  AND password != ''
  AND NOT EXISTS (
    SELECT 1 FROM account
    WHERE account.user_id = users.id
      AND account.provider_id = 'credential'
  );