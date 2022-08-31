ALTER TABLE user_country_role ADD CONSTRAINT only_one_role_for_user_per_country UNIQUE (user_id, country_iso, role);
ALTER TABLE fra_user ADD CONSTRAINT unique_login_email UNIQUE (login_email);
