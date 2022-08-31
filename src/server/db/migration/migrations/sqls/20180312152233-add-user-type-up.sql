CREATE TYPE FRA_USER_TYPE AS ENUM ('google', 'local');

ALTER TABLE
fra_user
  ADD COLUMN type FRA_USER_TYPE;

UPDATE fra_user
SET type = 'google';

ALTER TABLE
fra_user
  ALTER COLUMN type SET NOT NULL;
