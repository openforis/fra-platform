CREATE TABLE
  growing_stock
(
  id bigserial NOT NULL,
  country_iso CHARACTER VARYING(3) NOT NULL,
  year NUMERIC(4),
  naturally_regenerating_forest NUMERIC,
  naturally_regenerating_forest_avg NUMERIC,
  plantation_forest NUMERIC,
  plantation_forest_avg NUMERIC,
  other_planted_forest NUMERIC,
  other_planted_forest_avg NUMERIC,
  other_wooded_land NUMERIC,
  other_wooded_land_avg NUMERIC,
  PRIMARY KEY (id),
  CONSTRAINT growingstock_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
