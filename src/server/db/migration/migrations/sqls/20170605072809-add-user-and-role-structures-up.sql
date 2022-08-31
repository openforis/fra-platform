ALTER TABLE fra_user ADD COLUMN name VARCHAR(1024);

CREATE TABLE fra_role(
  role VARCHAR(255) PRIMARY KEY
);

INSERT INTO fra_role VALUES ('NATIONAL_CORRESPONDENT');
INSERT INTO fra_role VALUES ('REVIEWER');

CREATE TABLE user_country_role (
  user_id BIGINT REFERENCES fra_user(id) NOT NULL,
  country_iso  VARCHAR(3) REFERENCES country(country_iso) NOT NULL,
  role VARCHAR(255) REFERENCES fra_role(role) NOT NULL
);
