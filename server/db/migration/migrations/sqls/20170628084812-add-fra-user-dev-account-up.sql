INSERT INTO fra_user (email, name, login_email)
VALUES ('Cosimo.togna@fao.org', 'Cosimo Togna', 'mino.togna@gmail.com');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), NULL, 'REVIEWER_ALL');
