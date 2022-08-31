CREATE TABLE
  fra_user_reset_password
(
  user_id               BIGINT                                                                  NOT NULL,
  uuid                  UUID DEFAULT uuid_generate_v4()                                         NOT NULL,
  created_time          TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC')          NOT NULL,
  password_changed_time TIMESTAMP WITHOUT TIME ZONE,
  active                BOOLEAN DEFAULT TRUE                                                    NOT NULL,
  CONSTRAINT frauserresetpassword_user_fk FOREIGN KEY (user_id)
  REFERENCES fra_user ("id")
  ON DELETE CASCADE,
  PRIMARY KEY (uuid)
)
