ALTER TABLE user_chat_message
  DROP CONSTRAINT userchatmessage_messagefrom_fk,
  DROP CONSTRAINT userchatmessage_messageto_fk,
  ADD CONSTRAINT userchatmessage_messagefrom_fk
    FOREIGN KEY (from_user) REFERENCES "fra_user" ("id")
    ON DELETE CASCADE,
  ADD CONSTRAINT userchatmessage_messageto_fk
    FOREIGN KEY (to_user) REFERENCES "fra_user" ("id")
    ON DELETE CASCADE;
