import axios from 'axios'

import { AreaCode, Areas } from 'meta/area'
import { RecordAssessmentDatas } from 'meta/data'

const target = 'https://fra-data.fao.org'
const source = 'http://localhost:9000'
const api = '/api/cycle-data/table/table-data'

const assessmentName = 'fra'
const cycleName = '2020'
const commonParams = {
  assessmentName,
  cycleName,
}

type Tables = Record<string, { variables: Array<string>; columns: Array<string> }>
const tables: Tables = {
  extentOfForest: {
    variables: ['forestArea', 'totalLandArea'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  growingStockTotal: {
    variables: ['growing_stock_total'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  carbonStock: {
    variables: ['carbon_stock_biomass_total', 'carbon_stock_total'],
    columns: ['1990', '2000', '2010', '2020'],
  },

  forestAreaWithinProtectedAreas: {
    variables: ['forest_area_within_protected_areas', 'forestArea'],
    columns: ['2020'],
  },

  forestOwnership: {
    variables: ['other_or_unknown', 'private_ownership', 'public_ownership'],
    columns: ['2015'],
  },

  primaryDesignatedManagementObjective: {
    variables: [
      'production',
      'multiple_use',
      'conservation_of_biodiversity',
      'protection_of_soil_and_water',
      'social_services',
      'other',
    ],
    columns: ['1990', '2000', '2010', '2020'],
  },

  specificForestCategories: {
    variables: ['primary_forest'],
    columns: ['2020'],
  },
}

const getProdData = async (countryIso: AreaCode) => {
  const allDatas = await Promise.all(
    Object.keys(tables).map(async (tableName) => {
      const params = {
        ...commonParams,
        countryIso,
        countryISOs: [countryIso],
        tableNames: Areas.isISOCountry(countryIso) ? [tableName] : ['value_aggregate'],
        aggregate: true,
        ...tables[tableName],
      }
      const url = `${target}${api}`
      const { data } = await axios.get(url, { params })
      return data
    })
  )

  return {
    [assessmentName]: {
      [cycleName]: allDatas.reduce((acc, d) => {
        return RecordAssessmentDatas.mergeRecordTableData(acc, d[assessmentName][cycleName])
      }, {}),
    },
  }
}
const getLocalData = async (countryIso: AreaCode) => {
  const params = {
    ...commonParams,
    countryIso,
    countryISOs: [countryIso],
    tableNames: Object.keys(tables),
  }
  const url = `${source}${api}`
  return axios.get(url, { params })
}

export const getData = async (countryIso: AreaCode) => {
  const prod = await getProdData(countryIso)
  const { data: local } = await getLocalData(countryIso)
  return {
    prod,
    local,
  }
}
