import { FRA } from '@core/assessment'
import { CalculateValue } from '@webapp/sectionSpec/colSpec'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionTableSpec } from '@webapp/sectionSpec/sectionSpec'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'

import * as SustainableDevelopmentState from '@webapp/sectionSpec/fra/sustainableDevelopment/sustainableDevelopmentState'

const section = FRA.sections['8'].children.a

const newTableSpecResponsibleAgency = (tableName: string, printPageBreakAfter: boolean) =>
  TableSpecFactory.newInstance({
    name: tableName,
    secondary: true,
    print: {
      pageBreakAfter: !!printPageBreakAfter,
    },
    rows: [
      RowSpecFactory.newDataInstance({
        labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
        mainCategory: true,
        cols: [ColSpecFactory.newTextInstance({})],
      }),
    ],
  })

const newTableSDGIndicator = (
  yearsTable: Array<string | number>,
  labelKeyHeader1: string,
  labelKeyHeader2: string,
  labelKeyRowData: string,
  calculateFnRowData: CalculateValue,
  labelHeader1Params = {}
) =>
  TableSpecFactory.newInstance({
    // @ts-ignore
    getSectionData: () => () => [],
    rows: [
      RowSpecFactory.newHeaderInstance({
        cols: [
          ColSpecFactory.newHeaderInstance({
            labelKey: labelKeyHeader1,
            labelParams: labelHeader1Params,
            rowSpan: 2,
            left: true,
          }),
          ColSpecFactory.newHeaderInstance({
            labelKey: labelKeyHeader2,
            colSpan: yearsTable.length,
          }),
        ],
      }),
      RowSpecFactory.newHeaderInstance({
        cols: yearsTable.map((year) =>
          ColSpecFactory.newHeaderInstance({
            label: `${year}`,
          })
        ),
      }),
      RowSpecFactory.newDataInstance({
        labelKey: labelKeyRowData,
        cols: yearsTable.map(() =>
          ColSpecFactory.newCalculatedInstance({
            calculateFn: calculateFnRowData,
          })
        ),
      }),
    ],
  })

// SDG 15.1.1
const tableSection1: SectionTableSpec = {
  tableSpecs: [
    {
      ...newTableSDGIndicator(
        SustainableDevelopmentState.years,
        'sustainableDevelopment.indicator',
        'sustainableDevelopment.percent',
        'sustainableDevelopment.forestAreaProportionLandArea2015',
        SustainableDevelopmentState.getForestAreaProportionLandArea2015
      ),
      tableDataRequired: [
        {
          assessmentType: FRA.type,
          sectionName: FRA.sections['1'].children.a.name,
          tableName: FRA.sections['1'].children.a.tables.extentOfForest,
        },
        {
          assessmentType: FRA.type,
          sectionName: FRA.sections['2'].children.c.name,
          tableName: FRA.sections['2'].children.c.tables.biomassStock,
        },
        {
          assessmentType: FRA.type,
          sectionName: FRA.sections['3'].children.b.name,
          tableName: FRA.sections['3'].children.b.tables.forestAreaWithinProtectedAreas,
        },
      ],
    },
    newTableSpecResponsibleAgency(section.tables.sustainableDevelopmentAgencyIndicator),
  ],
  titleKey: 'sustainableDevelopment.sdgIndicator1',
}

// SDG 15.2.1 - sub-indicator 1
const tableSection2: SectionTableSpec = {
  tableSpecs: [
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
  titleKey: 'sustainableDevelopment.sdgIndicator2',
}

// SDG 15.2.1 - sub-indicator 2
const tableSection3: SectionTableSpec = {
  tableSpecs: [
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
}

// SDG 15.2.1 - sub-indicator 3
const tableSection4: SectionTableSpec = {
  tableSpecs: [
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
}

// SDG 15.2.1 - sub-indicator 4
const tableSection5: SectionTableSpec = {
  tableSpecs: [
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
}

// SDG 15.2.1 - sub-indicator 5
const tableSection6: SectionTableSpec = {
  tableSpecs: [
    newTableSDGIndicator(
      SustainableDevelopmentState.years,
      'sustainableDevelopment.subIndicator',
      'sustainableDevelopment.forestArea1000Ha',
      'sustainableDevelopment.forestAreaVerifiedForestManagement',
      SustainableDevelopmentState.getCertifiedArea,
      { no: 5 }
    ),
  ],
}

const sustainableDevelopment = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  dataExport: { included: false },
  tableSections: [tableSection1, tableSection2, tableSection3, tableSection4, tableSection5, tableSection6],
  descriptions: {
    nationalData: false,
    analysisAndProcessing: false,
    comments: false,
  },
})

export default sustainableDevelopment
