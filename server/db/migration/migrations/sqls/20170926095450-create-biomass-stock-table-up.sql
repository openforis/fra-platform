CREATE TABLE
  biomass_stock_total
(
  country_iso VARCHAR(3) NOT NULL,
  row_name VARCHAR NOT NULL,
  "1990" NUMERIC,
  "2000" NUMERIC,
  "2010" NUMERIC,
  "2015" NUMERIC,
  "2016" NUMERIC,
  "2017" NUMERIC,
  "2018" NUMERIC,
  "2019" NUMERIC,
  "2020" NUMERIC,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT biomassstock_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);


CREATE TABLE
  biomass_stock_avg
(
  country_iso VARCHAR(3) NOT NULL,
  row_name VARCHAR NOT NULL,
  "1990" NUMERIC,
  "2000" NUMERIC,
  "2010" NUMERIC,
  "2015" NUMERIC,
  "2016" NUMERIC,
  "2017" NUMERIC,
  "2018" NUMERIC,
  "2019" NUMERIC,
  "2020" NUMERIC,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT biomassstock_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
;
