CREATE TABLE forest_area_within_protected_areas (
  "country_iso" VARCHAR REFERENCES country (country_iso) NOT NULL,
  "row_name"    VARCHAR,
  "1990"        NUMERIC,
  "2000"        NUMERIC,
  "2010"        NUMERIC,
  "2015"        NUMERIC,
  "2016"        NUMERIC,
  "2017"        NUMERIC,
  "2018"        NUMERIC,
  "2019"        NUMERIC,
  "2020"        NUMERIC,
  PRIMARY KEY (country_iso, row_name)
);

CREATE INDEX country_iso_forest_area_within_protected_areas_idx
  ON forest_area_within_protected_areas ("country_iso");
