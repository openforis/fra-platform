import * as R from 'ramda'
// import * as FRA from '@common/assessment/fra'
//
// import { sub, sum } from '@common/bignumberUtils'
//
// import * as CountryState from '@webapp/app/country/countryState'
import * as AssessmentState from '@webapp/app/assessment/assessmentState'
// import * as TableWithOdpState from '@webapp/app/assessment/components/dataTable/tableWithOdp/tableWithOdpState'
//
// const section = 'extentOfForest'

// ====
export const getSectionData = (assessmentType, sectionName, tableName) => state => {
  const data = R.pipe(
    AssessmentState.getSectionData(assessmentType, sectionName, tableName),
    R.propOr(null, 'fra')
  )(state)
  return data
}
//
// // ==== Assessment Fra config areas getter functions
//
// export const getForestArea2015Value = year => R.pipe(CountryState.getConfigFra2015ForestAreas, R.prop(year))
//
// // ==== Datum getter functions
//
// export const getFaoStatArea = datum => R.pipe(CountryState.getConfigFaoStat, R.path([datum.name, 'area']))
//
// export const getForest = datum => () => R.propOr(null, 'forestArea', datum)
//
// export const getOtherWoodedLand = datum => () => R.propOr(null, 'otherWoodedLand', datum)
//
// export const getOtherLand = datum => state => {
//   const forestArea = getForest(datum)()
//   const otherWoodedLand = getOtherWoodedLand(datum)()
//   const faoStatArea = getFaoStatArea(datum)(state)
//
//   return sub(faoStatArea, sum([forestArea, otherWoodedLand]))
// }
//
// // ==== By Year getter functions
//
// export const getForestByYear = year => TableWithOdpState.getFieldByYear(section, 'forestArea', year)
//
// // ==== By Year index getter functions
//
// export const getForestByYearFraIdx = idx => getForestByYear(FRA.years[idx])
