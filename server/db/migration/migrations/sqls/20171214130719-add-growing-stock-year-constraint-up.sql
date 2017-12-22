DELETE FROM growing_stock;
ALTER TABLE growing_stock ADD CONSTRAINT unique_year_for_country UNIQUE (country_iso, year);
