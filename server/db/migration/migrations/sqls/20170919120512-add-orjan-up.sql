INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('orjan.fao@gmail.com', 'Örjan Jonsson', 'orjan.fao@gmail.com', 'en');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), NULL, 'REVIEWER_ALL');/* Replace with your SQL commands */



INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'SWE', 'NATIONAL_CORRESPONDENT');


INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'FIN', 'REVIEWER');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'CYP', 'REVIEWER');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'EST', 'COLLABORATOR');
INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'DJI', 'NATIONAL_CORRESPONDENT');
