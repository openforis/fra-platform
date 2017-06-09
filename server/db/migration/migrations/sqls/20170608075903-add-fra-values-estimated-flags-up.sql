ALTER TABLE
eof_fra_values
  ADD COLUMN other_wooded_land_estimated BOOLEAN;
ALTER TABLE
eof_fra_values
  ALTER COLUMN other_wooded_land_estimated SET DEFAULT FALSE;
ALTER TABLE
eof_fra_values
  ADD COLUMN other_land_estimated BOOLEAN;
ALTER TABLE
eof_fra_values
  ALTER COLUMN other_land_estimated SET DEFAULT FALSE;
ALTER TABLE
eof_fra_values
  RENAME COLUMN "estimated" TO forest_area_estimated;
