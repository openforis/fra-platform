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

  const labelsToChange = [
    {
      label: 'fra.specificForestCategories.rubberWood2025',
      tableName: 'specificForestCategories',
      variableName: 'rubber_wood',
      colType: 'header',
    },
    {
      label: 'fra.forestAreaChange.forestAreaNetChange2025',
      tableName: 'forestAreaChange',
      variableName: 'forestAreaNetChange',
      colType: 'header',
    },
    {
      label: 'fra.otherLandWithTreeCover.agroforestry2025',
      tableName: 'otherLandWithTreeCover',
      variableName: 'agroforestry',
      colType: 'header',
    },
    {
      label: 'fra.otherLandWithTreeCover.other2025',
      tableName: 'otherLandWithTreeCover',
      variableName: 'other',
      colType: 'header',
    },
    {
      label: 'fra.forestOwnership.ofWhichPrivateBusinesses2025',
      tableName: 'forestOwnership',
      variableName: 'of_which_by_private_businesses',
      colType: 'header',
    },
    {
      label: 'fra.holderOfManagementRights.privateBusinesses2025',
      tableName: 'holderOfManagementRights',
      variableName: 'holderOfManagementRights',
      colType: 'header',
    },
    {
      label: 'fra.areaAffectedByFire.totalLandAreaAffectedByFire2025',
      tableName: 'areaAffectedByFire',
      variableName: 'total_land_area_affected_by_fire',
      colType: 'header',
    },
    {
      label: 'fra.sustainableDevelopment.aboveGroundBiomassStockForests2025',
      tableName: 'sustainableDevelopment15_2_1_2',
      variableName: 'aboveGroundBiomassStockForests',
      colType: 'header',
    },
    {
      label: 'fra.sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas2025',
      tableName: 'sustainableDevelopment15_2_1_3',
      variableName: 'proportionForestAreaLegallyEstablishedProtectedAreas',
      colType: 'header',
    },
    {
      label: 'fra.sustainableDevelopment.proportionForestAreaLongTermForestManagement2025',
      tableName: 'sustainableDevelopment15_2_1_4',
      variableName: 'proportionForestAreaLongTermForestManagement',
      colType: 'header',
    },
    {
      label: 'fra.sustainableDevelopment.forestAreaVerifiedForestManagement2025',
      tableName: 'sustainableDevelopment15_2_1_5',
      variableName: 'forestAreaVerifiedForestManagement',
      colType: 'header',
    },
  ]

  await Promise.all(
    labelsToChange.map((labelToChange) => {
      const { label, tableName, variableName, colType } = labelToChange

      return client.query(
        `
        update ${schemaName}.col
        set props = jsonb_set(props, '{labels,"${cycle.uuid}",key}', '"${label}"')
        where id in (
          select c.id
          from  ${schemaName}.table t
            left join ${schemaName}.row r on t.id = r.table_id
            left join ${schemaName}.col c on r.id = c.row_id
          where t.props ->> 'name' = $1
            and r.props ->> 'variableName' = $2
            and c.props ->> 'colType' = $3
        );
      `,
        [tableName, variableName, colType]
      )
    })
  )
}
