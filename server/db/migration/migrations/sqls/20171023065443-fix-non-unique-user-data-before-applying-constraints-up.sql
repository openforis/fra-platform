DELETE FROM user_country_role WHERE user_id IN (SELECT id FROM fra_user WHERE login_email = 'hebbetaxen@gmail.com');
DELETE FROM fra_user WHERE login_email = 'hebbetaxen@gmail.com';

DELETE FROM user_country_role WHERE user_id IN (SELECT id FROM fra_user WHERE login_email = 'jan.egeland@gmail.com');
DELETE FROM fra_user WHERE login_email = 'jan.egeland@gmail.com';

INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('hebbetaxen@gmail.com', 'Svante Claesson', 'hebbetaxen@gmail.com', 'en');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'SWE', 'REVIEWER');
