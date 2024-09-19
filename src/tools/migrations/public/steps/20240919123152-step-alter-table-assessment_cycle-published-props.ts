import { BaseProtocol, DB } from 'server/db'

const client: BaseProtocol = DB

// If published column exists, drop it and add props column
export default async () => {
  await client.query(`
      do $$
      begin
        if exists (
          select 1
          from information_schema.columns
          where table_name='assessment_cycle' and column_name='published'
        ) then
          alter table assessment_cycle
          drop column published,
          -- NOT NULL
          add column props jsonb default '{}'::jsonb not null;
        end if;
      end $$;
   `)
}
