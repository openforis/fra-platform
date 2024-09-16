import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map((cycle) => {
          const schemaCycle = Schemas.getNameCycle(assessment, cycle)
          return DB.query(`
              alter table ${schemaCycle}.descriptions
                  alter column section_name type varchar(256) using section_name::varchar(256);

              alter table ${schemaCycle}.descriptions
                  alter column name type varchar(256) using name::varchar(256);
          `)
        })
      )
    )
  )
}
