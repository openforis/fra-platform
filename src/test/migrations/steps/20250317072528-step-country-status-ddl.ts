import { AssessmentStatus } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      return Promise.all(
        assessment.cycles.map(async (cycle) => {
          const schemaName = Schemas.getNameCycle(assessment, cycle)
          await DB.query(
            `alter table ${schemaName}.country add column status varchar(16) default '${AssessmentStatus.notStarted}'::varchar;`
          )
          await DB.query(`update ${schemaName}.country set status = props->>'status';`)
          await DB.query(`update ${schemaName}.country set props = props - 'status';`)

          await CountrySummaryRepository.dropMaterializedView({ assessment, cycle }, client)
          await CountrySummaryRepository.createMaterializedView({ assessment, cycle }, client)
        })
      )
    })
  )
}
