export const getUsersRoleDDL = (schemaName = 'public'): string => {
  return `
    create table if not exists ${schemaName}.users_role (
      id bigserial primary key,
      uuid uuid default uuid_generate_v4(),
      assessment_uuid uuid,
      cycle_uuid uuid,
      country_iso character varying(3),
      user_uuid uuid not null,
      role ${schemaName}.user_role not null,
      props jsonb not null default '{}'::jsonb,
      permissions jsonb,
      invitation_uuid uuid,
      created_at timestamp with time zone default now(),

      foreign key (assessment_uuid) references ${schemaName}.assessment (uuid) on update cascade on delete cascade,
      foreign key (user_uuid) references ${schemaName}.users (uuid) on update cascade on delete cascade,
      foreign key (cycle_uuid) references ${schemaName}.assessment_cycle (uuid) on update cascade on delete cascade,
      foreign key (country_iso) references ${schemaName}.country (country_iso) on update cascade on delete cascade,
      foreign key (invitation_uuid) references ${schemaName}.users_invitation (uuid) on update cascade on delete set null
    );
    create unique index if not exists users_role_uuid_key on ${schemaName}.users_role using btree (uuid);
    create unique index if not exists users_role_user_uuid_assessment_uuid_country_iso_cycle_uuid_uindex on ${schemaName}.users_role using btree (user_uuid, assessment_uuid, country_iso, cycle_uuid);
    create index if not exists users_role_user_lookup_idx on ${schemaName}.users_role(user_uuid, cycle_uuid, assessment_uuid, role);
  `
}

export const getUsersInvitationDDL = (schemaName = 'public'): string => {
  return `
    create table if not exists ${schemaName}.users_invitation (
      id bigserial primary key,
      uuid uuid default uuid_generate_v4(),
      assessment_uuid uuid,
      cycle_uuid uuid not null,
      country_iso character varying(3),
      user_uuid uuid not null,
      invited_by_user_uuid uuid,
      role ${schemaName}.user_role not null,
      invited_at timestamp with time zone default now(),
      accepted_at timestamp with time zone,
      permissions jsonb,

      foreign key (assessment_uuid) references ${schemaName}.assessment (uuid) on update cascade on delete cascade,
      foreign key (user_uuid) references ${schemaName}.users (uuid) on update cascade on delete cascade,
      foreign key (cycle_uuid) references ${schemaName}.assessment_cycle (uuid) on update cascade on delete cascade,
      foreign key (country_iso) references ${schemaName}.country (country_iso) on update cascade on delete cascade,
      foreign key (invited_by_user_uuid) references ${schemaName}.users (uuid) on update cascade on delete set null
    );

    create unique index if not exists users_invitation_uuid_key on ${schemaName}.users_invitation using btree (uuid);
    create unique index if not exists users_invitation_assessment_cycle_country_uindex 
      on ${schemaName}.users_invitation using btree (assessment_uuid, cycle_uuid, country_iso, user_uuid) 
      where accepted_at is null;
    create index if not exists users_invitation_user_lookup_idx on ${schemaName}.users_invitation(user_uuid, cycle_uuid, assessment_uuid);
  `
}

const _getExtensions = (): string => {
  return `
      -- Extensions
    create extension if not exists "uuid-ossp";
  `
}

const _getEnums = (): string => {
  return `
  
    -- Enums - create enums in default search path
    do $$ begin
      if not exists (select 1 from pg_type where typname = 'users_status') then
        create type users_status as enum ('invitationPending', 'active', 'disabled');
      end if;
    end $$;

    do $$ begin
      if not exists (select 1 from pg_type where typname = 'auth_provider') then
        create type auth_provider as enum ('local', 'google');
      end if;
    end $$;

    do $$ begin
      if not exists (select 1 from pg_type where typname = 'user_role') then
        create type user_role as enum ('ADMINISTRATOR', 'COLLABORATOR', 'NATIONAL_CORRESPONDENT', 'ALTERNATE_NATIONAL_CORRESPONDENT', 'REGIONAL_FOCAL_POINT', 'REVIEWER', 'VIEWER');
      end if;
    end $$;
    
    -- Enums: Message topic
    do $$
    begin
        create type message_topic_status as enum ('opened', 'resolved');
    exception
        when duplicate_object then null;
    end $$;
    
    do $$
    begin
        create type message_topic_type as enum ('review', 'chat', 'messageboard');
    exception
        when duplicate_object then null;
    end $$;

  `
}

export const getCreatePublicSchemaDDL = (schemaName = 'public'): string => {
  const query = `
      ${_getExtensions()}
      ${_getEnums()}

    -- Tables
    create table if not exists ${schemaName}.assessment (
      id bigserial primary key,
      uuid uuid default uuid_generate_v4(),
      props jsonb default '{}'::jsonb
    );
    create unique index if not exists assessment_uuid_key on ${schemaName}.assessment using btree (uuid);

    create table if not exists ${schemaName}.assessment_cycle (
      id bigserial primary key,
      assessment_uuid uuid not null,
      uuid uuid default uuid_generate_v4(),
      name character varying default '',
      props jsonb default '{}'::jsonb not null,
      cycle_uuid_source uuid,
      foreign key (assessment_uuid) references ${schemaName}.assessment (uuid)
        on update cascade on delete cascade
    );
    create unique index if not exists assessment_cycle_uuid_key on ${schemaName}.assessment_cycle using btree (uuid);

    alter table ${schemaName}.assessment_cycle
          add constraint assessment_cycle_assessment_cycle_source_fk
              foreign key (cycle_uuid_source) references ${schemaName}.assessment_cycle (uuid)
                  on update cascade on delete set null;
                  
    create table if not exists ${schemaName}.country (
      country_iso   character varying(3) primary key not null,
      country_iso2  character varying(2) not null,
      m49           character varying(3) not null,
      calling_code  character varying(10),
      sort_index    jsonb not null default '{}'::jsonb
    );

    create table if not exists ${schemaName}.file (
      id bigserial primary key,
      uuid uuid not null default uuid_generate_v4(),
      name character varying(255) not null,
      size bigint not null default 0,
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
    create unique index if not exists users_uuid_key on ${schemaName}.users using btree (uuid);

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

    create table if not exists ${schemaName}.region (
      region_code text primary key not null,
      name text,
      parent_code text references ${schemaName}.region(region_code) on update cascade on delete cascade,
      sort_index jsonb not null default '{}'::jsonb
    );

    create table if not exists ${schemaName}.users_auth_provider (
      id bigserial primary key,
      user_uuid uuid not null,
      provider ${schemaName}.auth_provider not null,
      props jsonb,
      foreign key (user_uuid) references ${schemaName}.users (uuid)
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

    ${getUsersInvitationDDL(schemaName)}
    ${getUsersRoleDDL(schemaName)}

  `

  return query
}
