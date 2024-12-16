import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

type UpdateColumnNamesProps = {
  columnNames: Array<string>
  cycleUuid: string
  schemaAssessment: string
  tableName: string
}

const _fixColumnNames = async (props: UpdateColumnNamesProps, client: BaseProtocol) => {
  const { schemaAssessment, cycleUuid, tableName, columnNames } = props

  return client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
      props,
       '{columnNames,${cycleUuid}}',
      $1::jsonb
     )
     where props->>'name' = '${tableName}'
    `,
    [JSON.stringify(columnNames)]
  )
}

const _fixFRA2025GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )
  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)

  // Fix 1a Extent of forest and other wooded land -> forest area status
  await _fixColumnNames(
    {
      columnNames: ['tier'],
      cycleUuid: cycle.uuid,
      schemaAssessment,
      tableName: 'extentOfForest_forestAreaStatusAndTrend',
    },
    client
  )

  // Fix 2a Growing stock status description -> tier status
  await _fixColumnNames(
    {
      columnNames: ['status', 'tier'],
      cycleUuid,
      schemaAssessment,
      tableName: 'growingStock_growingStockStatus_Description',
    },
    client
  )

  // Fix 2c Biomass stock status description -> tier status
  await _fixColumnNames(
    {
      columnNames: ['status', 'tier'],
      cycleUuid,
      schemaAssessment,
      tableName: 'biomassStock_biomassStockStatus_Description',
    },
    client
  )

  // Fix 3b Forest area within protected areas
  await _fixColumnNames(
    {
      columnNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
      cycleUuid,
      schemaAssessment,
      tableName: 'forestAreaWithinProtectedAreas',
    },
    client
  )
  // Fix area header colSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},colSpan}', '6', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '1'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'forestAreaWithinProtectedAreas'
      )
  `
  )

  // Fix 5c Degraded forest -> degradedForest2025
  await _fixColumnNames(
    {
      columnNames: ['hasNationalDefinitionOfDegradedForest', 'national_definition'],
      cycleUuid,
      schemaAssessment,
      tableName: 'degradedForest2025',
    },
    client
  )
  // Fix 5c Degraded forest -> degradedForestMonitoring2025
  await _fixColumnNames(
    {
      columnNames: ['hasNationalDefinitionOfDegradedForest', 'national_definition'],
      cycleUuid,
      schemaAssessment,
      tableName: 'degradedForestMonitoring2025',
    },
    client
  )

  // Fix 6b Area of permanent forest estate
  await _fixColumnNames(
    {
      columnNames: ['applicable', '1990', '2000', '2010', '2015', '2020', '2025'],
      cycleUuid,
      schemaAssessment,
      tableName: 'areaOfPermanentForestEstate',
    },
    client
  )

  // Fix 8 Sustainable Development Goal -> sustainableDevelopment15_2_1_3
  await _fixColumnNames(
    {
      columnNames: ['2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
      cycleUuid,
      schemaAssessment,
      tableName: 'sustainableDevelopment15_2_1_3',
    },
    client
  )

  // Fix 8 Sustainable Development Goal -> sustainableDevelopment15_2_1_5
  await _fixColumnNames(
    {
      columnNames: [
        '2000',
        '2005',
        '2010',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
        '2021',
        '2022',
        '2023',
        '2024',
        '2025',
      ],
      cycleUuid,
      schemaAssessment,
      tableName: 'sustainableDevelopment15_2_1_5',
    },
    client
  )
  await AssessmentController.generateMetadataCache({ assessment }, client)
}

const _fixFRA2020GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2020' },
    client
  )
  const cycleUuid = cycle.uuid

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 5c Degraded forest definition
  await _fixColumnNames(
    {
      columnNames: ['definition', 'answer'],
      cycleUuid,
      schemaAssessment,
      tableName: 'degradedForest',
    },
    client
  )
}

