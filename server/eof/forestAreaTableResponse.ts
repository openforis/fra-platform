// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'defaultYea... Remove this comment to see the full error message
const defaultYears = require('./defaultYears')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'buildDefau... Remove this comment to see the full error message
const buildDefault = (year: any) => ({
  year,
  type: 'fra',
  name: year.toString(),
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'forestArea' implicitly ... Remove this comment to see the full error message
  forestArea: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherWoodedLand' implic... Remove this comment to see the full error message
  otherWoodedLand: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherLand' implicitly h... Remove this comment to see the full error message
  otherLand: null,
})

module.exports = R.map((year: any) => buildDefault(year), defaultYears)
