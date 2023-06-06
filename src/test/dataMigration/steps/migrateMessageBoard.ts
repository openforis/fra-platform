import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const migrateMessageBoard = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle = assessment.cycles.find((c) => c.name === '2020')
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
      insert into ${schemaCycle}.message_topic (country_iso, key, type)
      select distinct m.country_iso, 'message_board' as key, 'messageBoard'::message_topic_type as type
      from _legacy.country_message_board_message m;

      insert into ${schemaCycle}.message (topic_id, user_id, message, created_time)
      select t.id   as topic_id,
             u.id   as user_id,
             m.text as message,
             m.time as created_time
      from _legacy.country_message_board_message m
               left join ${schemaCycle}.message_topic t
                         on m.country_iso = t.country_iso and t.type = 'messageBoard'
               left join _legacy.fra_user fu
                         on m.from_user = fu.id
               left join users u
                         on lower(trim(fu.email)) = lower(trim(u.email))
      ;

      with r as (
          select m.country_iso,
                 r.user_id,
                 r.message_id,
                 r.time,
                 row_number() over (partition by m.country_iso,r.user_id order by r.time desc ) as row_number
          from _legacy.country_message_board_message_read r
                   left join _legacy.country_message_board_message m
                             on r.message_id = m.id
      )
      insert
      into ${schemaCycle}.message_topic_user (topic_id, user_id, last_open_time)
      select t.id   as topic_id,
             u.id   as user_id,
             r.time as last_open_time
      from r
               left join ${schemaCycle}.message_topic t
                         on r.country_iso = t.country_iso and t.type = 'messageBoard'
               left join _legacy.fra_user fu
                         on r.user_id = fu.id
               left join users u
                         on lower(trim(fu.email)) = lower(trim(u.email))
      where r.row_number = 1
      ;

  `)
}
