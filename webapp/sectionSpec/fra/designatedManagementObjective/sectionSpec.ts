import { FRA } from '@core/assessment'
import { ColSpecFactory } from '@webapp/sectionSpec/colSpecFactory'
import { RowSpecFactory } from '@webapp/sectionSpec/rowSpecFactory'
import { SectionTableSpec } from '@webapp/sectionSpec/sectionSpec'
import { SectionSpecFactory } from '@webapp/sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '@webapp/sectionSpec/tableSpecFactory'
import { Unit } from '@webapp/sectionSpec/unitSpec'
import { VARIABLES } from '@webapp/sectionSpec/variables'

import * as ExtentOfForestState from '@webapp/sectionSpec/fra/extentOfForest/extentOfForestState'
import * as DesignatedManagementObjectiveState from '@webapp/sectionSpec/fra/designatedManagementObjective/designatedManagementObjectiveState'

const section = FRA.sections['3'].children.a

const rowsHeader = [
  RowSpecFactory.newHeaderInstance({
    cols: [
      ColSpecFactory.newHeaderInstance({
        labelKey: 'designatedManagementObjective.categoryHeader',
        rowSpan: 2,
        left: true,
      }),
      ColSpecFactory.newHeaderInstance({
        labelKey: 'designatedManagementObjective.areaUnitLabel',
        colSpan: FRA.yearsTable.length,
      }),
    ],
  }),
  RowSpecFactory.newHeaderInstance({
    cols: FRA.yearsTable.map((y) => ColSpecFactory.newHeaderInstance({ label: `${y}` })),
  }),
]

const rowsData = [
  {
    labelKey: 'designatedManagementObjective.production',
    variableNo: 'a',
    variableExport: VARIABLES.production,
  },
  {
    labelKey: 'designatedManagementObjective.soilWaterProtection',
    variableNo: 'b',
    variableExport: VARIABLES.protection_of_soil_and_water,
  },
  {
    labelKey: 'designatedManagementObjective.biodiversityConservation',
    variableNo: 'c',
    variableExport: VARIABLES.conservation_of_biodiversity,
  },
  {
    labelKey: 'designatedManagementObjective.socialServices',
    variableNo: 'd',
    variableExport: VARIABLES.social_services,
  },
  {
    labelKey: 'designatedManagementObjective.multipleUse',
    variableNo: 'e',
    variableExport: VARIABLES.multiple_use,
  },
  {
    labelKey: 'designatedManagementObjective.other',
    variableNo: 'f',
    variableExport: VARIABLES.other,
  },
]

const tableSpec1 = TableSpecFactory.newInstance({
  name: section.tables.primaryDesignatedManagementObjective,
  columnsExport: FRA.yearsTable,
  unit: Unit.haThousand,
  tableDataRequired: [
    {
      assessmentType: FRA.type,
      sectionName: FRA.sections['1'].children.a.name,
      tableName: FRA.sections['1'].children.a.tables.extentOfForest,
    },
  ],
  rows: [
    ...rowsHeader,
    ...rowsData.map((r) =>
      RowSpecFactory.newDataInstance({
        labelKey: r.labelKey,
        cols: FRA.yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
        variableNo: r.variableNo,
        variableExport: r.variableExport,
      })
    ),
    RowSpecFactory.newDataInstance({
      labelKey: 'designatedManagementObjective.unknown',
      variableExport: VARIABLES.no_unknown,
      cols: FRA.yearsTable.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: DesignatedManagementObjectiveState.getUnknown,
        })
      ),
      variableNo: 'g',
    }),
    RowSpecFactory.newDataInstance({
      labelKey: 'designatedManagementObjective.totalForestArea',
      cols: FRA.yearsTable.map(() =>
        ColSpecFactory.newCalculatedInstance({
          calculateFn: ExtentOfForestState.getForestByYearFraIdx,
        })
      ),
      linkToSection: FRA.sections['1'].children.a.name,
    }),
  ],
})

const tableSection1: SectionTableSpec = {
  tableSpecs: [tableSpec1],
  titleKey: 'designatedManagementObjective.primaryDesignatedManagementObjective',
  descriptionKey: 'designatedManagementObjective.primaryDesignatedManagementObjectiveSupport',
}

const tableSpec2 = TableSpecFactory.newInstance({
  name: section.tables.totalAreaWithDesignatedManagementObjective,
  rows: [
    ...rowsHeader,
    ...rowsData
      .filter((r) => r.variableNo !== 'e')
      .map((r) =>
        RowSpecFactory.newDataInstance({
          labelKey: r.labelKey,
          cols: FRA.yearsTable.map(() => ColSpecFactory.newDecimalInstance({})),
        })
      ),
  ],
})

const tableSection2: SectionTableSpec = {
  tableSpecs: [tableSpec2],
  titleKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjective',
  descriptionKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport',
}

const designatedManagementObjective = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [tableSection1, tableSection2],
})

export default designatedManagementObjective
