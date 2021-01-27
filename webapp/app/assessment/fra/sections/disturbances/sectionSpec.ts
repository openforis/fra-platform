import FRA from '@common/assessment/fra'
import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as DisturbancesState from '@webapp/app/assessment/fra/sections/disturbances/disturbancesState'
import * as DisturbancesValidatorState from '@webapp/app/assessment/fra/sections/disturbances/disturbancesValidatorState'

const section = FRA.sections['5'].children.a

const variables = {
  insects: {
    [SectionSpec.KEYS_ROW.variableNo]: 'a',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.insects,
  },
  diseases: {
    [SectionSpec.KEYS_ROW.variableNo]: 'b',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.diseases,
  },
  severeWeatherEvents: {
    [SectionSpec.KEYS_ROW.variableNo]: 'c',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.severe_weather_events,
  },
  other: {
    [SectionSpec.KEYS_ROW.variableNo]: 'd',
    [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.other,
  },
}

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.disturbances,
  [SectionSpec.KEYS_TABLE.columnsExport]: FRA.yearsAnnual,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.units.haThousand,
  [SectionSpec.KEYS_TABLE.tableDataRequired]: [
    {
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'disturbances.categoryHeader',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'disturbances.areaUnitLabel',
          [SectionSpec.KEYS_COL.colSpan]: FRA.yearsAnnual.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map((year: any) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),
    ...Object.entries(variables).map(([variable, rowProps]) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `disturbances.${variable}`,
        ...rowProps,
        [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map(() => SectionSpec.newColDecimal()),
      })
    ),

    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `disturbances.total`,
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.total,
      [SectionSpec.KEYS_ROW.variableNo]: 'a+b+c+d',
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: DisturbancesState.getDisturbancesTotal,
          [SectionSpec.KEYS_COL.validator]: DisturbancesValidatorState.disturbancesTotalValidator,
        })
      ),
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: `disturbances.totalForestArea`,
      [SectionSpec.KEYS_ROW.linkToSection]: FRA.sections['1'].children.a.name,
      [SectionSpec.KEYS_ROW.cols]: FRA.yearsAnnual.map(() =>
        SectionSpec.newColCalculated({
          [SectionSpec.KEYS_COL.calculateFn]: ExtentOfForestState.getForestByYearAnnualIdx,
        })
      ),
    }),
    SectionSpec.newRowNoticeMessage({
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
    }),
    SectionSpec.newRowValidationMessages({
      [SectionSpec.KEYS_ROW.getValidationMessages]: DisturbancesValidatorState.getValidationMessages,
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const disturbances = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default disturbances
