ALTER TABLE growing_stock
  ALTER COLUMN YEAR SET NOT NULL;


CREATE INDEX country_iso_idx
  ON growing_stock ("country_iso");
