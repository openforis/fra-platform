import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

const client: BaseProtocol = DB

// Add message_topic.uuid and reference it from message and message_topic_user:
// - message_topic : add uuid
// - message.topic_id -> message.topic_uuid
// - message_topic_user.topic_id -> message_topic_user.topic_uuid
// - activity_log.target : add the topic uuid
export default async (): Promise<void> => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      // 1. add message_topic.uuid
      await client.query(`
          alter table ${schemaCycle}.message_topic
              add column if not exists uuid uuid default uuid_generate_v4() not null;

          alter table ${schemaCycle}.message_topic
              add constraint message_topic_uuid_unique unique (uuid);
      `)

      // 2. add topic_uuid and populate it from topic_id
      await client.query(`
          alter table ${schemaCycle}.message
              add column if not exists topic_uuid uuid;

          alter table ${schemaCycle}.message_topic_user
              add column if not exists topic_uuid uuid;

          update ${schemaCycle}.message m
          set topic_uuid = mt.uuid
          from ${schemaCycle}.message_topic mt
          where m.topic_id = mt.id;

          update ${schemaCycle}.message_topic_user mtu
          set topic_uuid = mt.uuid
          from ${schemaCycle}.message_topic mt
          where mtu.topic_id = mt.id;
      `)

      // 3. add the topic uuid to the activity log

      // 4. drop the deprecated topic_id columns and add constraints
      await client.query(`
          -- message
          alter table ${schemaCycle}.message
              alter column topic_uuid set not null,
              add constraint message_message_topic_uuid_fk
                  foreign key (topic_uuid) references ${schemaCycle}.message_topic (uuid)
                      on update cascade on delete cascade;

          alter table ${schemaCycle}.message drop column if exists topic_id;

          -- message topic
          alter table ${schemaCycle}.message_topic_user
              alter column topic_uuid set not null,
              add constraint message_topic_user_message_topic_uuid_fk
                  foreign key (topic_uuid) references ${schemaCycle}.message_topic (uuid)
                      on update cascade on delete cascade;

          alter table ${schemaCycle}.message_topic_user drop column if exists topic_id;
      `)
    })
  })
}
