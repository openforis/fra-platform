CREATE TABLE
  pan_european
(
  id bigserial NOT NULL,
  country_iso CHARACTER VARYING(3) NOT NULL,
  qty_questionnaire bytea NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT paneuropean_country_fk FOREIGN KEY (country_iso) REFERENCES
    country
)
