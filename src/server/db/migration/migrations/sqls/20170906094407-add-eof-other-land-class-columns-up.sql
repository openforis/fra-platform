ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_palms NUMERIC;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_palms_estimated BOOLEAN;

ALTER TABLE
eof_fra_values
  ALTER COLUMN other_land_palms_estimated SET DEFAULT FALSE;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_tree_orchards NUMERIC;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_tree_orchards_estimated BOOLEAN;

ALTER TABLE
eof_fra_values
  ALTER COLUMN other_land_tree_orchards_estimated
  SET DEFAULT FALSE;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_agroforestry NUMERIC;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_agroforestry_estimated BOOLEAN;

ALTER TABLE
eof_fra_values
  ALTER COLUMN other_land_agroforestry_estimated
  SET DEFAULT FALSE;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_trees_urban_settings NUMERIC;

ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_trees_urban_settings_estimated BOOLEAN;

ALTER TABLE
eof_fra_values
  ALTER COLUMN other_land_trees_urban_settings_estimated
  SET DEFAULT FALSE;
