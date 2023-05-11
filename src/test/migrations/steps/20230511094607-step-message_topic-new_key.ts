import { AssessmentController } from '@server/controller/assessment'
import { BaseProtocol, Schemas } from '@server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  await client.query(`
    update ${schemaCycle}.message_topic mt
    set key=CONCAT('odp-', temprow.year, '-', temprow.key)
    from (
      select mt.id, mt.key, odp.year, split_part(mt.key, '-', 1) as odp_id
      from ${schemaCycle}.message_topic mt
      left join ${schemaCycle}.original_data_point odp on odp.id = CAST(split_part(mt.key, '-', 1) as INTEGER)
      where split_part(mt.key, '-', 2) in ('dataSourceReferences', 'dataSourceMethods', 'dataSourceAdditionalComments', 'class')
      and mt.key not like 'odp-%'
    ) temprow
    where mt.id=temprow.id`)
}
