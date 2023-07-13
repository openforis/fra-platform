import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await client.query(
    assessment.cycles.map((cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      return `update ${schemaCycle}.node n
              set value = jsonb_delete_path(n.value, '{validation}');
      `
    }).join(`
  `)
  )
}
