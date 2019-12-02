INSERT INTO fra_user (email, name, login_email, lang)
VALUES ('rastislav.rasi@foresteurope.org', 'Rastislav Raši', 'rastislav.rasi@foresteurope.org', 'en');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), 'SVK', 'NATIONAL_CORRESPONDENT');

