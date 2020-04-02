import * as FRA from '@common/assessment/fra'

import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = FRA.sections['7'].children.b
const years = FRA.yearsTable.slice(0, FRA.yearsTable.length - 1)
const categories = ['total', 'female', 'male']

const getDataCols = () => years.map(() => categories.map(() => SectionSpec.newColDecimal())).flat()

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.graduationOfStudents,
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'graduationOfStudents.fra2020Categories',
          [SectionSpec.KEYS_COL.rowSpan]: 3,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'graduationOfStudents.numberOfStudents',
          [SectionSpec.KEYS_COL.colSpan]: years.length * categories.length,
        }),
      ],
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years.map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.label]: year,
          [SectionSpec.KEYS_COL.colSpan]: categories.length,
        })
      ),
    }),
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: years
        .map(() =>
          categories.map((category) =>
            SectionSpec.newColHeader({
              [SectionSpec.KEYS_COL.labelKey]: `graduationOfStudents.${category}`,
            })
          )
        )
        .flat(),
    }),
    ...['doctoralDegree', 'mastersDegree', 'bachelorsDegree', 'technicianCertificate', 'total'].map((variable) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.labelKey]: `graduationOfStudents.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: getDataCols(),
      })
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})

const graduationOfStudents = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
  [SectionSpec.KEYS_SECTION.descriptions]: {
    [SectionSpec.KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: false,
  },
})

export default graduationOfStudents
