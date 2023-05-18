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
    set key=CONCAT('odp-', temprow.key)
    from (
      select mt.id, mt.key from ${schemaCycle}.message_topic mt
      where split_part(mt.key, '-', 2) in ('dataSourceReferences', 'dataSourceMethods', 'dataSourceAdditionalComments', 'class')
      and mt.key not like 'odp-%'
      and mt.key not like '-%'
    ) temprow
    where mt.id=temprow.id`)
}
