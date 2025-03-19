import { AssessmentStatus } from 'meta/area'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { CountrySummaryRepository } from 'server/repository/assessmentCycle/countrySummary'
import { AreaRedisRepository } from 'server/repository/redis/area'

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
          await DB.query(`update ${schemaName}.country set status = (
              select cs.status
              from ${schemaName}.country_summary cs
              where cs.country_iso = country.country_iso
          );`)
          await DB.query(`update ${schemaName}.country set props = props - 'status';`)

          await CountrySummaryRepository.dropMaterializedView({ assessment, cycle }, client)
          await CountrySummaryRepository.createMaterializedView({ assessment, cycle }, client)

          await AreaRedisRepository.getManyCountrySummaries({ assessment, cycle, force: true }, client)
          await AreaRedisRepository.getManyRegionGroups({ assessment, cycle, force: true }, client)
        })
      )
    })
  )
}
