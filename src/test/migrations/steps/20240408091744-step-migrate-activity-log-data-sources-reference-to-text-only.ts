import * as pgPromise from 'pg-promise'

import { BaseProtocol } from 'server/db'
import { Logger } from 'server/utils/logger'

// Convert activity log dataSources reference from old object format {text?:string, link?:string} to text only:

// 4 cases:
// 1. reference.link is not null and reference.text is null: <div><a href={link}>{link}</a></div>
// 2. reference.link is null and reference.text is not null: <div>text</div>
// 3. reference.link is not null and reference.text is not null: <div><a href={link}>{text}</a></div>
// 4. reference.link is null and reference.text is null: ''

// eg.: { reference: { link: 'https://www.google.com', text: 'Google' } } => <div><a href='https://www.google.com'>Google</a></div>
// eg: dataSources.reference: '<div><a href='https://www.google.com'>Google</a></div>'

const _fixActivityLog = (activityLog: any) => {
  const ds = activityLog.target.description.value.dataSources

  const newDs = ds.map((d: any) => {
    const { reference } = d
    if (reference.link && reference.text) {
      return {
        ...d,
        reference: `<div><a target='_blank' rel="nofollow" href='${reference.link}'>${reference.text}</a></div>`,
      }
    }
    if (reference.link && !reference.text) {
      return {
        ...d,
        reference: `<div><a target='_blank' rel="nofollow" href='${reference.link}'>${reference.link}</a></div>`,
      }
    }
    if (!reference.link && reference.text) {
      return {
        ...d,
        reference: `<div>${reference.text}</div>`,
      }
    }

    if (
      (reference.link === '' && reference.text === '') ||
      (!reference.link && reference.text === '') ||
      (reference.link === '' && !reference.text)
    ) {
      return {
        ...d,
        reference: '',
      }
    }

    return d
  })

  const newActivityLog = { ...activityLog }
  newActivityLog.target.description.value.dataSources = newDs
  return newActivityLog
}

export default async (client: BaseProtocol) => {
  const activityLogs = await client.many(`
      with data_source_activity_log as (
          select *,
                 jsonb_array_elements(al.target -> 'description' -> 'value' -> 'dataSources') as ds
          from activity_log al
          where message = 'descriptionUpdate'
            and target ->> 'name' = 'dataSources'
          )
      select *
      from public.activity_log
      where id in (select id
                   from data_source_activity_log dsal
                   where dsal.ds -> 'reference' ->> 'link' is not null or dsal.ds -> 'reference' ->> 'text' is not null)
  `)

  const fixedActivityLogs = activityLogs.map(_fixActivityLog)

  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['id', { name: 'target', cast: 'jsonb' }], { table: 'activity_log' })
  const query = `${pgp.helpers.update(fixedActivityLogs, cs)} WHERE v.id = t.id`

  fixedActivityLogs.forEach((al) => {
    const url = process.env.APP_URI.replace('9001', '9000')
    Logger.debug(`fixed: ${url}/assessments/fra/2025/${al.country_iso}/sections/${al.section}`)
  })

  await client.none(query)
}
