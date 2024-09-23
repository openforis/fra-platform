import { DB } from 'server/db'

export default async () => {
  // Insert into settings table if and only if the table is empty
  await DB.query(`
      insert into settings (default_assessment_id)
      select null where not exists (select 1 from settings)
  `)
}