const _fixPanEuropean2020GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2020' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 2.5 Area with forest land degradation -> table_2_5 Area header colSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},colSpan}', '10', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '0'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_2'
        and t.props ->> 'name' = 'table_2_5'
      )
    `
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}

const _fixPanEuropean2025GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2025' },
    client
  )

  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)

  // Fix 1.1 Forest area -> country_comments_1_1_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_1_1_1',
    },
    client
  )

  // Fix 1.2 Growing stock -> reasonability_check_1_2
  await _fixColumnNames(
    {
      columnNames: ['forest', 'FAWS', 'OWL', 'FOWL'],
      cycleUuid,
      schemaAssessment,
      tableName: 'reasonability_check_1_2',
    },
    client
  )

  // Fix 1.2.1 Growing stock -> country_comments_1_2_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_1_2_1',
    },
    client
  )

  // Fix 1.2.2 Growing stock -> country_comments_1_2_2
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_1_2_2',
    },
    client
  )

  // Fix 1.3a.2 Growing stock -> country_comments_1_3a_2
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_1_3a_2',
    },
    client
  )

  // Fix 1.4 Carbon stock -> table_1_4a header rowSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},rowSpan}', '2', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '0'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'table_1_4a'
      )
    `
  )

  // Fix 1.4 Carbon stock -> reasonability_check_1_4
  await _fixColumnNames(
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      cycleUuid,
      schemaAssessment,
      tableName: 'reasonability_check_1_4',
    },
    client
  )

  // Fix 1.4 Carbon stock -> country_comments_1_4_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_1_4_1',
    },
    client
  )

  // Fix 2.4 Forest area with damage -> table_2_4 header rowSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},rowSpan}', '3', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '0'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'table_2_4'
      )
      `
  )

  // Fix 2.4 Forest area with damage -> reasonability_check_2_4
  await _fixColumnNames(
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      cycleUuid,
      schemaAssessment,
      tableName: 'reasonability_check_2_4',
    },
    client
  )

  // Fix 2.5 Area with forest land degradation -> country_comments_2_5_2
  await _fixColumnNames(
    {
      columnNames: ['total_area_of_degraded_land', 'comment', 'comment_trends'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_2_5_2',
    },
    client
  )

  // Fix 3.1 Increment and fellings -> reasonability_check_3_1
  await _fixColumnNames(
    {
      columnNames: ['FAWS'],
      cycleUuid,
      schemaAssessment,
      tableName: 'reasonability_check_3_1',
    },
    client
  )

  // Fix 4.3 Naturalness -> country_comments_4_3_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_4_3_1',
    },
    client
  )

  // Fix 4.4 Area of stands -> country_comments_4_4_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_4_4_1',
    },
    client
  )

  // Fix 4.5 Increment and fellings -> reasonability_check_4_5
  await _fixColumnNames(
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      cycleUuid,
      schemaAssessment,
      tableName: 'reasonability_check_4_5',
    },
    client
  )

  // Fix 4.5 Increment and fellings -> country_comments_4_5_1 header colSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},colSpan}', '2', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '0'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'country_comments_4_5_1'
      )
      `
  )

  // Fix 4.8 Threatened forest species -> table_4_8 header rowSpan
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set( props, '{style,${cycle.uuid},rowSpan}', '2', true)
     where c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = '0'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
        and r.props ->> 'index' = 'header_0'
        and t.props ->> 'name' = 'table_4_8'
      )
      `
  )

  // Fix 4.9 Protected forests -> country_comments_4_9_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_4_9_1',
    },
    client
  )

  // Fix 5.1 Protective forests -> country_comments_5_1_1
  await _fixColumnNames(
    {
      columnNames: ['method', 'comment'],
      cycleUuid,
      schemaAssessment,
      tableName: 'country_comments_5_1_1',
    },
    client
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
}

const _fixTaxonCodes = async (client: BaseProtocol) => {
  const assessments = await AssessmentController.getAll({}, client)

  /* eslint-disable no-useless-escape */
  await Promise.all(
    assessments.map((assessment) =>
      Promise.all(
        assessment.cycles.map((cycle) => {
          const schemaCycle = Schemas.getNameCycle(assessment, cycle)
          return client.query(`
            with nodes_to_update as (
              select
                  n.id,
                  n.value,
                  t.code as matching_taxon_code,
                  t.scientific_name as original_scientific_name
              from ${schemaCycle}.node n
              join ext_data.taxon t
                  on lower(trim(both ' ' from regexp_replace(n.value->>'raw', '\s+', ' ', 'g'))) = lower(t.scientific_name)
              join assessment_fra.col c
                  on c.uuid = n.col_uuid and c.props->>'colType' = 'taxon'
              where n.value->>'taxonCode' is null
            ),
            updated_values as (
              select
                id,
                jsonb_set(
                  jsonb_set(value, '{taxonCode}', to_jsonb(matching_taxon_code::text), true),
                  '{raw}',
                  to_jsonb(original_scientific_name),
                  true
                ) as new_value
              from nodes_to_update
            )
            update ${schemaCycle}.node
            set value = updated_values.new_value
            from updated_values
            where ${schemaCycle}.node.id = updated_values.id;
          `)
        })
      )
    )
  )
}

export default async (client: BaseProtocol) => {
  await _fixTaxonCodes(client)
  await _fixFRA2025GridLayouts(client)
  await _fixFRA2020GridLayouts(client)
  await _fixPanEuropean2020GridLayouts(client)
  await _fixPanEuropean2025GridLayouts(client)
}
