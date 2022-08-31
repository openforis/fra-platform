CREATE TABLE
  collaborators_country_access
(
  id bigserial NOT NULL,
  user_id bigint NOT NULL,
  country_iso CHARACTER VARYING NOT NULL,
  tables jsonb NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT collaboratorscountryaccess_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso") ON
  DELETE
  CASCADE,
  CONSTRAINT collaboratorscountryaccess_user_fk FOREIGN KEY (user_id) REFERENCES
    fra_user ("id")
  ON
  DELETE
  CASCADE
)
