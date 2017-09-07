CREATE TABLE
  user_issue
(
  id bigserial NOT NULL,
  user_id bigint NOT NULL,
  issue_id bigint NOT NULL,
  read_time TIMESTAMP without TIME zone,
  PRIMARY KEY (id),
  CONSTRAINT userissue_fk1 FOREIGN KEY (user_id) REFERENCES fra_user
  ("id"),
  CONSTRAINT userissue_fk2 FOREIGN KEY (issue_id) REFERENCES issue
  ("id")
)
