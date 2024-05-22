import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment2020 = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2020' },
    client
  )
  const assessment2025 = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaCycle2020 = Schemas.getNameCycle(assessment2020.assessment, assessment2020.cycle)
  const schemaCycle2025 = Schemas.getNameCycle(assessment2025.assessment, assessment2025.cycle)

  await client.query(`
      insert into ${schemaCycle2020}.node_ext (country_iso, props, type, value)
      select country_iso, props, type, value
      from ${schemaCycle2025}.node_ext ne
      where ne.props ->> 'variableName' = 'totalLandArea'
        and ne.props ->> 'colName' < '1980'
        and not exists (select 1
          from ${schemaCycle2020}.node_ext ne2
          where ne2.country_iso = ne.country_iso
        and ne2.props ->> 'variableName' = 'totalLandArea'
        and ne2.props ->> 'colName' < '1980')
  `)

  await AssessmentController.generateDataCache({ ...assessment2020, force: true }, client)
}
