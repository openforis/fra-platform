CREATE TABLE
  eof_description
(
  id                      SERIAL     NOT NULL,
  country_iso             VARCHAR(3) NOT NULL,
  data_sources            TEXT,
  national_classification TEXT,
  original_data           TEXT,
  PRIMARY KEY (id),
  CONSTRAINT eof_description_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
