import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      // drop orphan message topic rows rel. to data source
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      await client.none(`
          with activity_log_data_source_uuids as 
              (select
                   jsonb_array_elements(al.target -> 'description' -> 'value' -> 'dataSources') ->> 'uuid'
              as data_source_uuid
          from activity_log al
          where message = 'descriptionUpdate'
            and target ->> 'name' = 'dataSources'),
              
              data_sources as (select jsonb_array_elements(d.value -> 'dataSources') ->> 'uuid' as uuid
          from ${schemaCycle}.descriptions d
          where d.value ->> 'dataSources' is not null)
          
          delete from ${schemaCycle}.message_topic mt
          -- message topic is orphan if data source uuid is found in activity log but not anymore in data sources
          where key ~ '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$'
            and key in (select data_source_uuid from activity_log_data_source_uuids)
            and key not in (select uuid from data_sources);

      `)

      await client.none(`
          update ${schemaCycle}.message_topic mt
          set key = 'dataSource_' || key
          where key ~ '^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$'
          and key in (select jsonb_array_elements(d.value -> 'dataSources') ->> 'uuid' as uuid
                      from ${schemaCycle}.descriptions d
                      where d.value ->> 'dataSources' is not null)
      `)
    })
  })
}
