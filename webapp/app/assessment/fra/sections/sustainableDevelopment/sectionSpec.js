import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

import * as SustainableDevelopmentState from '@webapp/app/assessment/fra/sections/sustainableDevelopment/sustainableDevelopmentState'

const section = FRA.sections['8'].children.a

const newTableSpecResponsibleAgency = (tableName, printPageBreakAfter = false) =>
  SectionSpec.newTableSpec({
    [SectionSpec.KEYS_TABLE.name]: tableName,
    [SectionSpec.KEYS_TABLE.secondary]: true,
    [SectionSpec.KEYS_TABLE.print]: {
      [SectionSpec.KEYS_TABLE_PRINT.pageBreakAfter]: printPageBreakAfter,
    },
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
  labelHeader1Params = {}
) =>
  SectionSpec.newTableSpec({
    [SectionSpec.KEYS_TABLE.getSectionData]: () => () => [],
    [SectionSpec.KEYS_TABLE.rows]: [
      SectionSpec.newRowHeader({
        [SectionSpec.KEYS_ROW.cols]: [
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.labelKey]: labelKeyHeader1,
            [SectionSpec.KEYS_COL.labelParams]: labelHeader1Params,
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
        [SectionSpec.KEYS_ROW.cols]: yearsTable.map((year) =>
          SectionSpec.newColHeader({
            [SectionSpec.KEYS_COL.label]: year,
          })
        ),
      }),
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: labelKeyRowData,
        [SectionSpec.KEYS_ROW.cols]: yearsTable.map(() =>
          SectionSpec.newColCalculated({
            [SectionSpec.KEYS_COL.calculateFn]: calculateFnRowData,
          })
        ),
      }),
    ],
  })

// SDG 15.1.1
const tableSection1 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    {
      ...newTableSDGIndicator(
        SustainableDevelopmentState.years,
        'sustainableDevelopment.indicator',
        'sustainableDevelopment.percent',
        'sustainableDevelopment.forestAreaProportionLandArea2015',
        SustainableDevelopmentState.getForestAreaProportionLandArea2015
      ),
      [SectionSpec.KEYS_TABLE.tableDataRequired]: [
        {
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['1'].children.a.name,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['1'].children.a.tables.extentOfForest,
        },
        {
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['2'].children.c.name,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]: FRA.sections['2'].children.c.tables.biomassStock,
        },
        {
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.assessmentType]: FRA.type,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.sectionName]: FRA.sections['3'].children.b.name,
          [SectionSpec.KEYS_TABLE_DATA_REQUIRED.tableName]:
            FRA.sections['3'].children.b.tables.forestAreaWithinProtectedAreas,
        },
      ],
    },
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencyIndicator),
  ],
  [SectionSpec.KEYS_TABLE_SECTION.titleKey]: 'sustainableDevelopment.sdgIndicator1',
})

// SDG 15.2.1 - sub-indicator 1
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

// SDG 15.2.1 - sub-indicator 2
const tableSection3 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.subIndicator',
      'biomassStock.tableHeader',
      'sustainableDevelopment.aboveGroundBiomassStockForests',
      SustainableDevelopmentState.getBiomassStock,
      { no: 2 }
    ),
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencySubIndicator2, true),
  ],
})

// SDG 15.2.1 - sub-indicator 3
const tableSection4 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.subIndicator',
      'sustainableDevelopment.percent2015ForestAreaBaseline',
      'sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas',
      SustainableDevelopmentState.getForestAreaProportionProtectedAreas,
      { no: 3 }
    ),
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencySubIndicator3),
  ],
})

// SDG 15.2.1 - sub-indicator 4
const tableSection5 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.subIndicator',
      'sustainableDevelopment.percent2015ForestAreaBaseline',
      'sustainableDevelopment.proportionForestAreaLongTermForestManagement',
      SustainableDevelopmentState.getForestAreaProportionLongTermForestManagement,
      { no: 4 }
    ),
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencySubIndicator4),
  ],
})

// SDG 15.2.1 - sub-indicator 5
const tableSection6 = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.subIndicator',
      'sustainableDevelopment.forestArea1000Ha',
      'sustainableDevelopment.forestAreaVerifiedForestManagement',
      SustainableDevelopmentState.getCertifiedArea,
      { no: 5 }
    ),
  ],
})

const sustainableDevelopment = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.dataExport]: { [SectionSpec.KEYS_DATA_EXPORT.included]: false },
  [SectionSpec.KEYS_SECTION.tableSections]: [
    tableSection1,
    tableSection2,
    tableSection3,
    tableSection4,
    tableSection5,
    tableSection6,
  ],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.nationalData]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.comments]: false,
  },
})

export default sustainableDevelopment
