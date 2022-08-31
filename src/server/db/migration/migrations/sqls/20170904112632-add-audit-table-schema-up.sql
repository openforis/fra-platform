CREATE TABLE fra_audit (
  user_id     BIGINT REFERENCES fra_user (id)                                               NOT NULL,
  time        TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE
                                                   'UTC')                                   NOT NULL,
  message     TEXT,
  country_iso VARCHAR(3) REFERENCES country (country_iso)                                   NOT NULL,
  section     VARCHAR(50)                                                                   NOT NULL,
  target      JSON,
  PRIMARY KEY (user_id, time)
);
