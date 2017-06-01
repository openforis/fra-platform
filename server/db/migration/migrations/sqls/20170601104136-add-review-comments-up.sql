create TABLE fra_user (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(255)
);

create table issue (
  id BIGSERIAL PRIMARY KEY,
  status VARCHAR(16)
);

create TABLE fra_comment (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES fra_user(id),
  issue_id BIGINT REFERENCES issue(id) NOT NULL,
  message TEXT,
  status_changed VARCHAR(16)
);

create table eof_issue (
  id BIGSERIAL PRIMARY KEY,
  issue_id BIGINT REFERENCES issue(id) NOT NULL ,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL
);
