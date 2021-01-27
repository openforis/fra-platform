// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'defaultYea... Remove this comment to see the full error message
const defaultYears = require('./defaultYears')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'buildDefau... Remove this comment to see the full error message
const buildDefault = (year: any) => ({
  year,
  type: 'fra',
  name: year.toString(),
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'naturalForestArea' impl... Remove this comment to see the full error message
  naturalForestArea: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationForestArea' i... Remove this comment to see the full error message
  plantationForestArea: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'plantationForestIntrodu... Remove this comment to see the full error message
  plantationForestIntroducedArea: null,
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'otherPlantedForestArea'... Remove this comment to see the full error message
  otherPlantedForestArea: null,
})

module.exports = R.map((year: any) => buildDefault(year), defaultYears)
