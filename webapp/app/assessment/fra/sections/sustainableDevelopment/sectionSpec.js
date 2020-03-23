import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as SustainableDevelopmentState from '@webapp/app/assessment/fra/sections/sustainableDevelopment/sustainableDevelopmentState'

const section = FRA.sections['8'].children.a

const newTableSpecResponsibleAgency = tableName =>
  SectionSpec.newTableSpec({
    [SectionSpec.KEYS_TABLE.name]: tableName,
    [SectionSpec.KEYS_TABLE.secondary]: true,
    [SectionSpec.KEYS_TABLE.rows]: [
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'sustainableDevelopment.nameOfAgencyResponsible',
        [SectionSpec.KEYS_ROW.mainCategory]: true,
        [SectionSpec.KEYS_ROW.cols]: [SectionSpec.newColText()],
      }),
    ],
  })

const newTableSDGIndicator = (
  yearsTable,
  labelKeyHeader1,
  labelKeyHeader2,
  labelKeyRowData,
  calculateFnRowData,
  labelParamsRowData = {}
) =>
  SectionSpec.newTableSpec({
    [SectionSpec.KEYS_TABLE.getSectionData]: () => () => [],
    [SectionSpec.KEYS_TABLE.rows]: [
      SectionSpec.newRowHeader({
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.labelKey]: labelKeyHeader1,
            [SectionSpec.KEYS_COL.rowSpan]: 2,
            [SectionSpec.KEYS_COL.left]: true,
          }),
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.labelKey]: labelKeyHeader2,
            [SectionSpec.KEYS_COL.colSpan]: yearsTable.length,
          }),
        ],
      }),
      SectionSpec.newRowHeader({
        [SectionSpec.KEYS_ROW.cols]: yearsTable.map(year =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
          })
        ),
      }),
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: 'sustainableDevelopment.forestAreaProportionLandArea2015',
        [SectionSpec.KEYS_ROW.labelParams]: labelParamsRowData,
        [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
          SectionSpec.newColCalculated({
            [SectionSpec.KEYS_COL.calculateFn]: calculateFnRowData,
          })
        ),
      }),
    ],
  })

const tableSection1 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.indicator',
      'sustainableDevelopment.percent',
      'sustainableDevelopment.forestAreaProportionLandArea2015',
      SustainableDevelopmentState.getForestAreaProportionLandArea2015
    ),
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencyIndicator),
  ],
  [SectionSpec.KEYS_TABLE_SECTION.titleKey]: 'sustainableDevelopment.sdgIndicator1',
})

const tableSection2 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.yearsRange,
      'sustainableDevelopment.subIndicator',
      'sustainableDevelopment.percent',
      'sustainableDevelopment.forestAreaAnnualNetChangeRate',
      SustainableDevelopmentState.getForestAreaAnnualNetChangeRate,
      { no: 1 }
    ),
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencySubIndicator1),
  ],
  [SectionSpec.KEYS_TABLE_SECTION.titleKey]: 'sustainableDevelopment.sdgIndicator2',
})

const sustainableDevelopment = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection1, tableSection2],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.comments]: false,
  },
})

export default sustainableDevelopment
