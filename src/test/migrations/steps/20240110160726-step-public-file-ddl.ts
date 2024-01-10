import { BaseProtocol, DB } from 'server/db'

// Don't use transaction when handling DDL
const client: BaseProtocol = DB

export default async () => {
  // 1. Create new table public.file
  await client.query(`
        create table if not exists public.file
          (
            id         bigserial    not null,
            uuid       uuid         not null default uuid_generate_v4(),
            file_name  varchar(255) not null,
            file       bytea        not null,
            created_at timestamp    not null default now(),
            updated_at timestamp,
            primary key (id),
            unique (uuid)
          );
  `)

  // 2. For each assessment/schema, create repository

  // await Promises.each...
  await client.query(`
      create table if not exists assessment_fra_2025.repository
      (
        id          bigserial     not null,
        uuid        uuid          not null default uuid_generate_v4(),
        country_iso varchar(3) references public.country (country_iso) on update cascade on delete cascade,
        file_uuid   uuid references public.file (uuid) on update cascade on delete cascade,
        link        varchar(2048),
        name        varchar(2048) not null,
        props       jsonb,
        primary key (id),
        unique (uuid)
    );

  `)
}
