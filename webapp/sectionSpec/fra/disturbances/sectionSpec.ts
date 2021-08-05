import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as DisturbancesState from '@webapp/sectionSpec/fra/disturbances/disturbancesState'
import * as DisturbancesValidatorState from '@webapp/sectionSpec/fra/disturbances/disturbancesValidatorState'

const section = FRA.sections['5'].children.a

const variables = {
  insects: {
    variableNo: 'a',
    variableExport: VARIABLES.insects,
  },
  diseases: {
    variableNo: 'b',
    variableExport: VARIABLES.diseases,
  },
  severeWeatherEvents: {
    variableNo: 'c',
    variableExport: VARIABLES.severe_weather_events,
  },
  other: {
    variableNo: 'd',
    variableExport: VARIABLES.other,
  },
}

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.disturbances,
  columnsExport: FRA.yearsAnnual,
  unit: Unit.haThousand,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'disturbances.categoryHeader',
          rowSpan: 2,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'disturbances.areaUnitLabel',
          colSpan: FRA.yearsAnnual.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: FRA.yearsAnnual.map((year: any) =>
        ColSpecFactory.newHeaderInstance({
          label: year,
        })
      ),
    }),
    ...Object.entries(variables).map(([variable, rowProps]) =>
      RowSpecFactory.newDataInstance({
        labelKey: `disturbances.${variable}`,
        ...rowProps,
        cols: FRA.yearsAnnual.map(() => ColSpecFactory.newDecimalInstance({})),
      })
    ),

    RowSpecFactory.newDataInstance({
      labelKey: `disturbances.total`,
      variableExport: VARIABLES.total,
      variableNo: 'a+b+c+d',
      mainCategory: true,
      cols: FRA.yearsAnnual.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: DisturbancesState.getDisturbancesTotal,
          validator: DisturbancesValidatorState.disturbancesTotalValidator,
        })
      ),
    }),
    RowSpecFactory.newDataInstance({
      labelKey: `disturbances.totalForestArea`,
      linkToSection: FRA.sections['1'].children.a.name,
      cols: FRA.yearsAnnual.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: ExtentOfForestState.getForestByYearAnnualIdx,
        })
      ),
    }),
    RowSpecFactory.newNoticeMessageInstance({
      rowSpan: 2,
    }),
    RowSpecFactory.newValidationMessagesInstance({
      getValidationMessages: DisturbancesValidatorState.getValidationMessages,
    }),
  ],
})

const disturbances = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
})

export default disturbances
