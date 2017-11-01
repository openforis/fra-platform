DELETE FROM fra_comment WHERE user_id IN (SELECT id FROM fra_user WHERE login_email IS NULL);

DELETE FROM user_country_role WHERE user_id IN (SELECT id FROM fra_user WHERE login_email IS NULL);

DELETE FROM fra_user WHERE login_email IS NULL;

INSERT INTO fra_role values ('ADMINISTRATOR');

UPDATE user_country_role
SET ROLE = 'ADMINISTRATOR'
WHERE ROLE IN ('REVIEWER_ALL', 'NATIONAL_CORRESPONDENT_ALL');

DELETE FROM fra_role WHERE role IN ('REVIEWER_ALL', 'NATIONAL_CORRESPONDENT_ALL');
