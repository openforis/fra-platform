DROP TABLE odp;
DROP TABLE odp_version;

CREATE TABLE area_unit(
  name VARCHAR(3) PRIMARY KEY,
  label VARCHAR(52)
);

INSERT INTO area_unit VALUES ('ha', '1 ha');

CREATE TABLE fa_odp_version(
  id BIGSERIAL PRIMARY KEY,
  value NUMERIC,
  unit_name VARCHAR(2) REFERENCES area_unit NOT NULL DEFAULT('ha'),
  calculated BOOLEAN,
  year NUMERIC(4)
);

CREATE TABLE fa_odp(
  id BIGSERIAL PRIMARY KEY,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL ,
  draft_id BIGINT REFERENCES fa_odp_version (id),
  actual_id BIGINT REFERENCES fa_odp_version (id)
);

CREATE TABLE fa_odp_class(
  id BIGSERIAL PRIMARY KEY,
  fa_odp_version_id BIGINT REFERENCES fa_odp_version NOT NULL,
  name VARCHAR(512),
  definition VARCHAR(1024)
);

CREATE TABLE fa_odp_class_values(
  id BIGSERIAL PRIMARY KEY,
  fa_odp_class_id BIGINT REFERENCES fa_odp_class NOT NULL,
  value NUMERIC,
  unit_name VARCHAR(2) REFERENCES area_unit NOT NULL DEFAULT('ha'),
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
