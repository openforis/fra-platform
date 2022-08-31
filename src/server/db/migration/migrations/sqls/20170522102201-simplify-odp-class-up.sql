-- Remove unnecessary split to two tables, the relationship was 1:1 anyway

ALTER TABLE odp_class ADD COLUMN area NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN other_wooded_land_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN other_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_natural_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_natural_primary_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_semi_natural_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_semi_natural_introduced_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_plantation_percent NUMERIC;
ALTER TABLE odp_class ADD COLUMN forest_plantation_introduced_percent NUMERIC;

DROP TABLE odp_class_values;
