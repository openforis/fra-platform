ALTER TABLE
fra_comment
  ADD COLUMN
  added_time TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC');


UPDATE
  fra_comment
SET
  added_time = (now() AT TIME ZONE 'UTC');

ALTER TABLE
fra_comment
  ALTER COLUMN
  added_time SET NOT NULL;
