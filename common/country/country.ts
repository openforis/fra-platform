import * as R from 'ramda'
import { RegionCode } from '@core/meta/area'

export const keys = {
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
export const getCountryIso = R.prop((keys as any).countryIso)
export const getRegionCodes = (x: any) => R.propOr([], (keys as any).regionCodes)(x)
export const getLastEdit = R.prop((keys as any).lastEdit)
export const getFra2020Assessment = R.prop((keys as any).fra2020Assessment)
export const getRegions = R.propOr([], (keys as any).regions)
export const isFra2020DeskStudy = R.propEq((keys as any).fra2020DeskStudy, true)
export const isPanEuropean = R.pipe(getRegions, R.includes(RegionCode.FE))
export const isDeskStudy = R.pathOr(null, [(keys as any).assessment, (keys as any).fra2020, keys.deskStudy])
export default {
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
