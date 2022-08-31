import * as R from 'ramda'

import DataTableExporter from '../../exporter/dataTableExporter'

const yearsIdx: { [key: string]: any } = {
  '1990': 0,
  '2000': 3,
  '2010': 6,
  '2015': 9,
}

const fieldsIdx: { [key: string]: any } = {
  phd_tot: 0,
  phd_fem: 0,
  phd_male: 0,
  msc_tot: 1,
  msc_fem: 1,
  msc_male: 1,
  ba_tot: 2,
  ba_fem: 2,
  ba_male: 2,
  tech_tot: 3,
  tech_fem: 3,
  tech_male: 3,
  total_tot: 4,
  total_fem: 4,
  total_male: 4,
}

class GraduationOfStudentsExporter extends DataTableExporter {
  constructor() {
    super(
      'graduationOfStudents',
      [
        'phd_tot',
        'phd_fem',
        'phd_male',
        'msc_tot',
        'msc_fem',
        'msc_male',
        'ba_tot',
        'ba_fem',
        'ba_male',
        'tech_tot',
        'tech_fem',
        'tech_male',
        'total_tot',
        'total_fem',
        'total_male',
      ],
      '7b'
    )
  }

  parseResultRow(result: any, _yearIdx: any, year: any) {
    const resultRow: { [key: string]: any } = {}

    this.fields.forEach((field: string, _fieldIdx: any) => {
      const yearIdxData = yearsIdx[year]
      // eslint-disable-next-line no-nested-ternary
      const yearIdxField = R.endsWith('fem', field)
        ? yearIdxData + 1
        : R.endsWith('male', field)
        ? yearIdxData + 2
        : yearIdxData

      const fieldIdxData = fieldsIdx[field]

      resultRow[field] = R.path([fieldIdxData, yearIdxField], result)
    })

    return resultRow
  }
}

const instance = new GraduationOfStudentsExporter()

export default instance
