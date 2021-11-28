alter table public.fra_role
    set schema _legacy;
alter table public.fra_user_invitation
    set schema _legacy;
alter table public.fra_user_reset_password
    set schema _legacy;
alter table public.user_country_role
    set schema _legacy;
alter table public.collaborators_country_access
    set schema _legacy;
alter table user_auth
    rename to users_role;
alter table users_provider
    rename to users_auth_provider;

alter table users_role
    add country_iso varchar(3);

create unique index users_role_user_id_assessment_id_country_iso_uindex
    on users_role (user_id, assessment_id, country_iso);

alter table users_role
    add constraint users_role_country_country_iso_fk
        foreign key (country_iso) references country
            on update cascade on delete cascade;

alter table users_invitation alter column uuid set default uuid_generate_v4();
alter table users_reset_password alter column uuid set default uuid_generate_v4();
