CREATE TABLE
  repository
(
  id          bigserial            NOT NULL,
  country_iso CHARACTER VARYING(3) NOT NULL,
  file_name   CHARACTER VARYING    NOT NULL,
  file        bytea                NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT repository_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso") ON
  DELETE
  CASCADE
)
