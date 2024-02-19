import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)
  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map((cycle) => {
          const schemaCycle = Schemas.getNameCycle(assessment, cycle)

          return client.query(`
              update ${schemaCycle}.descriptions
              set value = jsonb_build_object('text', '')
              where id in
                    (select id
                     from ${schemaCycle}.descriptions
                     where value ->> 'text' = '<p><br></p>'
                        or value ->> 'text' = '<div><br></div>')

          `)
        })
      )
    )
  )
}
