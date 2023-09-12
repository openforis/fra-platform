import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2020' },
    client
  )

  const schmaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
      update ${schmaCycle}.descriptions d
      set value = value || jsonb_build_object('text', ld.content)
      from _legacy.descriptions ld
      where d.country_iso = ld.country_iso
        and d.section_name = ld.section
        and d.name = ld.name
        and ld.content is not null
        and value ->> 'text' like '%img%'
      returning d.country_iso, d.section_name, d.name, value ->> 'text' as text, ld.content as content
  `)
}
