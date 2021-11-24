import { FRA } from '@core/assessment'
import { ColSpecFactory } from '../../../sectionSpec/colSpecFactory'
import { RowSpecFactory } from '../../../sectionSpec/rowSpecFactory'
import { SectionSpecFactory } from '../../../sectionSpec/sectionSpecFactory'
import { TableSpecFactory } from '../../../sectionSpec/tableSpecFactory'
import { Unit } from '../../../sectionSpec/unitSpec'
import { VARIABLES } from '../../../sectionSpec/variables'

const section = FRA.sections['7'].children.b
const years = FRA.yearsTable.slice(0, FRA.yearsTable.length - 1)
const categories = ['total', 'female', 'male']
const variableMappings: Record<string, string> = {
  doctoralDegree: VARIABLES.doctoral_degree,
  mastersDegree: VARIABLES.masters_degree,
  bachelorsDegree: VARIABLES.bachelors_degree,
  technicianCertificate: VARIABLES.technician_certificate,
  total: VARIABLES.total,
}

const getDataCols = () => years.map(() => categories.map(() => ColSpecFactory.newDecimalInstance({}))).flat()

const tableSpec = TableSpecFactory.newInstance({
  name: section.tables.graduationOfStudents,
  columnsExport: years.flatMap((year) => categories.map((category) => `${year}_${category}`)),
  unit: Unit.numberOfStudents,
  rows: [
    RowSpecFactory.newHeaderInstance({
      cols: [
        ColSpecFactory.newHeaderInstance({
          labelKey: 'graduationOfStudents.fra2020Categories',
          rowSpan: 3,
          left: true,
        }),
        ColSpecFactory.newHeaderInstance({
          labelKey: 'graduationOfStudents.numberOfStudents',
          colSpan: years.length * categories.length,
        }),
      ],
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years.map((year) =>
        ColSpecFactory.newHeaderInstance({
          label: `${year}`,
          colSpan: categories.length,
        })
      ),
    }),
    RowSpecFactory.newHeaderInstance({
      cols: years
        .map(() =>
          categories.map((category) =>
            ColSpecFactory.newHeaderInstance({
              labelKey: `graduationOfStudents.${category}`,
            })
          )
        )
        .flat(),
    }),
    ...['doctoralDegree', 'mastersDegree', 'bachelorsDegree', 'technicianCertificate', 'total'].map((variable) =>
      RowSpecFactory.newDataInstance({
        labelKey: `graduationOfStudents.${variable}`,
        variableExport: variableMappings[variable],
        cols: getDataCols(),
      })
    ),
  ],
})

const graduationOfStudents = SectionSpecFactory.newInstance({
  sectionName: section.name,
  sectionAnchor: section.anchor,
  tableSections: [{ tableSpecs: [tableSpec] }],
  descriptions: {
    analysisAndProcessing: false,
  },
})

export default graduationOfStudents
