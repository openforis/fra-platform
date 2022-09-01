ALTER TABLE fra_user
  ADD COLUMN active BOOLEAN;

ALTER TABLE fra_user
  ALTER COLUMN active SET DEFAULT true;

UPDATE fra_user
SET active = true;

ALTER TABLE fra_user
  ALTER COLUMN active SET NOT NULL;

