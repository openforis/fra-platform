INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('lucilla.marinaro@gmail.com', 'Lucilla Marinaro', 'lucilla.marinaro@gmail.com', 'en');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'ITA', 'REVIEWER');

