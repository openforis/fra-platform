-- This table holds information of exisitng schemas.
-- Each scehma is a new version of the database which has been "frozen"

CREATE TYPE fra_version_status AS ENUM (
  'pending',
  'running',
  'completed',
  'failed'
);

CREATE TABLE fra_version(
  id SERIAL  PRIMARY KEY NOT NULL,
  created_by INTEGER REFERENCES fra_user(id),
  version_number VARCHAR(255) NOT NULL,
  status fra_version_status NOT NULL,
  publish_time TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'UTC') NOT NULL,
  updated_at TIMESTAMP DEFAULT (now() AT TIME ZONE 'UTC') NOT NULL
);
