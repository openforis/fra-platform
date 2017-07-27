ALTER TABLE fra_user
  ADD COLUMN lang VARCHAR(2);

ALTER TABLE fra_user
  ALTER COLUMN lang SET DEFAULT 'en';

UPDATE
  fra_user
SET lang = 'en';

ALTER TABLE fra_user
  ALTER COLUMN lang SET NOT NULL;
