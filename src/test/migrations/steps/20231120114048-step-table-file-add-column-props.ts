import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promises.each(assessments, (assesment) =>
    client.query(`
          alter table ${Schemas.getName(assesment)}.file add column props jsonb default '{}';

          update
              ${Schemas.getName(assesment)}.file
          set
              props = jsonb_build_object('hidden', private)
          where private is not null;

          alter table ${Schemas.getName(assesment)}.file drop column private;
      `)
  )
}
