CREATE TABLE forest_policy (
  "country_iso"         VARCHAR(3) REFERENCES country(country_iso) NOT NULL,
  "row_name"            VARCHAR,
  "national_yes_no"     TEXT,
  "sub_national_yes_no" TEXT,
  PRIMARY KEY (country_iso, row_name)
);
