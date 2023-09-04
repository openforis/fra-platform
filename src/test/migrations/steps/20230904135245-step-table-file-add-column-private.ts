import { BaseProtocol, Schemas } from 'server/db'
import { AssessmentRepository } from 'server/repository/assessment/assessment'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentRepository.getAll({}, client)

  await Promise.all(
    assessments.map((assesment) =>
      client.query(`
          alter table ${Schemas.getName(assesment)}.file
              add private boolean;
      `)
    )
  )
}
