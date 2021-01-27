// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as NumberUtils from '@common/bignumberUtils'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

import * as CountryState from '@webapp/app/country/countryState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'
import * as BiomassStockState from '@webapp/app/assessment/fra/sections/biomassStock/biomassStockState'
import * as ForestAreaWithinProtectedAreasState from '@webapp/app/assessment/fra/sections/forestAreaWithinProtectedAreas/forestAreaWithinProtectedAreasState'

export const years = FRA.years.slice(1, FRA.years.length)
export const yearsRange = years.reduce((ranges: any, year: any, idx: any) => {
  if (idx !== years.length - 1) {
    ranges.push(`${year}-${years[idx + 1]}`)
  }
  return ranges
}, [])

// SDG 15.1.1
export const getForestAreaProportionLandArea2015 = (colIdx: any) => (state: any) => {
  const year = years[colIdx]
  const faoStatArea = ExtentOfForestState.getFaoStatAreaByYear(2015)(state)
  const forestArea = ExtentOfForestState.getForestByYear(year)(state)
  return NumberUtils.mul(NumberUtils.div(forestArea, faoStatArea), 100)
}

// SDG 15.2.1 - sub-indicator 2
export const getForestAreaAnnualNetChangeRate = (colIdx: any) => (state: any) => {
  const range = yearsRange[colIdx].split('-')
  const yearFrom = Number(range[0])
  const yearTo = Number(range[1])
  const yearsDiff = NumberUtils.sub(yearTo, yearFrom).toNumber()

  const forestAreaFrom = ExtentOfForestState.getForestByYear(yearFrom)(state)
  const forestAreaTo = ExtentOfForestState.getForestByYear(yearTo)(state)

  // (forestAreaTo - forestAreaFrom) / forestAreaTo * 100
  if (yearsDiff === 1) {
    return NumberUtils.mul(NumberUtils.div(NumberUtils.sub(forestAreaTo, forestAreaFrom), forestAreaTo), 100)
  }

  // (((forestAreaTo / forestAreaFrom) ^ coeff) - 1) * 100
  const coeff = yearsDiff === 10 ? 0.1 : 0.2
  const forestProportion = NumberUtils.div(forestAreaTo, forestAreaFrom)
  if (R.isNil(forestProportion)) {
    return null
  }
  return NumberUtils.mul(NumberUtils.sub(forestProportion ** coeff, 1), 100)
}

// SDG 15.2.1 - sub-indicator 2
export const getBiomassStock = (colIdx: any) => BiomassStockState.getAboveGroundBiomassByYear(years[colIdx])

// SDG 15.2.1 - sub-indicator 3
export const getForestAreaProportionProtectedAreas = (colIdx: any) => (state: any) => {
  const forestAreaWithinProtectedAreas = ForestAreaWithinProtectedAreasState.getForestAreaWithinProtectedAreasByYear(
    years[colIdx]
  )(state)
  const forestArea2015 = ExtentOfForestState.getForestByYear(2015)(state)

  // forestAreaWithinProtectedAreas / forestArea2015 * 100
  return NumberUtils.mul(NumberUtils.div(forestAreaWithinProtectedAreas, forestArea2015), 100)
}

// SDG 15.2.1 - sub-indicator 4
export const getForestAreaProportionLongTermForestManagement = (colIdx: any) => (state: any) => {
  const forestAreaLongTermForestManagementPlan = ForestAreaWithinProtectedAreasState.getForestAreaLongTermForestManagementPlanByYear(
    years[colIdx]
  )(state)
  const forestArea2015 = ExtentOfForestState.getForestByYear(2015)(state)

  // MIN(forestAreaLongTermForestManagementPlan / forestArea2015 * 100, 100)
  const proportion = NumberUtils.mul(NumberUtils.div(forestAreaLongTermForestManagementPlan, forestArea2015), 100)
  return proportion ? NumberUtils.min(proportion, 100) : null
}

// SDG 15.2.1 - sub-indicator 5
export const getCertifiedArea = (colIdx: any) => CountryState.getConfigCertifiedAreaByYear(years[colIdx])
