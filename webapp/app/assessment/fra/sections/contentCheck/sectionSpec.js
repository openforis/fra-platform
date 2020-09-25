import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const asRange = (arr) => arr.map((_, i) => i < arr.length - 1 && `${arr[i]}-${arr[i + 1]}`).filter(Boolean)

const section = {
  name: 'contentCheck',
  tables: {
    extent: 'extent',
    periodicChangeRate: 'periodicChangeRate',
  },
}

const variables = {
  extent: [
    'forest_area',
    'other_wooded_land',

    'primary_forest_percent',
    'protected_forest_percent',
    'management_plan_percent',

    'certified_area',
    'mangroves',
    'bamboo',
  ],
  periodicChangeRate: [
    'forest_area_annual_net_change',
    'forest_area_annual_net_change_rate',

    'other_wooded_land_annual_net_change',
    'other_wooded_land_annual_net_change_rate',

    'primary_forest_annual_net_change',
    'primary_forest_annual_net_change_rate',

    'natural_forest_area_annual_net_change',
    'natural_forest_area_annual_net_change_rate',

    'planted_forest_annual_net_change',
    'planted_forest_annual_net_change_rate',
  ],
}

const tableSpecExtent = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.extent,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.extent',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: FRA.years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
        })
      ),
    }),

    ...variables.extent.map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: FRA.years.map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSpecPeriodicChangeRate = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.periodicChangeRate,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'contentCheck.periodicChangeRate',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: asRange(FRA.years).map((yearRange) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: yearRange,
        })
      ),
    }),

    ...variables.periodicChangeRate.map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `contentCheck.${variable}`,
        [SectionSpec.KEYS_ROW.variableExport]: `${variable}`,
        [SectionSpec.KEYS_ROW.cols]: asRange(FRA.years).map(() => SectionSpec.newColDecimal()),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpecExtent, tableSpecPeriodicChangeRate],
})

const sectionSpec = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: '',
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.showTitle]: false,
  [SectionSpec.KEYS_SECTION.dataExport]: { [SectionSpec.KEYS_DATA_EXPORT.included]: false },
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.comments]: false,
  },
})

export default sectionSpec
