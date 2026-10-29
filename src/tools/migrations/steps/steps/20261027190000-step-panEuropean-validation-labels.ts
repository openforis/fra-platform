import { AssessmentNames } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { CycleNames } from 'meta/assessment/cycle/names'

import { CacheController } from 'server/cache/controller'
import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol } from 'server/db/db'
import { Schemas } from 'server/db/schemas'
import { Logger } from 'server/utils/logger'

const assessmentName = AssessmentNames.panEuropean
const cycleName = CycleNames._2025
const schemaName = Schemas.getSchemaAssessment({ assessmentName })

type UpdateProps = {
  cycleUuid: string
  tableName: string
  variableName: string
  validateFns: Array<string>
}

const updateRow = async (client: BaseProtocol, props: UpdateProps): Promise<void> => {
  const rowCount = await client.result(
    `
    update ${schemaName}.row r
    set props = jsonb_set(r.props, array['validateFns', $(cycleUuid)], to_jsonb($(validateFns)::text[]))
    from ${schemaName}.table t
    where r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and r.props -> 'cycles' ? $(cycleUuid)
      and r.props -> 'validateFns' ? $(cycleUuid)
    `,
    props,
    (result) => result.rowCount
  )
  Logger.info(`step-panEuropean-validation-labels: ${props.tableName} ${props.variableName}: ${rowCount} rows updated`)
}

const updateCol = async (client: BaseProtocol, props: UpdateProps & { colName: string }): Promise<void> => {
  const rowCount = await client.result(
    `
    update ${schemaName}.col c
    set props = jsonb_set(c.props, array['validateFns', $(cycleUuid)], to_jsonb($(validateFns)::text[]))
    from ${schemaName}.row r, ${schemaName}.table t
    where c.row_uuid = r.uuid
      and r.table_uuid = t.uuid
      and t.props ->> 'name' = $(tableName)
      and r.props ->> 'variableName' = $(variableName)
      and c.props ->> 'colName' = $(colName)
      and c.props -> 'cycles' ? $(cycleUuid)
      and c.props -> 'validateFns' ? $(cycleUuid)
    `,
    props,
    (result) => result.rowCount
  )
  Logger.info(
    `step-panEuropean-validation-labels: ${props.tableName} ${props.variableName} ${props.colName}: ${rowCount} columns updated`
  )
}

// 1.2.I Growing stock
const updateTable12a = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_1_2a'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_2a.forest_${year}['total'], [table_1_2a.forest_${year}['coniferous'],table_1_2a.forest_${year}['broadleaved']], "Forest", "panEuropean.growingStock.total", "1.2.I", ["panEuropean.growingStock.coniferous", "panEuropean.growingStock.broadleaved"])`,
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `_of_which_available_for_wood_supply_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_2a._of_which_available_for_wood_supply_${year}['total'], [table_1_2a._of_which_available_for_wood_supply_${year}['coniferous'],table_1_2a._of_which_available_for_wood_supply_${year}['broadleaved']], "panEuropean.growingStock.of_which_available_for_wood_supply_only", "panEuropean.growingStock.total", "1.2.I", ["panEuropean.growingStock.coniferous", "panEuropean.growingStock.broadleaved"])`,
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `other_wooded_land_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_2a.other_wooded_land_${year}['total'], [table_1_2a.other_wooded_land_${year}['coniferous'],table_1_2a.other_wooded_land_${year}['broadleaved']], "panEuropean.growingStock.other_wooded_land_only", "panEuropean.growingStock.total", "1.2.I", ["panEuropean.growingStock.coniferous", "panEuropean.growingStock.broadleaved"])`,
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `total_forest_and_other_wooded_land_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_${year}['total'], [table_1_2a.total_forest_and_other_wooded_land_${year}['coniferous'],table_1_2a.total_forest_and_other_wooded_land_${year}['broadleaved']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.growingStock.total", "1.2.I", ["panEuropean.growingStock.coniferous", "panEuropean.growingStock.broadleaved"])`,
        ],
      }),
      ...['total', 'coniferous', 'broadleaved'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_1_2a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_1_2a.forest_${year}['${colName}'],table_1_2a.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.growingStock.${colName}", "1.2.I", ["Forest", "panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      ),
    ])
  )
}

