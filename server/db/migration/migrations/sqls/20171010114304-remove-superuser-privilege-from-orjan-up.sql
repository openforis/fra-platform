DELETE FROM user_country_role
WHERE role = 'REVIEWER_ALL'
AND user_id IN (SELECT id FROM fra_user WHERE login_email =  'orjan.fao@gmail.com');
