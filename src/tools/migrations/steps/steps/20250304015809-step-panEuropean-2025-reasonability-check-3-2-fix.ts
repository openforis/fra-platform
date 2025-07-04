import { Promises } from 'utils/promises'

import { AssessmentNames } from 'meta/assessment/assessment'
import { ColProps, ColType } from 'meta/assessment/col'
import { RowProps, RowType } from 'meta/assessment/row'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { TableRepository } from 'server/repository/assessment/table'

const assessmentName = AssessmentNames.panEuropean
const cycleName = '2025'
const tableName = 'reasonability_check_3_2'
const variables = ['roundwoodRemovalAsPctOfGrowingStockSupply', 'roundwoodRemovalAsPctOfGrowingStockTotal']
const years = [2020, 2015, 2010, 2005, 2000, 1990]
const colsData = ['forest', 'FAWS', 'OWL', 'FOWL']
const colsHeader = ['variable', 'unit', 'year', ...colsData]

const getCalcFn = (props: { variable: string; colName: string; year: number }): string | undefined => {
  const { colName, variable, year } = props
  // Table 3.2 Total of wood removals / (Table 1.2a Total growing stock of forest available for wood supply*1000)
  if (colName === 'FAWS' && variable === variables[0]) {
    return `table_3_2.roundwood_${year}.total_volume / (table_1_2a._of_which_available_for_wood_supply_${year}.total * 1000)`
  }
  // Table 3.2 Total of wood removals / (Table 1.2a Total growing stock of Forest and Other Land*1000)
  if (colName === 'FOWL' && variable === variables[1]) {
    return `table_3_2.roundwood_${year}.total_volume / (table_1_2a.total_forest_and_other_wooded_land_${year}.total * 1000)`
  }
  return undefined
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle({ assessmentName, cycleName }, client)

  const { uuid: cycleUuid } = cycle
  const schemaAssessment = Schemas.getName(assessment)
  const table = await TableRepository.getOne({ assessment, cycle, tableName }, client)
  const cycles = [cycle]

  // 1. Add new grid template columns & update column names
  const gridTemplateColumns = '250px repeat(2, min-content) repeat(4, minmax(min-content, 1fr))'

  await client.query(
    `update ${schemaAssessment}.table
     set props = jsonb_set(
       jsonb_set(
         jsonb_set(
           props,
           '{style}',
           coalesce(props->'style', '{}'::jsonb),
           true
         ),
         '{style,${cycleUuid}}',
         $1::jsonb,
         true
       ),
       '{columnNames,${cycleUuid}}',
       $2::jsonb
     )
     where props->>'name' = '${tableName}'
    `,
    [JSON.stringify({ gridTemplateColumns }), JSON.stringify(['unit', 'year', 'forest', 'FAWS', 'OWL', 'FOWL'])]
  )

  // 2. Delete current cols
  await client.query(
    `delete from ${schemaAssessment}.col
     where id in (
        select c.id
        from ${schemaAssessment}.col c
        join ${schemaAssessment}.row r on c.row_id = r.id
        join ${schemaAssessment}.table t on r.table_id = t.id
        where t.props->>'name' = '${tableName}'
     );`,
    []
  )
  // 3. Delete current rows
  await client.query(
    `delete from ${schemaAssessment}.row
     where id in (
        select r.id
        from ${schemaAssessment}.row r
        join ${schemaAssessment}.table t on r.table_id = t.id
        where t.props->>'name' = '${tableName}'
     );`,
    []
  )

  // 4. Insert header row
  const headerRowProps: RowProps = { index: 'header_0', type: RowType.header }
  const headerRow = await RowRepository.create({ assessment, cycles, rowProps: headerRowProps, table }, client)
  // 5. Insert header cols
  await Promises.each(colsHeader, async (colName, index) => {
    const labels = { [cycleUuid]: { key: `panEuropean.reasonabilityChecks.${colName}` } }
    const colProps: ColProps = { colType: ColType.header, index, labels }
    await ColRepository.create({ assessment, cycles, row: headerRow, colProps }, client)
  })

  // 6. insert rows data
  await Promises.each(variables, async (variable, variableIndex) => {
    await Promises.each(years, async (year, yearIndex) => {
      const variableName = `${variable}_${year}`
      const rowProps: RowProps = { index: variableIndex + yearIndex, type: RowType.data, variableName }
      const row = await RowRepository.create({ assessment, cycles, rowProps, table }, client)

      // col header
      if (yearIndex === 0) {
        const labels = { [cycleUuid]: { key: `panEuropean.reasonabilityChecks.${variable}` } }
        const style = { [cycleUuid]: { colSpan: 1, rowSpan: years.length } }
        const colProps: ColProps = { colType: ColType.header, index: 0, labels, style }
        await ColRepository.create({ assessment, cycles, row, colProps }, client)
      }

      // col unit
      // duplicated if to avoid ugly prop names
      if (yearIndex === 0) {
        const labels = { [cycleUuid]: { label: '%' } }
        const style = { [cycleUuid]: { colSpan: 1, rowSpan: years.length, justifyContent: 'center' } }
        const colProps: ColProps = { colType: ColType.placeholder, index: 1, labels, style }
        await ColRepository.create({ assessment, cycles, row, colProps }, client)
      }

      // col year
      const labels = { [cycleUuid]: { label: String(year) } }
      const style = { [cycleUuid]: { justifyContent: 'center' } }
      const colProps: ColProps = { colType: ColType.placeholder, index: 2, labels, style }
      await ColRepository.create({ assessment, cycles, row, colProps }, client)

      await Promises.each(colsData, async (colName, colIndex) => {
        const calcFn = getCalcFn({ variable, colName, year })
        const colType = calcFn ? ColType.calculated : ColType.placeholder
        const calculateFn = calcFn ? { [cycleUuid]: calcFn } : undefined
        const colProps: ColProps = { colName: calcFn ? colName : undefined, colType, index: colIndex + 3, calculateFn }
        await ColRepository.create({ assessment, cycles, row, colProps }, client)
      })
    })
  })

  // 7. Generate meta cache
  await AssessmentController.generateMetaCache(client)
}