// 1.3.I Age class distribution (area of even-aged stands)
const updateTable13a1 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_1_3a1'
  const phaseLabels =
    '["panEuropean.ageClassDistributionAreaOfEvenAgedStands.intermediate_phase","panEuropean.ageClassDistributionAreaOfEvenAgedStands.mature_phase","panEuropean.ageClassDistributionAreaOfEvenAgedStands.regeneration_phase","panEuropean.ageClassDistributionAreaOfEvenAgedStands.unspecified"]'
  const getRowFn = (variableName: string, parentLabel: string): string => {
    const parent = `table_1_3a1.${variableName}['total_area']`
    const categories = `[table_1_3a1.${variableName}['intermediate_phase'],table_1_3a1.${variableName}['mature_phase'], table_1_3a1.${variableName}['regeneration_phase'],table_1_3a1.${variableName}['unspecified']]`
    return `validatorEqualToSum(${parent}, ${categories}, "${parentLabel}", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.total_area", "1.3a.I", ${phaseLabels})`
  }

  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `available_for_wood_supply_of_which_${year}`,
        validateFns: [
          getRowFn(
            `available_for_wood_supply_of_which_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply'
          ),
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_even_aged_stands_of_which_${year}`,
        validateFns: [
          getRowFn(
            `forest_even_aged_stands_of_which_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_even_aged'
          ),
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `mixed_forest_${year}`,
        validateFns: [getRowFn(`mixed_forest_${year}`, 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed')],
      }),
      ...[
        `mixed_forest_${year}`,
        `predominantly_broadleaved_forest_${year}`,
        `predominantly_coniferous_forest_${year}`,
      ].flatMap((variableName) =>
        ['regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'].map((colName) =>
          updateCol(client, {
            cycleUuid,
            tableName,
            variableName,
            colName,
            validateFns: [
              `validatorEqualToSum(table_1_3a1.available_for_wood_supply_of_which_${year}['${colName}'], [table_1_3a1.predominantly_coniferous_forest_${year}['${colName}'],table_1_3a1.mixed_forest_${year}['${colName}'], table_1_3a1.predominantly_broadleaved_forest_${year}['${colName}']], "panEuropean.ageClassDistributionAreaOfEvenAgedStands.available_for_wood_supply", "panEuropean.ageClassDistributionAreaOfEvenAgedStands.${colName}", "1.3a.I", ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS","panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed","panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS"])`,
            ],
          })
        )
      ),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `predominantly_broadleaved_forest_${year}`,
        validateFns: [
          getRowFn(
            `predominantly_broadleaved_forest_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS'
          ),
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `predominantly_coniferous_forest_${year}`,
        validateFns: [
          getRowFn(
            `predominantly_coniferous_forest_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS'
          ),
        ],
      }),
    ])
  )
}

