import { AssessmentNames } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

const _fixFRA2025GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 1a Extent of forest and other wooded land -> forest area status
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
      where props->>'name' = 'extentOfForest_forestAreaStatusAndTrend'
      `,
    [JSON.stringify(['tier'])]
  )

  // Fix 2a Growing stock status description -> tier status
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
      where props->>'name' = 'growingStock_growingStockStatus_Description'
    `,
    [JSON.stringify(['status', 'tier'])]
  )

  // Fix 2c Biomass stock status description -> tier status
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
      where props->>'name' = 'biomassStock_biomassStockStatus_Description'
    `,
    [JSON.stringify(['status', 'tier'])]
  )

  // Fix 3b Forest area within protected areas
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'forestAreaWithinProtectedAreas'
    `,
    [JSON.stringify(['1990', '2000', '2010', '2015', '2020', '2025'])]
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
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'degradedForest2025'
      `,
    [JSON.stringify(['hasNationalDefinitionOfDegradedForest', 'national_definition'])]
  )
  // Fix 5c Degraded forest -> degradedForestMonitoring2025
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'degradedForestMonitoring2025'
    `,
    [JSON.stringify(['hasNationalDefinitionOfDegradedForest', 'national_definition'])]
  )

  // Fix 6b Area of permanent forest estate
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'areaOfPermanentForestEstate'
      `,
    [JSON.stringify(['applicable', '1990', '2000', '2010', '2015', '2020', '2025'])]
  )

  // Fix 8 Sustainable Development Goal -> sustainableDevelopment15_2_1_3
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'sustainableDevelopment15_2_1_3'
    `,
    [JSON.stringify(['2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'])]
  )

  // Fix 8 Sustainable Development Goal -> sustainableDevelopment15_2_1_5
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
     )
     where props->>'name' = 'sustainableDevelopment15_2_1_5'
    `,
    [
      JSON.stringify([
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
      ]),
    ]
  )
  await AssessmentController.generateMetadataCache({ assessment }, client)
}

const _fixFRA2020GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2020' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 5c Degraded forest definition
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'degradedForest'
      `,
    [JSON.stringify(['definition', 'answer'])]
  )

  await AssessmentController.generateMetadataCache({ assessment }, client)
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

  const schemaAssessment = Schemas.getName(assessment)

  // Fix 1.1 Forest area -> country_comments_1_1_1
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'country_comments_1_1_1'
      `,
    [JSON.stringify(['method', 'comment'])]
  )

  // Fix 1.2 Growing stock -> reasonability_check_1_2
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'reasonability_check_1_2'
      `,
    [JSON.stringify(['forest', 'FAWS', 'OWL', 'FOWL'])]
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
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'reasonability_check_1_4'
      `,
    [JSON.stringify(['forest', 'OWL', 'FOWL'])]
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
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'reasonability_check_2_4'
      `,
    [JSON.stringify(['forest', 'OWL', 'FOWL'])]
  )

  // Fix 2.5 Area with forest land degradation -> country_comments_2_5_2
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'country_comments_2_5_2'
    `,
    [JSON.stringify(['total_area_of_degraded_land', 'comment', 'comment_trends'])]
  )

  // Fix 3.1 Increment and fellings -> reasonability_check_3_1
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'reasonability_check_3_1'
      `,
    [JSON.stringify(['FAWS'])]
  )

  // Fix 4.5 Increment and fellings -> reasonability_check_4_5
  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
        props,
        '{columnNames,${cycle.uuid}}',
        $1::jsonb
       )
     where props->>'name' = 'reasonability_check_4_5'
      `,
    [JSON.stringify(['forest', 'OWL', 'FOWL'])]
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

  await AssessmentController.generateMetadataCache({ assessment }, client)
}

export default async (client: BaseProtocol) => {
  await _fixFRA2025GridLayouts(client)
  await _fixFRA2020GridLayouts(client)
  await _fixPanEuropean2020GridLayouts(client)
  await _fixPanEuropean2025GridLayouts(client)
}
