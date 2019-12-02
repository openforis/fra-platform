INSERT INTO fra_role VALUES ('NATIONAL_CORRESPONDENT_ALL');
INSERT INTO fra_role VALUES ('REVIEWER_ALL');

ALTER TABLE user_country_role ALTER COLUMN country_iso DROP NOT NULL;

UPDATE user_country_role
SET role = 'NATIONAL_CORRESPONDENT_ALL',
country_iso = null
WHERE user_id = (SELECT id from fra_user WHERE email = 'frank.bonneville@mailinator.com')
AND country_iso = 'ITA';

UPDATE user_country_role
SET role = 'REVIEWER_ALL',
country_iso = null
WHERE user_id = (SELECT id from fra_user WHERE email = 'jan.egeland@mailinator.com')
AND country_iso = 'ITA';
