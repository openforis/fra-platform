import { AssessmentNames, ColProps, ColType, RowProps, RowType } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'
import { ColRepository } from 'server/repository/assessment/col'
import { RowRepository } from 'server/repository/assessment/row'
import { TableRepository } from 'server/repository/assessment/table'

const years = [2020, 2015, 2010, 2005, 2000, 1990]

const getGrowingStockSupplyYearNonHeaderCols = (year: number, cycleUuid: string): Array<ColProps> => {
  let index = years.indexOf(year)
  if (year === 2020) index += 1
  return [
    {
      // year col
      colType: ColType.placeholder,
      index,
      labels: {
        [cycleUuid]: {
          key: year.toString(), // TODO: replace with translation key
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
      index,
      labels: {
        [cycleUuid]: {
          key: 'N/A', // TODO: replace with translation key
        },
      },
    },
    {
      // OWL col
      colType: ColType.placeholder,
      index: index + 2,
    },
    {
      // FOWL col
      colType: ColType.placeholder,
      index: index + 3,
    },
  ]
}

const getGrowingStockTotalYearNonHeaderCols = (year: number, cycleUuid: string): Array<ColProps> => {
  let index = years.indexOf(year)
  if (year === 2020) index += 1
  return [
    {
      // year col
      colType: ColType.placeholder,
      index,
      labels: {
        [cycleUuid]: {
          key: year.toString(), // TODO: replace with translation key
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
      index: index + 3,
    },
    {
      // OWL col
      colType: ColType.placeholder,
      index: index + 2,
    },
    {
      // FOWL col
      colType: ColType.placeholder,
      index,
      labels: {
        [cycleUuid]: {
          key: 'N/A', // TODO: replace with translation key
        },
      },
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

  // 1. Add new grid template columns
  const gridTemplateColumns = 'minmax(150px, auto) repeat(6, minmax(min-content, 1fr))'

  client.query(
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
  // 2. TODO: Delete current cols
  // 3. TODO: Delete current rows

  // 4. Insert new rows and cols
  const roundwoodRemovalAsPctOfGrowingStockSupplyRows: Array<RowProps> = years.map((year, index) => {
    return {
      index,
      label: {
        key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockSupply',
      },
      type: RowType.data,
      variableName: `roundwoodRemovalAsPctOfGrowingStockSupply_${year}`,
    }
  })

  const roundwoodRemovalAsPctOfGrowingStockTotalHeaderCols: Array<ColProps> = [
    {
      colType: ColType.header,
      index: 'header_0',
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockTotal',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 3,
        },
      },
    },
    {
      colType: ColType.header,
      index: 1,
      labels: {
        [cycle.uuid]: {
          key: '%', // TODO: replace with translation key
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 3,
        },
      },
    },
  ]

  const roundwoodRemovalAsPctOfGrowingStockSupplyHeaderCols: Array<ColProps> = [
    {
      colType: ColType.header,
      index: 'header_0',
      labels: {
        [cycle.uuid]: {
          key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockSupply',
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 3,
        },
      },
    },
    {
      colType: ColType.header,
      index: 1,
      labels: {
        [cycle.uuid]: {
          key: '%', // TODO: replace with translation key
        },
      },
      style: {
        [cycle.uuid]: {
          colSpan: 1,
          rowSpan: 3,
        },
      },
    },
  ]

  const roundwoodRemovalAsPctOfGrowingStockTotalRows: Array<RowProps> = years.map((year, index) => {
    return {
      index,
      label: {
        key: 'panEuropean.reasonabilityChecks.roundwoodRemovalAsPctOfGrowingStockTotal',
      },
      type: RowType.data,
      variableName: `roundwoodRemovalAsPctOfGrowingStockTotal_${year}`,
    }
  })

  const table = await TableRepository.getOne({ assessment, cycle, tableName })

  roundwoodRemovalAsPctOfGrowingStockSupplyRows.forEach(async (rowProps) => {
    const row = await RowRepository.create({ assessment, cycles: [cycle], rowProps, table }, client)
    if (rowProps.index === 0) {
      roundwoodRemovalAsPctOfGrowingStockSupplyHeaderCols.forEach(async (colProps) => {
        await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
      })
    }
    const year = years[Number(rowProps.index)]
    const yearCols = getGrowingStockSupplyYearNonHeaderCols(year, cycle.uuid)
    yearCols.forEach(async (colProps) => {
      await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
    })
  })

  roundwoodRemovalAsPctOfGrowingStockTotalRows.forEach(async (rowProps) => {
    const row = await RowRepository.create({ assessment, cycles: [cycle], rowProps, table }, client)
    if (rowProps.index === 0) {
      roundwoodRemovalAsPctOfGrowingStockTotalHeaderCols.forEach(async (colProps) => {
        await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
      })
    }
    const year = years[Number(rowProps.index)]
    const yearCols = getGrowingStockTotalYearNonHeaderCols(year, cycle.uuid)
    yearCols.forEach(async (colProps) => {
      await ColRepository.create({ assessment, cycles: [cycle], row, colProps }, client)
    })
  })

  // 5. TODO: Generate cache
}