// 1.3.II Age class distribution (volume of even-aged stands) in forest available for wood supply
const updateTable13a2 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_1_3a2'
  const phaseLabels =
    '["panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.intermediate_phase","panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.mature_phase","panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.regeneration_phase","panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.unspecified"]'
  const getRowFn = (variableName: string, parentLabel: string): string => {
    const parent = `table_1_3a2.${variableName}['total_volume']`
    const categories = `[table_1_3a2.${variableName}['intermediate_phase'],table_1_3a2.${variableName}['mature_phase'], table_1_3a2.${variableName}['regeneration_phase'],table_1_3a2.${variableName}['unspecified']]`
    return `validatorEqualToSum(${parent}, ${categories}, "${parentLabel}", "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.total_volume", "1.3a2", ${phaseLabels})`
  }

  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_available_for_wood_supply_even_aged_stands_of_which_${year}`,
        validateFns: [
          getRowFn(
            `forest_available_for_wood_supply_even_aged_stands_of_which_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_available_even_aged'
          ),
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `mixed_forest_${year}`,
        validateFns: [getRowFn(`mixed_forest_${year}`, 'panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed')],
      }),
      ...[
        `mixed_forest_${year}`,
        `predominantly_broadleaved_forest_${year}`,
        `predominantly_coniferous_forest_${year}`,
      ].flatMap((variableName) =>
        ['regeneration_phase', 'intermediate_phase', 'mature_phase', 'unspecified'].map((colName) =>
          updateCol(client, {
            cycleUuid,
            tableName,
            variableName,
            colName,
            validateFns: [
              `validatorEqualToSum(table_1_3a2.forest_available_for_wood_supply_even_aged_stands_of_which_${year}['${colName}'], [table_1_3a2.predominantly_coniferous_forest_${year}['${colName}'], table_1_3a2.mixed_forest_${year}['${colName}'], table_1_3a2.predominantly_broadleaved_forest_${year}['${colName}']], "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_available_even_aged", "panEuropean.ageClassDistributionVolumeOfEvenAgedStandsInForestAvailableForWoodSupply.${colName}", "1.3a2", ["panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS","panEuropean.ageClassDistributionAreaOfEvenAgedStands.mixed","panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS"])`,
            ],
          })
        )
      ),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `predominantly_broadleaved_forest_${year}`,
        validateFns: [
          getRowFn(
            `predominantly_broadleaved_forest_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_broadleaved_FAWS'
          ),
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `predominantly_coniferous_forest_${year}`,
        validateFns: [
          getRowFn(
            `predominantly_coniferous_forest_${year}`,
            'panEuropean.ageClassDistributionAreaOfEvenAgedStands.predominantly_coniferous_FAWS'
          ),
        ],
      }),
    ])
  )
}

// 1.3.III Diameter distribution and total area (uneven-aged stands)
const updateTable13b = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_1_3b'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].map((year) =>
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_uneven_aged_stands_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_3b.forest_uneven_aged_stands_${year}['total_volume'], [table_1_3b.forest_uneven_aged_stands_${year}['less_or_equal_20_cm'],table_1_3b.forest_uneven_aged_stands_${year}['_21_40_cm'], table_1_3b.forest_uneven_aged_stands_${year}['_41_60_cm'],table_1_3b.forest_uneven_aged_stands_${year}['greater_60_cm'], table_1_3b.forest_uneven_aged_stands_${year}['unspecified']], "panEuropean.ageClassDistributionAreaOfEvenAgedStands.forest_uneven_aged", "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.total_volume", "1.3.III", ["panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.less_or_equal_20_cm","panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._21_40_cm","panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands._41_60_cm","panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.greater_60_cm","panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.unspecified"])`,
        ],
      })
    )
  )
}

// 1.4.I Carbon stock
const updateTable14a = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_1_4a'
  await Promise.all(
    ['1990', '2000', '2010', '2015', '2020', '2025'].flatMap((year) =>
      ['above_ground', 'below_ground', 'deadwood', 'litter', 'soil_carbon'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `forest_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_1_4a.other_wooded_land_${year}['${colName}'], table_1_4a.forest_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.carbonStock.${colName}", "1.4.I", ["panEuropean.growingStock.other_wooded_land_only","Forest"])`,
          ],
        })
      )
    )
  )
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) =>
      ['above_ground', 'below_ground', 'deadwood', 'litter', 'soil_carbon'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_1_4a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_1_4a.other_wooded_land_${year}['${colName}'], table_1_4a.forest_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.carbonStock.${colName}", "1.4.I", ["panEuropean.growingStock.other_wooded_land_only","Forest"])`,
          ],
        })
      )
    )
  )
}

