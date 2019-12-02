DELETE FROM user_country_role where user_id = (SELECT id from fra_user WHERE email = 'monica.garzuglia@gmail.com');

INSERT INTO user_country_role (user_id, role)
VALUES ((SELECT id from fra_user WHERE email = 'monica.garzuglia@gmail.com'), 'REVIEWER_ALL');
