INSERT INTO fra_user (email, name, login_email)
VALUES ('joni.rajanen@reaktor.com', 'Joni Rajanen', 'jonira@reaktor.fi');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), NULL, 'REVIEWER_ALL');

INSERT INTO fra_user (email, name, login_email)
VALUES ('mathias.lindholm@reaktor.com', 'Mathias Lindholm', 'conway@reaktor.fi');

INSERT INTO user_country_role (user_id, country_iso, role)
VALUES ((SELECT last_value
         FROM fra_user_id_seq), NULL, 'REVIEWER_ALL');
