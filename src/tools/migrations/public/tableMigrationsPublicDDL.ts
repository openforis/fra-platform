export const tableMigrationsPublicDDL = `
    create schema if not exists migrations;

    create table if not exists migrations.public (
      id serial primary key,
      name character varying(255) unique not null,
      run_on timestamp without time zone not null default now()
    );
`
