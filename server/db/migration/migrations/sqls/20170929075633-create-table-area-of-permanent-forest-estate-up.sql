CREATE TABLE area_of_permanent_forest_estate
(
  "country_iso" VARCHAR(3) REFERENCES country(country_iso) NOT NULL,
  "row_name" varchar,
  "1990" numeric,
  "2000" numeric,
  "2010" numeric,
  "2015" numeric,
  "2020" numeric,
  "not_applicable" text,
  PRIMARY KEY (country_iso, row_name)
);
