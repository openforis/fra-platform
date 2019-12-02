DELETE FROM user_country_role WHERE user_id = (SELECT id FROM fra_user WHERE login_email = 'orjan.fao@gmail.com');

INSERT INTO user_country_role
(user_id, country_iso, role)
VALUES
((SELECT id FROM fra_user WHERE login_email = 'orjan.fao@gmail.com'),
NULL,
'ADMINISTRATOR');
