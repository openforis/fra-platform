CREATE TABLE foc_fra_values (
  id BIGSERIAL PRIMARY KEY,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL,
  forest_area NUMERIC,
  natural_forest_area NUMERIC,
  natural_forest_primary_area NUMERIC,
  plantation_forest_area NUMERIC,
  platation_forest_introduced_area NUMERIC,
  other_planted_forest_area NUMERIC,
  year NUMERIC(4)
);

ALTER TABLE
foc_fra_values
  ADD COLUMN natural_forest_area_estimated BOOLEAN;
ALTER TABLE
foc_fra_values
  ALTER COLUMN natural_forest_area_estimated SET DEFAULT FALSE;
ALTER TABLE
foc_fra_values
  ADD COLUMN natural_forest_primary_area_estimated BOOLEAN;
ALTER TABLE
foc_fra_values
  ALTER COLUMN natural_forest_primary_area_estimated SET DEFAULT FALSE;
ALTER TABLE
foc_fra_values
  ADD COLUMN plantation_forest_area_estimated BOOLEAN;
ALTER TABLE
foc_fra_values
  ALTER COLUMN plantation_forest_area_estimated SET DEFAULT FALSE;
ALTER TABLE
foc_fra_values
  ADD COLUMN platation_forest_introduced_area_estimated BOOLEAN;
ALTER TABLE
foc_fra_values
  ALTER COLUMN platation_forest_introduced_area_estimated SET DEFAULT FALSE;
ALTER TABLE
foc_fra_values
  ADD COLUMN other_planted_forest_area_estimated BOOLEAN;
ALTER TABLE
foc_fra_values
  ALTER COLUMN other_planted_forest_area_estimated SET DEFAULT FALSE;
