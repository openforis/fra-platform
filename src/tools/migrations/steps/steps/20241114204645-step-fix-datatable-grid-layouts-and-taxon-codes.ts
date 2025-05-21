import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { CountryIso } from 'meta/area'
import { AssessmentNames } from 'meta/assessment/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { DataRedisRepository } from 'server/repository/redis/data'
import { Logger } from 'server/utils/logger'

type TableInfo = {
  cycleUuid: string
  schemaAssessment: string
  tableName: string
}

type AddGridTemplateColumnsProps = TableInfo & {
  gridTemplateColumns: string
}

type UpdateColumnNamesProps = TableInfo & {
  columnNames: Array<string>
}

type RemoveCycleColWidthPropertiesProps = {
  cycleUuid: string
  schemaAssessment: string
}

const _removeCycleColWidthProperties = async (props: RemoveCycleColWidthPropertiesProps, client: BaseProtocol) => {
  const { cycleUuid, schemaAssessment } = props

  return client.query(
    `update ${schemaAssessment}.col
     set props = jsonb_set(
         props,
         '{style,${cycleUuid}}',
         (props -> 'style' -> '${cycleUuid}') - 'width' - 'maxWidth' - 'minWidth'
     )
     where props -> 'style' -> '${cycleUuid}' ?| ARRAY['width', 'maxWidth', 'minWidth']`,
    []
  )
}

