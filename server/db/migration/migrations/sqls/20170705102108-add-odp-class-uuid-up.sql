CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE odp_class
  ADD COLUMN uuid UUID;

ALTER TABLE odp_class
  ALTER COLUMN uuid SET DEFAULT uuid_generate_v4();

UPDATE odp_class
SET uuid = uuid_generate_v4();
