CREATE TABLE
  user_chat_message
(
  id           BIGSERIAL NOT NULL,
  text         TEXT      NOT NULL,
  from_user    BIGINT    NOT NULL,
  to_user      BIGINT    NOT NULL,
  time         TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
  read_time    TIMESTAMP WITHOUT TIME ZONE,
  PRIMARY KEY (id),
  CONSTRAINT userchatmessage_messagefrom_fk FOREIGN KEY (from_user) REFERENCES
    fra_user ("id"),
  CONSTRAINT userchatmessage_messageto_fk FOREIGN KEY (to_user) REFERENCES
    fra_user ("id")
);
