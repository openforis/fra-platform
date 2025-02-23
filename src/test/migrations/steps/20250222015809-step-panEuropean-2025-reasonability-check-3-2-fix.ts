import { AssessmentNames, ColProps, ColType, RowProps, RowType } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { TableRepository } from 'server/repository/assessment/table'

const years = [2020, 2015, 2010, 2005, 2000, 1990]

const getRoundwoodSupplyYearsCols = (year: number, cycleUuid: string): Array<ColProps> => {
  let index = years.indexOf(year)
  if (year === 2020) index += 2 // Offset var name and unit '%'
  return [
    {
      // year col
      colType: ColType.placeholder,
      index,
      labels: {
        [cycleUuid]: {
          label: year.toString(),
        },
      },
    },
    {
      // Forest col
      colType: ColType.placeholder,
      index: index + 1,
    },
    {
      // FAWS col
      colName: 'FAWS',
      colType: ColType.calculated,
      calculateFn: {
        [cycleUuid]: `table_3_2._of_which_forest_available_for_wood_supply_${year}.net_annual_increment / (table_1_2a._of_which_available_for_wood_supply_${year}.total * 1000)`,
      },
      index: index + 2,
    },

    {
      // OWL col
      colType: ColType.placeholder,
      index: index + 3,
    },
    {
      // FOWL col
      colType: ColType.placeholder,
      index: index + 4,
    },
  ]
}

const getRoundwoodTotalYearsCols = (year: number, cycleUuid: string): Array<ColProps> => {
  let index = years.indexOf(year)
  if (year === 2020) index += 2 // Offset var name and unit '%'
  return [
    {
      // year col
      colType: ColType.placeholder,
      index,
      labels: {
        [cycleUuid]: {
          label: year.toString(),
        },
      },
    },
    {
      // Forest col
      colType: ColType.placeholder,
      index: index + 1,
    },
    {
      // FAWS col
      colType: ColType.placeholder,
      index: index + 2,
    },
    {
      // OWL col
      colType: ColType.placeholder,
      index: index + 3,
    },
    {
      // FOWL col
      colType: ColType.calculated,
      // TODO: add calculateFn
      // colName: '',
      // calculateFn: {
      //   [cycleUuid]: '',
      // },
      index: index + 4,
    },
  ]
}

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: AssessmentNames.panEuropean, cycleName: '2025' },
    client
  )

  const cycleUuid = cycle.uuid
  const schemaAssessment = Schemas.getName(assessment)
  const tableName = 'reasonability_check_3_2'
  const table = await TableRepository.getOne({ assessment, cycle, tableName })

  // 1. Add new grid template columns
  const gridTemplateColumns = 'minmax(150px, auto) repeat(6, minmax(min-content, 1fr))'

  await client.query(
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

  // 4. Insert new rows and cols for Roundwood Supply and Roundwood Total
  const headerRowProps: RowProps = {
    index: 'header_0',
    type: RowType.header,
  }

  const headerCols: Array<ColProps> = [
    {
      colType: ColType.header,
      index: 0,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.variable',
        },
      },
    },
    {
      colType: ColType.header,
      index: 1,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.unit',
        },
      },
    },
    {
      colType: ColType.header,
      index: 2,
      labels: {
        [cycle.uuid]: {
          key: 'common.year',
        },
      },
    },
    {
      colType: ColType.header,
      index: 3,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.forest',
        },
      },
    },

    {
      colType: ColType.header,
      index: 4,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.FAWS',
        },
      },
    },

    {
      colType: ColType.header,
      index: 5,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.OWL',
        },
      },
    },
    {
      colType: ColType.header,
      index: 6,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.FOWL',
        },
      },
    },
  ]

  const headerRow = await RowRepository.create({ assessment, cycles: [cycle], rowProps: headerRowProps, table }, client)
  headerCols.forEach(async (colProps) => {
    await ColRepository.create({ assessment, cycles: [cycle], row: headerRow, colProps }, client)
  })

  const roundwoodSupplyRows: Array<RowProps> = years.map((year, index) => {
    return {
      index,
      label: {
        key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockSupply',
      },
      type: RowType.data,
      variableName: `roundwoodRemovalAsPctOfGrowingStockSupply_${year}`,
    }
  })

  const roundwoodSupplyVarAndUnitCols: Array<ColProps> = [
    {
      colType: ColType.header,
      index: 0,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockSupply',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 6,
        },
      },
    },
    {
      colType: ColType.placeholder,
      index: 1,
      labels: {
        [cycle.uuid]: {
          label: '%',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 6,
        },
      },
    },
  ]

  const roundwoodTotalRows: Array<RowProps> = years.map((year, index) => {
    return {
      index,
      label: {
        key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockTotal',
      },
      type: RowType.data,
      variableName: `roundwoodRemovalAsPctOfGrowingStockTotal_${year}`,
    }
  })

  const roundwoodTotalVarAndUnitCols: Array<ColProps> = [
    {
      colType: ColType.header,
      index: 0,
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockTotal',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 6,
        },
      },
    },
    {
      colType: ColType.placeholder,
      index: 1,
      labels: {
        [cycle.uuid]: {
          label: '%',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 6,
        },
      },
    },
  ]

  roundwoodSupplyRows.forEach(async (rowProps) => {
    const row = await RowRepository.create({ assessment, cycles: [cycle], rowProps, table }, client)
    if (rowProps.index === 0) {
      roundwoodSupplyVarAndUnitCols.forEach(async (colProps) => {
        await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
      })
    }
    const year = years[Number(rowProps.index)]
    const yearCols = getRoundwoodSupplyYearsCols(year, cycle.uuid)
    yearCols.forEach(async (colProps) => {
      await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
    })
  })

  roundwoodTotalRows.forEach(async (rowProps) => {
    const row = await RowRepository.create({ assessment, cycles: [cycle], rowProps, table }, client)
    if (rowProps.index === 0) {
      roundwoodTotalVarAndUnitCols.forEach(async (colProps) => {
        await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
      })
    }
    const year = years[Number(rowProps.index)]
    const yearCols = getRoundwoodTotalYearsCols(year, cycle.uuid)
    yearCols.forEach(async (colProps) => {
      await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
    })
  })

  // 5. Generate cache
  await AssessmentController.generateMetadataCache({ assessment }, client)
}
