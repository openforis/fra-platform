// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'R'.
const R = require('ramda')
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Area'.
const Area = require('./area')

// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'keys'.
const keys = {
  countryIso: 'countryIso',
  assessment: 'assessment',
  lastEdit: 'lastEdit',
  regionCodes: 'regionCodes',
  fra2020: 'fra2020',
  deskStudy: 'deskStudy',
  fra2020Assessment: 'fra2020Assessment',
  fra2020DeskStudy: 'fra2020DeskStudy',
  regions: 'regions',
}
const getCountryIso = R.prop((keys as any).countryIso)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRegionC... Remove this comment to see the full error message
const getRegionCodes = R.propOr([], (keys as any).regionCodes)
const getLastEdit = R.prop((keys as any).lastEdit)
const getFra2020Assessment = R.prop((keys as any).fra2020Assessment)
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'getRegions... Remove this comment to see the full error message
const getRegions = R.propOr([], (keys as any).regions)
const isFra2020DeskStudy = R.propEq((keys as any).fra2020DeskStudy, true)
const isPanEuropean = R.pipe(getRegions, R.includes(Area.levels.forest_europe))
const isDeskStudy = R.pathOr(null, [(keys as any).assessment, (keys as any).fra2020, keys.deskStudy])
module.exports = {
  keys,
  getCountryIso,
  getRegionCodes,
  getLastEdit,
  getFra2020Assessment,
  getRegions,
  isFra2020DeskStudy,
  isPanEuropean,
  isDeskStudy,
}