// 2.4 Forest area with damage
const updateTable24 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_2_4'
  await updateRow(client, {
    cycleUuid,
    tableName,
    variableName: `forest_2022`,
    validateFns: [
      `validatorEqualToSum(table_2_4.forest_2022['total_area_with_damage'], [table_2_4.forest_2022['insects'], table_2_4.forest_2022['disease'],table_2_4.forest_2022['wildlife_and_grazing'], table_2_4.forest_2022['forest_operations'],table_2_4.forest_2022['other'], table_2_4.forest_2022['primarily_damaged_by_abiotic_agents'],table_2_4.forest_2022['primarily_damaged_by_fire_total'], table_2_4.forest_2022['unspecified_mixed_damage_2025']], "panEuropean.forestAreaWithDamage.forest_only", "panEuropean.forestAreaWithDamage.total_area_with_damage", "2.4", ["panEuropean.forestAreaWithDamage.insects","panEuropean.forestAreaWithDamage.disease","panEuropean.forestAreaWithDamage.wildlife_and_grazing","panEuropean.forestAreaWithDamage.forest_operations","panEuropean.forestAreaWithDamage.other","panEuropean.forestAreaWithDamage.primarily_damaged_by_abiotic_agents","panEuropean.forestAreaWithDamage.primarily_damaged_by_fire_total","panEuropean.forestAreaWithDamage.unspecifiedMixedDamage"])`,
    ],
  })
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].flatMap((year) => [
      ...[
        'total_area_with_damage',
        'insects',
        'wildlife_and_grazing',
        'forest_operations',
        'other',
        'primarily_damaged_by_abiotic_agents',
        'primarily_damaged_by_fire_total',
        'of_which_human_induced',
      ].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_${year}['${colName}'], [table_2_4.forest_${year}['${colName}'],table_2_4.other_wooded_land_${year}['${colName}']], "panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land_only", "panEuropean.forestAreaWithDamage.${colName}", "2.4", ["panEuropean.forestAreaWithDamage.forest_only","panEuropean.forestAreaWithDamage.other_wooded_land_only"])`,
          ],
        })
      ),
      updateCol(client, {
        cycleUuid,
        tableName,
        variableName: `total_forest_and_other_wooded_land_${year}`,
        colName: 'unspecified_mixed_damage_2025',
        validateFns: [
          `validatorEqualToSum(table_2_4.total_forest_and_other_wooded_land_${year}['unspecified_mixed_damage_2025'], [table_2_4.forest_${year}['unspecified_mixed_damage_2025'],table_2_4.other_wooded_land_${year}['unspecified_mixed_damage_2025']], "panEuropean.forestAreaWithDamage.total_forest_and_other_wooded_land_only", "panEuropean.forestAreaWithDamage.unspecifiedMixedDamage", "2.4", ["panEuropean.forestAreaWithDamage.forest_only","panEuropean.forestAreaWithDamage.other_wooded_land_only"])`,
        ],
      }),
    ])
  )
}

// 2.5 Area with forest land degradation
const updateTable25 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_2_5'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].map((year) =>
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_2_5.forest_${year}['totalAreaOfDegradedLand'], [table_2_5.forest_${year}['agentOne'], table_2_5.forest_${year}['agentTwo'], table_2_5.forest_${year}['agentThree'], table_2_5.forest_${year}['agentFour'], table_2_5.forest_${year}['agentFive'], table_2_5.forest_${year}['unknownMixedDegradation']], "Forest", "panEuropean.areaWithForestLandDegradation.totalAreaOfDegradedLand2025", "2.5", ["panEuropean.areaWithForestLandDegradation.agentOneLabel","panEuropean.areaWithForestLandDegradation.agentTwoLabel","panEuropean.areaWithForestLandDegradation.agentThreeLabel","panEuropean.areaWithForestLandDegradation.agentFourLabel","panEuropean.areaWithForestLandDegradation.agentFiveLabel","panEuropean.areaWithForestLandDegradation.unknownMixedDegradation2025"])`,
        ],
      })
    )
  )
}

// 3.3 Non-wood goods (2015)
const updateTable33 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_3_3'
  await updateRow(client, {
    cycleUuid,
    tableName,
    variableName: `total`,
    validateFns: [
      `validatorEqualToSum(table_3_3.total['name_of_groups_of_product'], [table_3_3._10th['market_value_1000_national_currency'], table_3_3._09th['market_value_1000_national_currency'], table_3_3._08th['market_value_1000_national_currency'], table_3_3._07th['market_value_1000_national_currency'], table_3_3._06th['market_value_1000_national_currency'], table_3_3._05th['market_value_1000_national_currency'], table_3_3._04th['market_value_1000_national_currency'], table_3_3._03rd['market_value_1000_national_currency'], table_3_3._02nd['market_value_1000_national_currency'], table_3_3._01st['market_value_1000_national_currency'], table_3_3.all_other_plant_products['name_of_groups_of_product'], table_3_3.all_other_animal_products['name_of_groups_of_product']], "panEuropean.nonWoodGoods2015.total", "panEuropean.nonWoodGoods2015.market_value_1000_national_currency", "3.3", ["panEuropean.nonWoodGoods2015._10th","panEuropean.nonWoodGoods2015._09th","panEuropean.nonWoodGoods2015._08th","panEuropean.nonWoodGoods2015._07th","panEuropean.nonWoodGoods2015._06th","panEuropean.nonWoodGoods2015._05th","panEuropean.nonWoodGoods2015._04th","panEuropean.nonWoodGoods2015._03rd","panEuropean.nonWoodGoods2015._02nd","panEuropean.nonWoodGoods2015._01st","panEuropean.nonWoodGoods2015.all_other_plant_products","panEuropean.nonWoodGoods2015.all_other_animal_products"])`,
    ],
  })
}

