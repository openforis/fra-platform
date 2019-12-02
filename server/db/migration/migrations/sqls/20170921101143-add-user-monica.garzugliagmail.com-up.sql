INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('monica.garzuglia@gmail.com', 'Monica Garzuglia', 'monica.garzuglia@gmail.com', 'en');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'SWE', 'REVIEWER');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'ITA', 'NATIONAL_CORRESPONDENT');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'FIN', 'NATIONAL_CORRESPONDENT');

