// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Traditiona... Remove this comment to see the full error message
const TraditionalTableExporter = require('../../exporter/traditionalTableExporter')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'yearsIdx'.
const yearsIdx = {
  '1990': 0,
  '2000': 3,
  '2010': 6,
  '2015': 9,
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'fieldsIdx'... Remove this comment to see the full error message
const fieldsIdx = {
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

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Graduation... Remove this comment to see the full error message
class GraduationOfStudentsExporter extends TraditionalTableExporter {
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

  parseResultRow(result: any, yearIdx: any, year: any) {
    const resultRow = {}

    this.fields.forEach((field: any, fieldIdx: any) => {
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const yearIdxData = yearsIdx[year]
      const yearIdxField = R.endsWith('fem', field)
        ? yearIdxData + 1
        : R.endsWith('male', field)
        ? yearIdxData + 2
        : yearIdxData

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      const fieldIdxData = fieldsIdx[field]

      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      resultRow[field] = R.path([fieldIdxData, yearIdxField], result)
    })

    return resultRow
  }
}

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'instance'.
const instance = new GraduationOfStudentsExporter()

module.exports = instance
