alter table public.users_role
    add constraint user_assessment_cycle_country_role_key
    unique (user_id, assessment_id, cycle_uuid, country_iso, role);
