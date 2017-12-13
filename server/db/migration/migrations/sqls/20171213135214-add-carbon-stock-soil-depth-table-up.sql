CREATE TABLE
  carbon_stock_soil_depth
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  soil_depth NUMERIC,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT carbonstocksoildepth_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
