INSERT INTO fra_user (email, name, login_email)
VALUES ('toni.strandell@reaktor.com', 'Toni Strandell', 'strandel@reaktor.fi');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), NULL, 'REVIEWER_ALL');
