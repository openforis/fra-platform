INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT id FROM fra_user WHERE login_email = 'orjan.fao@gmail.com'), 'ATL', 'REVIEWER');

INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT id FROM fra_user WHERE login_email = 'anssioffice@gmail.com'), 'ATL', 'REVIEWER');

INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT id FROM fra_user WHERE login_email = 'monica.garzuglia@gmail.com'), 'ATL', 'REVIEWER');
