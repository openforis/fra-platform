import * as FRA from '@common/assessment/fra'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['5'].children.c

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.degradedForest,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'degradedForest.doesYourCountryMonitor',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.does_country_monitor,
      [SectionSpec.KEYS_ROW.colSpan]: 2,
      [SectionSpec.KEYS_ROW.mainCategory]: true,
      [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColSelectYesNo()],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'degradedForest.ifYes',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.national_definition,
      [SectionSpec.KEYS_ROW.rowSpan]: 2,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColPlaceholder({
          [SectionSpec.KEYS_COL.labelKey]: 'degradedForest.whatIsDefinition',
          [SectionSpec.KEYS_COL.idx]: -1,
        }),
        SectionSpec.newColTextArea({
          [SectionSpec.KEYS_COL.idx]: 1,
        }),
      ],
    }),
    SectionSpec.newRowData({
      [SectionSpec.KEYS_ROW.labelKey]: 'degradedForest.howMonitored',
      [SectionSpec.KEYS_ROW.variableExport]: SectionSpec.VARIABLES.how_monitored,
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColTextArea({
          [SectionSpec.KEYS_COL.idx]: 0,
        }),
      ],
    }),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const degradedForest = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.dataExport]: { [SectionSpec.KEYS_DATA_EXPORT.included]: false },
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})

export default degradedForest
