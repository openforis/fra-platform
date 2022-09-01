
alter table user_country_role add assessment assessment_type default 'fra2020';

UPDATE user_country_role
SET assessment = 'fra2020';
