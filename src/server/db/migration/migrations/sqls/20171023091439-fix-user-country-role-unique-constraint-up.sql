ALTER TABLE user_country_role DROP CONSTRAINT only_one_role_for_user_per_country;

ALTER TABLE user_country_role ADD CONSTRAINT only_one_role_for_user_per_country UNIQUE (user_id, country_iso);



