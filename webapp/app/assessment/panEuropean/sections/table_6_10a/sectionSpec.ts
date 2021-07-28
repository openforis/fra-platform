import { PanEuropean } from '@core/assessment'

import * as SectionSpec from  '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['610a']

const variables = ['total_forest_and_other_wooded_land']

const years = [...PanEuropean.years90_15].reverse()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_10a,
  [SectionSpec.KEYS_TABLE.columnsExport]: [
    'area_available_for_public_recreation_total',
    'area_available_for_public_recreation_percent',
    'area_designated_or_managed_for_public_recreation_total',
    'area_designated_or_managed_for_public_recreation_percent',
  ],

  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation.categoryYear',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation.areaAvailableForPublicRecreation',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]:
            'panEuropean.accessibilityForRecreation.areaPrimarilyDesignatedOrManagedForPublicRecreation',
          [SectionSpec.KEYS_COL.colSpan]: 2,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation.total1000Ha',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation._oftotal',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation.total1000Ha',
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.accessibilityForRecreation._oftotal',
        }),
      ],
    }),

    ...variables.flatMap((variable: any) =>
      years.map((year) =>
        SectionSpec.newRowData({
          [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.accessibilityForRecreation.${variable}`,
          [SectionSpec.KEYS_ROW.labelParams]: { year },
          [SectionSpec.KEYS_ROW.variableExport]: `${variable}_${year}`,
          [SectionSpec.KEYS_ROW.cols]: [
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
            SectionSpec.newColDecimal(),
          ],
        })
      )
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const accessibilityForRecreation = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default accessibilityForRecreation
