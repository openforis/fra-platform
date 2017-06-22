CREATE TABLE
  eof_descriptions
(
  id                      SERIAL     NOT NULL,
  country_iso             VARCHAR(3) NOT NULL,
  data_sources            TEXT,
  national_classification TEXT,
  original_data           TEXT,
  PRIMARY KEY (id),
  CONSTRAINT eof_descriptions_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
