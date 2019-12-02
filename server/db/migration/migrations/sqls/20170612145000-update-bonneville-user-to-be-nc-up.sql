UPDATE user_country_role
SET role = 'NATIONAL_CORRESPONDENT'
WHERE user_id = (SELECT id from fra_user WHERE email = 'frank.bonneville@mailinator.com')
AND country_iso = 'ITA';
