import { Assessment } from '../../src/meta/assessment/assessment'
import { BaseProtocol, Schemas } from '../../src/server/db'
import { Promises } from '../../src/utils/promises'

type Props = {
  assessment: Assessment
  client: BaseProtocol
}

export const migrateRepository = async (props: Props): Promise<void> => {
  const { assessment, client } = props

  await client.query(
    `
            delete from public.file;
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
                
          insert into public.file (id, file_name, file)
          select id, file_name, file
          from _legacy.repository;
    `
  )

  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)

    await client.query(`
      delete from ${schemaCycle}.repository;

      insert into ${schemaCycle}.repository (country_iso, file_uuid, name)
      select
          r.country_iso,
          f.uuid,
          r.file_name
      from _legacy.repository r
      inner join public.file f using (file_name)
         `)
  })
}