// 3.4 Marketed services (2015)
const updateTable34 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_3_4'
  await updateCol(client, {
    cycleUuid,
    tableName,
    variableName: `total`,
    colName: 'name_of_service_product',
    validateFns: [
      `validatorEqualToSum(table_3_4.total['name_of_service_product'], [table_3_4._10th['service_provision_value_1000_national_currency'], table_3_4._09th['service_provision_value_1000_national_currency'], table_3_4._08th['service_provision_value_1000_national_currency'], table_3_4._07th['service_provision_value_1000_national_currency'], table_3_4._06th['service_provision_value_1000_national_currency'], table_3_4._05th['service_provision_value_1000_national_currency'], table_3_4._04th['service_provision_value_1000_national_currency'], table_3_4._03rd['service_provision_value_1000_national_currency'], table_3_4._02nd['service_provision_value_1000_national_currency'], table_3_4._01st['service_provision_value_1000_national_currency'], table_3_4.remaining_total['name_of_service_product']], "panEuropean.marketedServices2015.total", "panEuropean.marketedServices2015.service_provision_value_1000_national_currency", "3.4", ["panEuropean.marketedServices2015._10th","panEuropean.marketedServices2015._09th","panEuropean.marketedServices2015._08th","panEuropean.marketedServices2015._07th","panEuropean.marketedServices2015._06th","panEuropean.marketedServices2015._05th","panEuropean.marketedServices2015._04th","panEuropean.marketedServices2015._03rd","panEuropean.marketedServices2015._02nd","panEuropean.marketedServices2015._01st","panEuropean.marketedServices2015.remaining_total"])`,
    ],
  })
}

// 4.1 Tree species composition
const updateTable41 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_4_1'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_1a.forest_${year}['area'], [table_4_1.forest_${year}['area_with_number_of_tree_species_occurring_1'], table_4_1.forest_${year}['area_with_number_of_tree_species_occurring_2_3'], table_4_1.forest_${year}['area_with_number_of_tree_species_occurring_4_5'], table_4_1.forest_${year}['area_with_number_of_tree_species_occurring_6_pl']], "panEuropean.diameterDistributionAndTotalAreaUnevenAgedStands.forest", "panEuropean.forestArea.area1000Ha", "1.1.I", ["panEuropean.treeSpeciesComposition.area_with_number_of_tree_species_occurring_1","panEuropean.treeSpeciesComposition.area_with_number_of_tree_species_occurring_2_3","panEuropean.treeSpeciesComposition.area_with_number_of_tree_species_occurring_4_5","panEuropean.treeSpeciesComposition.area_with_number_of_tree_species_occurring_6_pl"])`,
        ],
      }),
      ...[
        'area_with_number_of_tree_species_occurring_1',
        'area_with_number_of_tree_species_occurring_2_3',
        'area_with_number_of_tree_species_occurring_4_5',
        'area_with_number_of_tree_species_occurring_6_pl',
      ].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_4_1.total_forest_and_other_wooded_land_${year}['${colName}'], [table_4_1.forest_${year}['${colName}'],table_4_1.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.treeSpeciesComposition.${colName}", "4.1", ["Forest","panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      ),
    ])
  )
}

// 4.3.I Naturalness
const updateTable43a = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_4_3a'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_1_1a.forest_${year}['area'], [table_4_3a.forest_${year}['undisturbed_by_man'], table_4_3a.forest_${year}['semi_natural'], table_4_3a.forest_${year}['plantations']], "panEuropean.introducedTreeSpecies.forest_only", "panEuropean.forestArea.area1000Ha", "1.1a", ["panEuropean.naturalness.undisturbed_by_man","panEuropean.naturalness.semi_natural","panEuropean.naturalness.plantations"])`,
        ],
      }),
      ...['undisturbed_by_man', 'semi_natural', 'plantations'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_4_3a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_4_3a.forest_${year}['${colName}'],table_4_3a.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.naturalness.${colName}", "4.3.I", ["Forest","panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      ),
    ])
  )
}

// 4.4.I Area of stands dominated by introduced tree species
const updateTable44a = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_4_4a'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) =>
      ['total', '_of_which_invasive'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_4_4a.total_forest_and_other_wooded_land_${year}['${colName}'], [table_4_4a.forest_${year}['${colName}'],table_4_4a.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.introducedTreeSpecies.${colName}", "4.4.I", ["Forest","panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      )
    )
  )
}

