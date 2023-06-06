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
}
