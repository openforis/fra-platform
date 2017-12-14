CREATE TABLE
  sustainable_development_agency_name
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainabledevelopmentagencyname_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
)
