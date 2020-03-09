const SectionSpec = require('../sectionSpec')

const years = [1990, 2000, 2010, 2015, 2020]

const rows1 = [
  { labelKey: 'designatedManagementObjective.production', variableNo: 'a' },
  { labelKey: 'designatedManagementObjective.soilWaterProtection', variableNo: 'b' },
  { labelKey: 'designatedManagementObjective.biodiversityConservation', variableNo: 'c' },
  { labelKey: 'designatedManagementObjective.socialServices', variableNo: 'd' },
  { labelKey: 'designatedManagementObjective.multipleUse', variableNo: 'e' },
  { labelKey: 'designatedManagementObjective.other', variableNo: 'f' },
]

const tableSection1 = SectionSpec.newTableSection(
  'designatedManagementObjective.primaryDesignatedManagementObjective',
  'designatedManagementObjective.primaryDesignatedManagementObjectiveSupport',
  [
    SectionSpec.newTableSpec(rows1.map(r =>
      SectionSpec.newRowData(
        r.labelKey,
        years.map(() => SectionSpec.newColDecimal()),
        r.variableNo
      )
    ))
  ]
)

module.exports = SectionSpec.newSectionSpec(
  'designatedManagementObjective',
  '3a',
  [
    tableSection1
  ]
)
