CREATE TABLE
  sustainable_development_ind_15_1_1
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainable_development_ind_15_1_1_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);

CREATE TABLE
  sustainable_development_ind_15_2_1_1
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainable_development_ind_15_2_1_1_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);

CREATE TABLE
  sustainable_development_ind_15_2_1_2
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainable_development_ind_15_2_1_2_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);

CREATE TABLE
  sustainable_development_ind_15_2_1_3
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainable_development_ind_15_2_1_3_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);

CREATE TABLE
  sustainable_development_ind_15_2_1_4
(
  country_iso CHARACTER VARYING(3) NOT NULL,
  row_name CHARACTER VARYING NOT NULL,
  agency_name CHARACTER VARYING,
  PRIMARY KEY (country_iso, row_name),
  CONSTRAINT sustainable_development_ind_15_2_1_4_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso")
);
