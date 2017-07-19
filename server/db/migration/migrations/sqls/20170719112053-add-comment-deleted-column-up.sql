ALTER TABLE
fra_comment
  ADD COLUMN deleted BOOLEAN;

UPDATE
  fra_comment
SET deleted = FALSE;

ALTER TABLE
fra_comment
  ALTER COLUMN deleted SET NOT NULL;

ALTER TABLE
fra_comment
  ALTER COLUMN deleted SET DEFAULT FALSE;
