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
     set props = jsonb_set( props, '{style,${cycle.uuid}}', '{"colSpan": 6}', true)
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

export default async (client: BaseProtocol) => {
  await _fixFRA2025GridLayouts(client)
  await _fixFRA2020GridLayouts(client)
}
