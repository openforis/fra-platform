export const getCreatePublicSchemaDDL = (schemaName = 'public'): string => {
  const query = `
    -- Extensions
    create extension if not exists "uuid-ossp";

    -- Enums    
    do $$ begin
      if not exists (select 1 from pg_type where typname = 'users_status') then
        create type ${schemaName}.users_status as enum ('invitationPending', 'active', 'disabled');
      end if;
    end $$;

    do $$ begin
      if not exists (select 1 from pg_type where typname = 'auth_provider') then
        create type ${schemaName}.auth_provider as enum ('local', 'google');
      end if;
    end $$;

    do $$ begin
      if not exists (select 1 from pg_type where typname = 'user_role') then
        create type ${schemaName}.user_role as enum ('ADMINISTRATOR', 'COLLABORATOR', 'NATIONAL_CORRESPONDENT', 'ALTERNATE_NATIONAL_CORRESPONDENT', 'REVIEWER', 'VIEWER');
      end if;
    end $$;


    -- Tables
    create table if not exists ${schemaName}.assessment (
      id bigserial primary key,
      uuid uuid default uuid_generate_v4(),
      props jsonb default '{}'::jsonb,
      meta_cache jsonb default '{}'::jsonb
    );
    create unique index if not exists assessment_uuid_key on ${schemaName}.assessment using btree (uuid);

    create table if not exists ${schemaName}.assessment_cycle (
      id bigserial primary key,
      assessment_id bigint not null,
      uuid uuid default uuid_generate_v4(),
      name character varying default '',
      published boolean not null default false,
      foreign key (assessment_id) references ${schemaName}.assessment (id)
        on update cascade on delete cascade
    );
    create unique index if not exists assessment_cycle_uuid_key on ${schemaName}.assessment_cycle using btree (uuid);

    create table if not exists ${schemaName}.country (
      country_iso character varying(3) primary key not null,
      config jsonb
    );

    create table if not exists ${schemaName}.file (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name character varying(255) not null,
      file bytea not null, -- TODO: Remove this when S3 branch merged
      created_at timestamp without time zone not null default now()
    );
    create unique index if not exists file_uuid_key on ${schemaName}.file using btree (uuid);

    create table if not exists ${schemaName}.users (
      id bigserial primary key,
      status ${schemaName}.users_status not null default 'invitationPending'::${schemaName}.users_status,
      email character varying(255) not null,
      props jsonb not null default '{}'::jsonb,
      uuid uuid default uuid_generate_v4(),
      profile_picture_file_uuid uuid,
      foreign key (profile_picture_file_uuid) references ${schemaName}.file (uuid)
        on update no action on delete no action
    );
    create unique index if not exists users_email_key on ${schemaName}.users using btree (email);

    create table if not exists ${schemaName}.activity_log (
      id bigserial primary key,
      time timestamp without time zone not null default timezone('UTC'::text, now()),
      message text not null,
      country_iso character varying(3),
      section character varying(250) not null,
      target jsonb,
      user_id bigint not null,
      assessment_uuid uuid,
      cycle_uuid uuid,
      foreign key (assessment_uuid) references ${schemaName}.assessment (uuid)
        on update cascade on delete cascade,
      foreign key (country_iso) references ${schemaName}.country (country_iso)
        on update no action on delete no action,
      foreign key (cycle_uuid) references ${schemaName}.assessment_cycle (uuid)
        on update cascade on delete cascade,
      foreign key (user_id) references ${schemaName}.users (id)
        on update cascade on delete cascade
    );
    create index if not exists idx_activity_log_cycle_message on ${schemaName}.activity_log using btree (cycle_uuid, message);
    create index if not exists idx_activity_log_filtering on ${schemaName}.activity_log using btree (assessment_uuid, cycle_uuid, country_iso, message, time);

    create table if not exists ${schemaName}.migration_steps (
      id serial primary key,
      name character varying(255) not null unique,
      run_on timestamp without time zone not null default now()
    );

    -- This table is created separately, but left here for consistency
    create table if not exists ${schemaName}.migrations (
      id serial primary key,
      name character varying(255) not null,
      run_on timestamp without time zone not null
    );

    create table if not exists ${schemaName}.region (
      region_code text primary key not null,
      name text
    );

    create table if not exists ${schemaName}.settings (
      default_assessment_id bigint
    );

    create table if not exists ${schemaName}.users_auth_provider (
      id bigserial primary key,
      user_id bigint not null,
      provider ${schemaName}.auth_provider not null,
      props jsonb,
      foreign key (user_id) references ${schemaName}.users (id)
        on update no action on delete cascade
    );

    create table if not exists ${schemaName}.users_reset_password (
      uuid uuid primary key not null default uuid_generate_v4(),
      changed_at timestamp with time zone,
      created_at timestamp with time zone default now(),
      user_id bigint not null,
      active boolean not null default true,
      foreign key (user_id) references ${schemaName}.users (id)
        on update no action on delete cascade
    );

    create table if not exists ${schemaName}.users_role (
      id bigserial primary key,
      user_id bigint not null,
      assessment_id bigint,
      country_iso character varying(3),
      role ${schemaName}.user_role not null,
      props jsonb not null default '{}'::jsonb,
      cycle_uuid uuid,
      invitation_uuid uuid default uuid_generate_v4(),
      invited_at timestamp with time zone default now(),
      accepted_at timestamp with time zone,
      permissions jsonb not null default '{}'::jsonb,
      invited_by_user_uuid uuid,
      foreign key (assessment_id) references ${schemaName}.assessment (id)
        on update no action on delete cascade,
      foreign key (user_id) references ${schemaName}.users (id)
        on update no action on delete cascade,
      foreign key (cycle_uuid) references ${schemaName}.assessment_cycle (uuid)
        on update cascade on delete cascade,
      foreign key (country_iso) references ${schemaName}.country (country_iso)
        on update cascade on delete cascade
    );
    create unique index if not exists user_assessment_cycle_country_key on ${schemaName}.users_role using btree (user_id, assessment_id, cycle_uuid, country_iso);
    create unique index if not exists users_role_user_id_assessment_id_country_iso_cycle_uuid_uindex on ${schemaName}.users_role using btree (user_id, assessment_id, country_iso, cycle_uuid);
  `

  return query
}
