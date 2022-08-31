DROP TABLE growing_stock;
CREATE TABLE growing_stock_total
(
  id bigserial NOT NULL,
  country_iso CHARACTER VARYING(3) NOT NULL,
  year NUMERIC(4),
  naturally_regenerating_forest NUMERIC,
  plantation_forest NUMERIC,
  other_planted_forest NUMERIC,
  other_wooded_land NUMERIC,
  PRIMARY KEY (id),
  CONSTRAINT growingstock_country_fk FOREIGN KEY (country_iso) REFERENCES country ("country_iso"),
  CONSTRAINT gs_total_unique_year_for_country UNIQUE (country_iso, year)
);
CREATE TABLE growing_stock_avg
(
  id bigserial NOT NULL,
  country_iso CHARACTER VARYING(3) NOT NULL,
  year NUMERIC(4),
  naturally_regenerating_forest NUMERIC,
  plantation_forest NUMERIC,
  other_planted_forest NUMERIC,
  other_wooded_land NUMERIC,
  PRIMARY KEY (id),
  CONSTRAINT growingstock_country_fk FOREIGN KEY (country_iso) REFERENCES country ("country_iso"),
  CONSTRAINT gs_avg_unique_year_for_country UNIQUE (country_iso, year)
);