const _addGridTemplateColumns = async (props: AddGridTemplateColumnsProps, client: BaseProtocol) => {
  const { cycleUuid, gridTemplateColumns, schemaAssessment, tableName } = props

  return client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
      jsonb_set(
        props,
        '{style}',
        coalesce(props->'style', '{}'::jsonb),
        true
      ),
      '{style,${cycleUuid}}',
      $1::jsonb,
      true
     )
     where props->>'name' = '${tableName}'
    `,
    [JSON.stringify({ gridTemplateColumns })]
  )
}

const _fixColumnNames = async (props: UpdateColumnNamesProps, client: BaseProtocol) => {
  const { columnNames, cycleUuid, schemaAssessment, tableName } = props

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

  await _removeCycleColWidthProperties({ cycleUuid, schemaAssessment }, client)

  const columnsToFix: Array<{ tableName: string; columnNames: Array<string> }> = [
    {
      columnNames: ['tier'],
      tableName: 'extentOfForest_forestAreaStatusAndTrend',
    },
    {
      columnNames: ['status', 'tier'],
      tableName: 'growingStock_growingStockStatus_Description',
    },
    {
      columnNames: ['status', 'tier'],
      tableName: 'biomassStock_biomassStockStatus_Description',
    },
    {
      columnNames: ['1990', '2000', '2010', '2015', '2020', '2025'],
      tableName: 'forestAreaWithinProtectedAreas',
    },
    {
      columnNames: ['hasNationalDefinitionOfDegradedForest', 'national_definition'],
      tableName: 'degradedForest2025',
    },
    {
      columnNames: ['hasNationalDefinitionOfDegradedForest', 'national_definition'],
      tableName: 'degradedForestMonitoring2025',
    },
    {
      columnNames: ['applicable', '1990', '2000', '2010', '2015', '2020', '2025'],
      tableName: 'areaOfPermanentForestEstate',
    },
    {
      columnNames: ['2000', '2010', '2015', '2020', '2021', '2022', '2023', '2024', '2025'],
      tableName: 'sustainableDevelopment15_2_1_3',
    },
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
      tableName: 'sustainableDevelopment15_2_1_5',
    },
  ]

  await Promise.all(
    columnsToFix.map(({ columnNames, tableName }) =>
      _fixColumnNames({ columnNames, cycleUuid, schemaAssessment, tableName }, client)
    )
  )

  const gridTemplateColumnsToAdd: Array<{ tableName: string; gridTemplateColumns: string }> = [
    {
      gridTemplateColumns: 'auto minmax(min-content, 1fr) minmax(min-content, auto)',
      tableName: 'extentOfForest_forestAreaStatusAndTrend_Description',
    },
    {
      gridTemplateColumns: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
      tableName: 'extentOfForest_forestAreaStatusAndTrend',
    },
    {
      gridTemplateColumns: 'auto minmax(min-content, 1fr) minmax(min-content, auto)',
      tableName: 'growingStock_growingStockStatus_Description',
    },
    {
      gridTemplateColumns: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
      tableName: 'growingStock_growingStockStatus',
    },
    {
      gridTemplateColumns: 'auto minmax(min-content, 1fr) minmax(min-content, auto)',
      tableName: 'biomassStock_biomassStockStatus_Description',
    },
    {
      gridTemplateColumns: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
      tableName: 'biomassStock_biomassStockStatus',
    },
    {
      gridTemplateColumns: 'auto minmax(min-content, 1fr) minmax(min-content, 2fr)',
      tableName: 'forestRestoration',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(24, minmax(min-content, 1fr))',
      tableName: 'disturbances',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(24, minmax(min-content, 1fr))',
      tableName: 'areaAffectedByFire',
    },
    {
      gridTemplateColumns: 'minmax(120px, auto) repeat(14, minmax(min-content, 1fr))',
      tableName: 'sustainableDevelopment15_2_1_5',
    },
  ]

  await Promise.all(
    gridTemplateColumnsToAdd.map(({ gridTemplateColumns, tableName }) =>
      _addGridTemplateColumns({ cycleUuid, gridTemplateColumns, schemaAssessment, tableName }, client)
    )
  )

  // Fix 3b Forest area within protected areas - header colSpan
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
}

const _fixFRA2020GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2020' },
    client
  )
  const cycleUuid = cycle.uuid

  const schemaAssessment = Schemas.getName(assessment)

  await _removeCycleColWidthProperties({ cycleUuid, schemaAssessment }, client)

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

  const gridTemplateColumnsToAdd: Array<{ tableName: string; gridTemplateColumns: string }> = [
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(18, minmax(min-content, 1fr))',
      tableName: 'disturbances',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(18, minmax(min-content, 1fr))',
      tableName: 'areaAffectedByFire',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(12, minmax(min-content, 1fr))',
      tableName: 'employment',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(12, minmax(min-content, 1fr))',
      tableName: 'graduationOfStudents',
    },
    {
      gridTemplateColumns: 'minmax(min-content, auto) repeat(6, minmax(min-content, 1fr))',
      tableName: 'nonWoodForestProductsRemovals',
    },
  ]

  await Promise.all(
    gridTemplateColumnsToAdd.map(({ gridTemplateColumns, tableName }) =>
      _addGridTemplateColumns({ cycleUuid, gridTemplateColumns, schemaAssessment, tableName }, client)
    )
  )
}

const _fixPanEuropean2020GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2020' },
    client
  )

  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)

  await _removeCycleColWidthProperties({ cycleUuid, schemaAssessment }, client)

  const gridTemplateColumnsToAdd: Array<{ tableName: string; gridTemplateColumns: string }> = [
    {
      gridTemplateColumns: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
      tableName: 'table_1_1a',
    },
    {
      gridTemplateColumns:
        'minmax(150px, auto) repeat(4, minmax(min-content, 1fr)) minmax(110px, 1fr) repeat(5, minmax(min-content, 1fr))', // Fixes "Desertification" label overflow
      tableName: 'table_2_5',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(8, minmax(min-content, 1fr))',
      tableName: 'table_6_1',
    },
    {
      gridTemplateColumns: 'minmax(200px, auto) repeat(26, minmax(min-content, 1fr))',
      tableName: 'table_6_7',
    },
    {
      gridTemplateColumns: 'minmax(200px, auto) repeat(26, minmax(min-content, 1fr))',
      tableName: 'table_6_8',
    },
  ]

  await Promise.all(
    gridTemplateColumnsToAdd.map(({ gridTemplateColumns, tableName }) =>
      _addGridTemplateColumns({ cycleUuid, gridTemplateColumns, schemaAssessment, tableName }, client)
    )
  )

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

  // Fix table_1_4b_2020 label keys missing a "."
  await client.query(
    `update ${schemaAssessment}.col c
     set props = jsonb_set(
       props,
       '{labels,${cycleUuid},key}',
       '"panEuropean.carbonStockInHarvestedWoodProductsHWP.harvested_wood_products"',
       false
     )
     where c.props -> 'labels' -> '${cycleUuid}' ->> 'key' = 'panEuropean.carbonStockInHarvestedWoodProductsHWPharvested_wood_products'
        and c.props ->> 'colType' = 'header'
        and c.props ->> 'index' = 'header_0'
        and c.row_id in (
            select r.id
            from ${schemaAssessment}.row r
            join ${schemaAssessment}."table" t on r.table_id = t.id
            where t.props ->> 'name' = 'table_1_4b_2020'
        )
    `
  )
}

const _fixPanEuropean2025GridLayouts = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2025' },
    client
  )

  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)

  await _removeCycleColWidthProperties({ cycleUuid, schemaAssessment }, client)

  const columnsToFix: Array<{ tableName: string; columnNames: Array<string> }> = [
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_1_1_1',
    },
    {
      columnNames: ['forest', 'FAWS', 'OWL', 'FOWL'],
      tableName: 'reasonability_check_1_2',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_1_2_1',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_1_2_2',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_1_3a_2',
    },
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      tableName: 'reasonability_check_1_4',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_1_4_1',
    },
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      tableName: 'reasonability_check_2_4',
    },
    {
      columnNames: ['total_area_of_degraded_land', 'comment', 'comment_trends'],
      tableName: 'country_comments_2_5_2',
    },
    {
      columnNames: ['FAWS'],
      tableName: 'reasonability_check_3_1',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_4_3_1',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_4_4_1',
    },
    {
      columnNames: ['forest', 'OWL', 'FOWL'],
      tableName: 'reasonability_check_4_5',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_4_9_1',
    },
    {
      columnNames: ['method', 'comment'],
      tableName: 'country_comments_5_1_1',
    },
  ]

  await Promise.all(
    columnsToFix.map(({ columnNames, tableName }) =>
      _fixColumnNames({ columnNames, cycleUuid, schemaAssessment, tableName }, client)
    )
  )

  const gridTemplateColumnsToAdd: Array<{ tableName: string; gridTemplateColumns: string }> = [
    {
      gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      tableName: 'table_1_1a',
    },
    {
      gridTemplateColumns: 'minmax(min-content, 2fr) minmax(min-content, 1fr)',
      tableName: 'reasonability_check_3_1',
    },
    {
      gridTemplateColumns: 'repeat(3, minmax(min-content, 1fr))',
      tableName: 'country_comments_4_9_2',
    },
    {
      gridTemplateColumns: 'repeat(3, minmax(min-content, 1fr))',
      tableName: 'country_comments_5_1_2',
    },
    {
      gridTemplateColumns: 'minmax(150px, auto) repeat(8, minmax(min-content, 1fr))',
      tableName: 'table_6_1',
    },
    {
      gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      tableName: 'country_comments_6_1_1',
    },
    {
      gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      tableName: 'country_comments_6_6_1',
    },
    {
      gridTemplateColumns: 'repeat(3, minmax(min-content, 1fr))',
      tableName: 'country_comments_6_6_2',
    },
    {
      gridTemplateColumns: 'repeat(2, minmax(min-content, 1fr))',
      tableName: 'country_comments_6_10_1',
    },
  ]

  await Promise.all(
    gridTemplateColumnsToAdd.map(({ gridTemplateColumns, tableName }) =>
      _addGridTemplateColumns({ cycleUuid, gridTemplateColumns, schemaAssessment, tableName }, client)
    )
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
}

const _fixFraTaxonCodes = async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: AssessmentNames.fra }, client)
  const { cycles } = assessment

  const schemaAssessment = Schemas.getName(assessment)

  await Promise.all(
    cycles.map(async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const updatedTables = await client.map<{ countryIso: CountryIso; tableName: string }>(
        `
            with nodes_to_update as (
              select
                  n.id,
                  n.value,
                  n.country_iso,
                  tb.props->>'name' as table_name,
                  t.code as matching_taxon_code,
                  t.scientific_name as original_scientific_name
              from ${schemaCycle}.node n
              join ext_data.taxon t
                  on lower(trim(both ' ' from regexp_replace(n.value->>'raw', '\\s+', ' ', 'g'))) = lower(t.scientific_name)
              join ${schemaAssessment}.col c
                  on c.uuid = n.col_uuid and c.props->>'colType' = 'taxon'
              join ${schemaAssessment}.row r
                  on c.row_id = r.id
              join ${schemaAssessment}."table" tb
                  on tb.id = r.table_id
              where n.value->>'taxonCode' is null
            ),
            updated_values as (
              select
                id,
                country_iso,
                table_name,
                jsonb_set(
                  jsonb_set(value, '{taxonCode}', to_jsonb(matching_taxon_code::text), true),
                  '{raw}',
                  to_jsonb(original_scientific_name),
                  true
                ) as new_value
              from nodes_to_update
            ),
            updated_tables as (
              update ${schemaCycle}.node
              set value = updated_values.new_value
              from updated_values
              where ${schemaCycle}.node.id = updated_values.id
              returning updated_values.country_iso, updated_values.table_name
            )
            select distinct country_iso, table_name from updated_tables;
          `,
        [],
        (res) => Objects.camelize(res)
      )

      await Promises.each(updatedTables, ({ countryIso, tableName }) =>
        DataRedisRepository.cacheCountryTable({ assessment, countryIso, cycle, force: true, tableName }, client)
      )

      Logger.info(`Generated cache for ${updatedTables.length} tables in ${schemaCycle}.`)
    })
  )
}

const _fixGrowingStockComposition2025HeaderRows = async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.fra, cycleName: '2025' },
    client
  )

  const schemaAssessment = Schemas.getName(assessment)

  // Move 'header_1' row cols to 'header_0' row
  await client.query(
    `with target_row as (
      select 
          r.id as target_row_id
      from ${schemaAssessment}.row r
      join ${schemaAssessment}.table t on r.table_id = t.id
      where r.props ->> 'index' = 'header_0'
          and t.props ->> 'name' = 'growingStockComposition2025'
    ),
    cols_to_update as (
      select 
          c.id as col_id, 
          target_row.target_row_id,
          (c.props ->> 'index')::int + 3 as new_index -- number of cols in header_0 + index
      from ${schemaAssessment}.col c
      join ${schemaAssessment}.row r on c.row_id = r.id
      join ${schemaAssessment}.table t on r.table_id = t.id
      join target_row on true
      where r.props ->> 'index' = 'header_1'
          and t.props ->> 'name' = 'growingStockComposition2025'
      )
      update ${schemaAssessment}.col
      set row_id = cols_to_update.target_row_id,
        props = jsonb_set(
            props,
            '{index}',
            to_jsonb(cols_to_update.new_index)
        )
      from cols_to_update
      where ${schemaAssessment}.col.id = cols_to_update.col_id;

      delete from ${schemaAssessment}.row
      where id in (
        select 
            r.id
        from ${schemaAssessment}.row r
        join ${schemaAssessment}.table t on r.table_id = t.id
        where r.props ->> 'index' = 'header_1'
            and t.props ->> 'name' = 'growingStockComposition2025'
      );
      
     update ${schemaAssessment}.col c
     set props = jsonb_set(props, '{style,${cycle.uuid},rowSpan}', '1', false)
     where c.props ->> 'colType' = 'header'
        and c.row_id in (
          select r.id from ${schemaAssessment}.row r
          left join ${schemaAssessment}."table" t on t.id = r.table_id
          where r.props ->> 'type' = 'header'
             and r.props ->> 'index' = 'header_0'
             and t.props ->> 'name' = 'growingStockComposition2025'
        );
      `
  )
}

export default async (client: BaseProtocol) => {
  await _fixFraTaxonCodes(client)
  await _fixFRA2025GridLayouts(client)
  await _fixGrowingStockComposition2025HeaderRows(client)
  await _fixFRA2020GridLayouts(client)
  await _fixPanEuropean2020GridLayouts(client)
  await _fixPanEuropean2025GridLayouts(client)

  await AssessmentController.generateMetaCache(client)

  const assessments = await AssessmentController.getAll({}, client)

  await Promise.all(
    assessments.map(async (assessment) => {
      await AssessmentController.generateMetadataCache({ assessment }, client)
    })
  )
}
