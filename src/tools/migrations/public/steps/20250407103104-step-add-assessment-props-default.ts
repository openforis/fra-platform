import { DB } from 'server/db/db'

export default async (): Promise<void> => {
  await DB.query(`
    with settings_id as (
      select default_assessment_id
      from public.settings
      limit 1
    )
    update public.assessment a
    set props = jsonb_set(coalesce(a.props, '{}'::jsonb), '{default}', 'true'::jsonb, true)
    from settings_id s
    where a.id = s.default_assessment_id
  `)

  await DB.query(`drop table if exists public.settings;`)
}