// 4.5 Deadwood
const updateTable45 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_4_5'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_4_5.forest_${year}['total'], [table_4_5.forest_${year}['standing'],table_4_5.forest_${year}['lying']], "Forest", "panEuropean.deadwood.total", "4.5", ["panEuropean.deadwood.standing","panEuropean.deadwood.lying"])`,
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `other_wooded_land_${year}`,
        validateFns: [
          `validatorEqualToSum(table_4_5.other_wooded_land_${year}['total'], [table_4_5.other_wooded_land_${year}['standing'],table_4_5.other_wooded_land_${year}['lying']], "panEuropean.growingStock.other_wooded_land_only", "panEuropean.deadwood.total", "4.5", ["panEuropean.deadwood.standing","panEuropean.deadwood.lying"])`,
        ],
      }),
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `total_forest_and_other_wooded_land_${year}`,
        validateFns: [
          `validatorEqualToSum(table_4_5.total_forest_and_other_wooded_land_${year}['total'], [table_4_5.total_forest_and_other_wooded_land_${year}['standing'],table_4_5.total_forest_and_other_wooded_land_${year}['lying']], "panEuropean.deadwood.total_forest_and_other_wooded_land_only", "panEuropean.deadwood.total", "4.5", ["panEuropean.deadwood.standing","panEuropean.deadwood.lying"])`,
        ],
      }),
    ])
  )
}

// 4.9 Protected forests
const updateTable49 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_4_9'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) =>
      ['mcpfe_class_1_1', 'mcpfe_class_1_2', 'mcpfe_class_1_3', 'mcpfe_class_2'].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_4_9.total_forest_and_other_wooded_land_${year}['${colName}'], [table_4_9.forest_${year}['${colName}'],table_4_9.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.protectedForests.${colName}", "4.9", ["Forest","panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      )
    )
  )
}

// 5.1 Protective forests
const updateTable51 = async (client: BaseProtocol, cycleUuid: string): Promise<void> => {
  const tableName = 'table_5_1'
  await Promise.all(
    ['1990', '2000', '2005', '2010', '2015', '2020', '2025'].flatMap((year) => [
      updateRow(client, {
        cycleUuid,
        tableName,
        variableName: `forest_${year}`,
        validateFns: [
          `validatorEqualToSum(table_5_1.forest_${year}['total'], [table_5_1.forest_${year}['infrastructure_and_managed_natural_resources'], table_5_1.forest_${year}['soil_water_and_other_forest_ecosystem_functions']], "Forest", "panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.total", "5.1", ["panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.infrastructure_and_managed_natural_resources","panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.soil_water_and_other_forest_ecosystem_functions"])`,
        ],
      }),
      ...[
        'soil_water_and_other_forest_ecosystem_functions',
        'infrastructure_and_managed_natural_resources',
        'total',
      ].map((colName) =>
        updateCol(client, {
          cycleUuid,
          tableName,
          variableName: `total_forest_and_other_wooded_land_${year}`,
          colName,
          validateFns: [
            `validatorEqualToSum(table_5_1.total_forest_and_other_wooded_land_${year}['${colName}'], [table_5_1.forest_${year}['${colName}'],table_5_1.other_wooded_land_${year}['${colName}']], "panEuropean.growingStock.total_forest_and_other_wooded_land_only", "panEuropean.protectiveForestsSoilWaterAndOtherEcosystemFunctions.${colName}", "5.1", ["Forest","panEuropean.growingStock.other_wooded_land_only"])`,
          ],
        })
      ),
    ])
  )
}

export default async (client: BaseProtocol): Promise<void> => {
  const assessment = await AssessmentController.getOne({ assessmentName }, client)
  const cycle = Assessments.getCycle({ assessment, cycleName })

  await updateTable12a(client, cycle.uuid)
  await updateTable13a1(client, cycle.uuid)
  await updateTable13a2(client, cycle.uuid)
  await updateTable13b(client, cycle.uuid)
  await updateTable14a(client, cycle.uuid)
  await updateTable24(client, cycle.uuid)
  await updateTable25(client, cycle.uuid)
  await updateTable33(client, cycle.uuid)
  await updateTable34(client, cycle.uuid)
  await updateTable41(client, cycle.uuid)
  await updateTable43a(client, cycle.uuid)
  await updateTable44a(client, cycle.uuid)
  await updateTable45(client, cycle.uuid)
  await updateTable49(client, cycle.uuid)
  await updateTable51(client, cycle.uuid)

  await CacheController.generateMetadata({ assessment }, client)
}
