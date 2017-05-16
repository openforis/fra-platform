DROP TABLE eof_odp_class_values;
DROP TABLE eof_odp_class;
DROP TABLE eof_odp;
DROP TABLE eof_odp_version;

CREATE TABLE odp_version(
  id BIGSERIAL PRIMARY KEY,
  forest_area NUMERIC,
  calculated BOOLEAN,
  year NUMERIC(4)
);

CREATE TABLE odp(
  id BIGSERIAL PRIMARY KEY,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL ,
  draft_id BIGINT REFERENCES odp_version (id),
  actual_id BIGINT REFERENCES odp_version (id)
);

CREATE TABLE odp_class(
  id BIGSERIAL PRIMARY KEY,
  odp_version_id BIGINT REFERENCES odp_version NOT NULL,
  name VARCHAR(512),
  definition VARCHAR(1024)
);

CREATE TABLE odp_class_values(
  id BIGSERIAL PRIMARY KEY,
  odp_class_id BIGINT REFERENCES odp_class NOT NULL,
  area NUMERIC,
  forest_percent NUMERIC,
  other_wooded_land_percent NUMERIC,
  other_percent NUMERIC,
  forest_natural_percent NUMERIC,
  forest_natural_primary_percent NUMERIC,
  forest_semi_natural_percent NUMERIC,
  forest_semi_natural_introduced_percent NUMERIC,
  forest_plantation_percent NUMERIC,
  forest_plantation_introduced_percent NUMERIC
);