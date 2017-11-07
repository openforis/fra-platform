DELETE FROM fra_audit;

ALTER TABLE fra_audit DROP COLUMN user_id;

ALTER TABLE fra_audit ADD COLUMN user_email VARCHAR(255);
ALTER TABLE fra_audit ADD COLUMN user_login_email VARCHAR(255);
ALTER TABLE fra_audit ADD COLUMN user_name VARCHAR(1024);

