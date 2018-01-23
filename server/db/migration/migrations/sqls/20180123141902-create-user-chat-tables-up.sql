CREATE TABLE
  user_chat
(
  id     BIGSERIAL NOT NULL,
  user_a BIGINT,
  user_b BIGINT,
  PRIMARY KEY (id),
  CONSTRAINT userchat_user_a_fk FOREIGN KEY (user_a) REFERENCES
    fra_user ("id"),
  CONSTRAINT userchat_user_b_fk FOREIGN KEY (user_b) REFERENCES
    fra_user ("id")
);

CREATE TABLE
  user_chat_message
(
  id           BIGSERIAL NOT NULL,
  user_chat_id BIGINT    NOT NULL,
  text         TEXT      NOT NULL,
  from_user    BIGINT    NOT NULL,
  to_user      BIGINT    NOT NULL,
  time         TIMESTAMP WITHOUT TIME ZONE DEFAULT (now() AT TIME ZONE 'UTC'),
  read_time    TIMESTAMP WITHOUT TIME ZONE,
  PRIMARY KEY (id),
  CONSTRAINT userchatmessage_userchat_fk FOREIGN KEY (user_chat_id) REFERENCES
    user_chat ("id"),
  CONSTRAINT userchatmessage_messagefrom_fk FOREIGN KEY (from_user) REFERENCES
    fra_user ("id"),
  CONSTRAINT userchatmessage_messageto_fk FOREIGN KEY (to_user) REFERENCES
    fra_user ("id")
);
