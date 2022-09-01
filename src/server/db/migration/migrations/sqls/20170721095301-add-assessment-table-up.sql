
CREATE TYPE assessment_type AS ENUM ('annuallyReported', 'fiveYearCycle');
CREATE TYPE assessment_status as ENUM ('editing', 'review', 'accepted');
-- New enum values can be added later like this:
-- ALTER TYPE name ADD VALUE new_enum_value [ { BEFORE | AFTER } existing_enum_value ]
-- https://www.postgresql.org/docs/9.6/static/sql-altertype.html

CREATE TABLE assessment (
  country_iso  VARCHAR(3) NOT NULL,
  type         assessment_type NOT NULL,
  status       assessment_status NOT NULL,
  PRIMARY KEY (country_iso, type)
);
