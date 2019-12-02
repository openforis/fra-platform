UPDATE user_country_role SET role = 'REVIEWER' WHERE user_id in (SELECT id FROM fra_user WHERE login_email = 'stemtomt@gmail.com');
