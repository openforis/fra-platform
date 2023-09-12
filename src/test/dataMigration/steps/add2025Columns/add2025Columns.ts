import * as pgPromise from 'pg-promise'
import { Objects } from 'utils/objects'

import { Assessment, ColProps, ColType, Row, RowType } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

const tablesNewColumns: Record<string, Array<string>> = {
  // extentOfForest: ['2025'],
  // 'climaticDomain',
  // forestCharacteristics: ['2025'],
  specificForestCategories: ['2025'],
  // forestAreaChange: ['2020-2025'],
  annualReforestation: ['2020-2025'],
  otherLandWithTreeCover: ['2025'],
  // growingStockAvg: ['2025'],
  // growingStockTotal: ['2025'],
  // 'growingStockComposition',
  // biomassStock: ['2025'],
  // carbonStock: ['2025'],
  // carbonStockSoilDepth: ['2025'],
  // primaryDesignatedManagementObjective: ['2025'],
  // totalAreaWithDesignatedManagementObjective: ['2025'],
  forestAreaWithinProtectedAreas: ['2025'],
  forestOwnership: ['2020'],
  holderOfManagementRights: ['2020'],
  disturbances: ['2018', '2019', '2020', '2021', '2022'],
  areaAffectedByFire: ['2018', '2019', '2020', '2021', '2022'],
  // 'degradedForest',
  // 'forestPolicy',
  // 'areaOfPermanentForestEstate',
  // 'employment',
  // 'graduationOfStudents',
  // 'nonWoodForestProductsRemovals',
  // 'nonWoodForestProductsRemovalsCurrency',
  // sustainableDevelopment15_1_1: ['2005', '2021', '2022', '2023', '2024'],
  // 'sustainableDevelopmentAgencyIndicator':['2020-2025','2005-2015','2015-2025'],
  // sustainableDevelopment15_2_1_1: ['2020-2025', '2005-2015', '2015-2025'],
  // 'sustainableDevelopmentAgencySubIndicator1',
  // sustainableDevelopment15_2_1_2: ['2021', '2022', '2023', '2024'],
  // 'sustainableDevelopmentAgencySubIndicator2',
  // sustainableDevelopment15_2_1_3: ['2021', '2022', '2023', '2024'],
  // 'sustainableDevelopmentAgencySubIndicator3',
  // sustainableDevelopment15_2_1_4: ['2021', '2022', '2023', '2024'],
  // 'sustainableDevelopmentAgencySubIndicator4',
  // sustainableDevelopment15_2_1_5: ['2023', '2024', '2025'],
}

export const add2025Columns = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle = assessment.cycles.find(({ name }) => name === '2025')

  // 1. insert new columns
  const schema = Schemas.getName(assessment)
  const pgp = pgPromise()
  const cs = new pgp.helpers.ColumnSet(['row_id', { name: 'props', cast: 'jsonb' }], {
    table: { table: 'col', schema },
  })
  const tableNames = Object.keys(tablesNewColumns)
  const rows = await client.map<Row & { tableName: string }>(
    `
        select r.*,
               t.props ->> 'name' as table_name,
               jsonb_agg(c.*)     as cols
        from ${schema}.row r
                 left join ${schema}."table" t on r.table_id = t.id
                 left join ${schema}.col c on r.id = c.row_id
        where t.props ->> 'name' in (${tableNames.map((t) => `'${t}'`).join(',')})
          and (r.props ->> 'type' in ('data', 'calculated') or
               r.props ->> 'type' in ('header') and r.props ->> 'index' = 'header_1'
            )
        group by r.id, r.uuid, r.props, t.props ->> 'name'
    `,
    [],
    // @ts-ignore
    Objects.camelize
  )

  const colValues: Array<{ props: ColProps; row_id: number }> = []
  rows.forEach((row) => {
    // const row = rows[i]
    // const headerRow = row.props.type === RowType.header
    const dataRow = [RowType.calculated, RowType.data].includes(row.props.type)
    tablesNewColumns[row.tableName].forEach((colName, colIndex) => {
      const index = row.cols.length + colIndex - (dataRow ? 1 : 0)
      const col = {
        props: {
          index,
          cycles: [cycle.uuid],
          colName,
          colType: dataRow ? ColType.decimal : ColType.header,
          style: {
            [cycle.uuid]: {
              colSpan: 1,
              rowSpan: 1,
            },
          },
        },
        row_id: row.id,
      }
      colValues.push(col)
    })
  })

  await client.query(pgp.helpers.insert(colValues, cs))

  // 2. update table columnNames and columnsExport props
  await Promise.all(
    tableNames.map(async (tableName) => {
      const columns = tablesNewColumns[tableName].map((c) => `"${c}"`).join(',')
      await client.query(
        `update ${schema}.table
         set props = jsonb_set(
                 props,
                 '{columnNames,${cycle.uuid}}',
                 (props -> 'columnNames' -> '${cycle.uuid}')::jsonb || '[${columns}]'::jsonb
             )
         where props ->> 'name' = '${tableName}'
        `,
        []
      )
      await client.query(
        `update ${schema}.table
           set props = jsonb_set(
                   props,
                   '{columnsExport,${cycle.uuid}}',
                   (props -> 'columnsExport' -> '${cycle.uuid}')::jsonb || '[${columns}]'::jsonb
               )
           where props ->> 'name' = '${tableName}'
          `,
        []
      )
    })
  )

  // 3. update column headers colSpan style prop
  await client.query(`
      update ${schema}.col
      set props = jsonb_set(
              props,
              '{style,${cycle.uuid},colSpan}',
              to_jsonb(d.col_span)
          )
      from (select c.id                                                            as column_id,
                   jsonb_array_length(t.props -> 'columnNames' -> '${cycle.uuid}') as col_span
            from ${schema}.col c
                     left join ${schema}.row r on r.id = c.row_id
                     left join ${schema}."table" t on t.id = r.table_id
            where t.props ->> 'name' in (${tableNames.map((t) => `'${t}'`).join(',')})
              and c.props ->> 'colType' = 'header'
              and (c.props -> 'style' -> '${cycle.uuid}' ->> 'colSpan')::numeric > 1) as d
      where id = d.column_id
  `)
}
