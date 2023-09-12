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
      label: 'fra.growingStockComposition.remainingNative2025',
      tableName: 'growingStockComposition2025',
      variableName: 'remainingNative',
      colType: 'header',
    },
    {
      label: 'fra.growingStockComposition.remainingIntroduced2025',
      tableName: 'growingStockComposition2025',
      variableName: 'remainingIntroduced',
      colType: 'header',
    },
    {
      label: 'fra.degradedForest.criteriaOfDegradedForest2025',
      tableName: 'degradedForest2025',
      variableName: 'criteriaOfDegradedForest',
      colType: 'header',
    },
    {
      label: 'fra.forestPolicy.policiesSFM2025',
      tableName: 'forestPolicy',
      variableName: 'policies_supporting_SFM',
      colType: 'header',
    },
    {
      label: 'fra.forestPolicy.legislationsSFM2025',
      tableName: 'forestPolicy',
      variableName: 'legislations_supporting_SFM',
      colType: 'header',
    },
    {
      label: 'fra.forestPolicy.stakeholderParticipation2025',
      tableName: 'forestPolicy',
      variableName: 'platform_for_stakeholder_participation',
      colType: 'header',
    },
    {
      label: 'fra.forestPolicy.existenceOfTraceabilitySystem2025',
      tableName: 'forestPolicy',
      variableName: 'existence_of_traceability_system',
      colType: 'header',
    },
    {
      label: 'fra.nonWoodForestProductsRemovals.allOtherPlantProducts2025',
      tableName: 'nonWoodForestProductsRemovals',
      variableName: 'all_other_plant_products',
      colType: 'header',
    },
    {
      label: 'fra.nonWoodForestProductsRemovals.allOtherAnimalProducts2025',
      tableName: 'nonWoodForestProductsRemovals',
      variableName: 'all_other_animal_products',
      colType: 'header',
    },
    {
      label: 'fra.nonWoodForestProductsRemovals.currency2025',
      tableName: 'nonWoodForestProductsRemovalsCurrency',
      variableName: 'currency',
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

    {
      label: 'fra.growingStock.plantedForest2025',
      tableName: 'growingStockAvg',
      variableName: 'plantedForest',
      colType: 'header',
    },
    {
      label: 'fra.growingStock.otherPlantedForest2025',
      tableName: 'growingStockTotal',
      variableName: 'otherPlantedForest',
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

  const nonWoodForestProductsRemovalsLabels = [
    {
      label: 'fra.nonWoodForestProductsRemovals.nameOfProduct2025',
      tableName: 'nonWoodForestProductsRemovals',
      rowType: 'header',
      colIndex: '1',
    },
  ]

  await Promise.all(
    nonWoodForestProductsRemovalsLabels.map((labelToChange) => {
      const { label, tableName, rowType, colIndex } = labelToChange

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
            and r.props ->> 'type' = $2
            and c.props ->> 'index' = $3
        );
      `,
        [tableName, rowType, colIndex]
      )
    })
  )

  const growingStockStatusDescriptionLabels = [
    {
      label: 'fra.growingStock_growingStockStatus_Description.status2025.high',
      tableName: 'growingStock_growingStockStatus_Description',
      rowType: 'data',
      rowIndex: '0',
      colIndex: '1',
    },
    {
      label: 'fra.growingStock_growingStockStatus_Description.status2025.medium',
      tableName: 'growingStock_growingStockStatus_Description',
      rowType: 'data',
      rowIndex: '1',
      colIndex: '1',
    },
    {
      label: 'fra.growingStock_growingStockStatus_Description.status2025.low',
      tableName: 'growingStock_growingStockStatus_Description',
      rowType: 'data',
      rowIndex: '2',
      colIndex: '1',
    },
  ]

  await Promise.all(
    growingStockStatusDescriptionLabels.map((labelToChange) => {
      const { label, tableName, rowType, rowIndex, colIndex } = labelToChange

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
            and r.props ->> 'type' = $2
            and r.props ->> 'index' = $3
            and c.props ->> 'index' = $4
        );
      `,
        [tableName, rowType, rowIndex, colIndex]
      )
    })
  )
}
