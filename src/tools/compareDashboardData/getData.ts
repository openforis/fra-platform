import axios from 'axios'
import { tables } from 'tools/compareDashboardData/tables'

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

const getProdData = async (countryIso: AreaCode) => {
  const allDatas = await Promise.all(
    Object.keys(tables).map(async (tableName) => {
      const isoCountry = Areas.isISOCountry(countryIso)
      const params = {
        ...commonParams,
        countryIso,
        countryISOs: [countryIso],
        tableNames: isoCountry ? [tableName] : ['value_aggregate'],
        aggregate: !isoCountry,
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
