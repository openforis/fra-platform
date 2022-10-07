alter table public.users_role add constraint user_country_role unique (user_id, country_iso, role);
