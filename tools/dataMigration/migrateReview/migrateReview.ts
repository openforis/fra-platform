import * as pgPromise from 'pg-promise'

import { Assessment } from '../../../meta/assessment/assessment'
import { BaseProtocol } from '../../../server/db'
import { DBNames } from '../_DBNames'
import { getOdpTopics } from './getOdpTopics'
import { getTableTopics } from './getTableTopics'

export const migrateReview = async (props: { assessment: Assessment }, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle = assessment.cycles.find((cycle) => cycle.name === '2020')

  const tableTopics = await getTableTopics(props, client)
  const odpTopics = await getOdpTopics({ assessment, cycle }, client)

  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, cycle.name)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['id', 'country_iso', 'key', 'status', 'type'], {
    table: { table: 'message_topic', schema: schemaCycle },
  })
  const query = pgp.helpers.insert([...tableTopics, ...odpTopics], cs)
  await client.query(query)
  await client.query(
    `select setval('${schemaCycle}.message_topic_id_seq', (select max(id) from ${schemaCycle}.message_topic), true);`
  )

  await client.query(`
      insert into ${schemaCycle}.message (topic_id, user_id, message, deleted, created_time)
      select c.issue_id   as topic_id,
             u.id         as user_id,
             c.message,
             c.deleted,
             c.added_time as created_time
      from _legacy.fra_comment c
               left join _legacy.fra_user fu on c.user_id = fu.id
               left join users u on lower(trim(fu.email)) = lower(trim(u.email))
               join ${schemaCycle}.message_topic t on t.id = c.issue_id;
  `)

  await client.query(`
      insert into ${schemaCycle}.message_topic_user (topic_id, user_id, last_open_time)
      select ui.issue_id  as topic_id,
             u.id         as user_id,
             ui.read_time as last_open_time
      from _legacy.user_issue ui
               left join _legacy.fra_user fu
                         on ui.user_id = fu.id
               left join users u
                         on lower(trim(fu.email)) = lower(trim(u.email))
               join ${schemaCycle}.message_topic t on t.id = ui.issue_id;
  `)
}
