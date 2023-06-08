import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025', metaCache: true },
    client
  )

  const schemaName = Schemas.getName(assessment)

  await client.query(
    `
      update ${schemaName}.section
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.forestPolicy.forestPolicy2025"')
      where props ->> 'name' = 'forestPolicy';
    `
  )

  await client.query(
    `
      update ${schemaName}.section
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.areaOfPermanentForestEstate.areaOfPermanentForestEstate2025"')
      where props ->> 'name' = 'areaOfPermanentForestEstate';
    `
  )

  await client.query(
    `
      update ${schemaName}.section
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.holderOfManagementRights.holderOfManagementRights2025"')
      where props ->> 'name' = 'holderOfManagementRights';
    `
  )

  await client.query(
    `
      update ${schemaName}.section
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.designatedManagementObjective.designatedManagementObjective2025"')
      where props ->> 'name' = 'designatedManagementObjective';
    `
  )

  await client.query(
    `
      update ${schemaName}.col
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.specificForestCategories.rubberWood2025"')
      where id in (
        select c.id
        from  ${schemaName}.table t
          left join ${schemaName}.row r on t.id = r.table_id
          left join ${schemaName}.col c on r.id = c.row_id
        where t.props ->> 'name' = 'specificForestCategories'
          and r.props ->> 'variableName' = 'rubber_wood'
          and c.props ->> 'colType' = 'header'
      );
    `
  )

  await client.query(
    `
      update ${schemaName}.col
      set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"fra.forestAreaChange.forestAreaNetChange2025"')
      where id in (
        select c.id
        from  ${schemaName}.table t
          left join ${schemaName}.row r on t.id = r.table_id
          left join ${schemaName}.col c on r.id = c.row_id
        where t.props ->> 'name' = 'forestAreaChange'
          and r.props ->> 'variableName' = 'forestAreaNetChange'
          and c.props ->> 'colType' = 'header'
      );
    `
  )
}
