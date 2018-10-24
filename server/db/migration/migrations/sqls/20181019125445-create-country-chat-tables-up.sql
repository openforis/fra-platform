CREATE TABLE
  country_message_board_message
(
  id          bigserial                                                      NOT NULL,
  country_iso VARCHAR                                                        NOT NULL,
  text        text                                                           NOT NULL,
  from_user   bigint                                                         NOT NULL,
  TIME        TIMESTAMP without TIME zone DEFAULT (now() AT TIME ZONE 'UTC') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT countrymessageboardmessage_country_fk FOREIGN KEY (country_iso) REFERENCES
    country ("country_iso"),
  CONSTRAINT countrymessageboardmessage_user_fk FOREIGN KEY (from_user) REFERENCES
    fra_user ("id")
);

CREATE TABLE
  country_message_board_message_read
(
  id         bigserial                                                      NOT NULL,
  message_id bigint                                                         NOT NULL,
  user_id    bigint                                                         NOT NULL,
  TIME       TIMESTAMP without TIME zone DEFAULT (now() AT TIME ZONE 'UTC') NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT countrymessageboardmessageread_message_fk FOREIGN KEY (message_id) REFERENCES
    country_message_board_message ("id"),
  CONSTRAINT countrymessageboardmessageread_user_fk FOREIGN KEY (user_id) REFERENCES
    fra_user ("id")
);
