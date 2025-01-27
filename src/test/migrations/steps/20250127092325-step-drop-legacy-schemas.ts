import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { Logger } from 'server/utils/logger'

const client: BaseProtocol = DB

const _printDBSize = async () => {
  const { database_size: size } = await client.one(
    `select pg_size_pretty(pg_database_size(current_database())) as database_size;`
  )
  Logger.info(size)
}

export default async () => {
  await _printDBSize()

  // drop assessmentName.file
  const assessments = await AssessmentController.getAll({}, client)
  await Promises.each(assessments, async (assessment) => {
    const schemaName = Schemas.getName(assessment)
    await client.query(`drop table if exists ${schemaName}.file`)
  })

  // drop legacy schemas
  await client.query(`
  drop schema if exists _legacy cascade;
  drop schema if exists _legacy_assessment_fra_2020 cascade;
  drop schema if exists _legacy_assessment_fra_2025 cascade;
  drop schema if exists _legacy_pan_european cascade;
`)

  await _printDBSize()
}
