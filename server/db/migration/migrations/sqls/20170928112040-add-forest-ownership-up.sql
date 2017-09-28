CREATE TABLE forest_ownership (
  "country_iso" VARCHAR REFERENCES country(country_iso) NOT NULL,
  "row_name"    VARCHAR,
  "1990"        NUMERIC,
  "2000"        NUMERIC,
  "2010"        NUMERIC,
  "2015"        NUMERIC,
  "2020"        NUMERIC,
  PRIMARY KEY (country_iso, row_name)
);

