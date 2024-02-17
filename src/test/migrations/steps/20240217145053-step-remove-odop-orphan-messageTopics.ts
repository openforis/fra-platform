import { Topics } from 'meta/messageCenter'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map(async (cycle) => {
          const schemaCycle = Schemas.getNameCycle(assessment, cycle)

          await client.query(`
              with topics as
                  (select t.id                               as topic_id
                        , split_part(t.key, '-', 2)::numeric as topic_opd_id
                        , t.country_iso
                   from ${schemaCycle}.message_topic t
                   where t.key like '${Topics.getOdpReviewTopicKeyPrefix('%')}%')
                 , topics_odp as
                  (select t.topic_id
                        , t.topic_opd_id
                        , t.country_iso
                        , odp.id as odp_id
                   from topics t
                            left outer join ${schemaCycle}.original_data_point odp on odp.id = t.topic_opd_id)
              delete
              from ${schemaCycle}.message_topic mt
              where mt.id in
                    (select t.topic_id
                     from topics_odp t
                     where t.odp_id is null)
          `)
        })
      )
    )
  )
}
