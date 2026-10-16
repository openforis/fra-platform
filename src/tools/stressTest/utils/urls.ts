import { ApiEndPoint } from 'meta/api/endpoint'

import type { CountryIso } from '../../../meta/area/countryIso'
import type { CommentableDescriptionName } from '../../../meta/assessment/descriptionValue'
import { baseUrl, cycleParams } from '../config.ts'

// Full urls for the requests the tests send, built with ApiEndPoint (no hardcoded paths)
export const Urls = {
  login: (): string => `${baseUrl}${ApiEndPoint.Auth.login()}`,

  tableData: (props: { countryIso: CountryIso; sectionName: string; tableName: string }): string => {
    const { countryIso, sectionName, tableName } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Table.tableData()}?${cycleParams(countryIso)}` +
      // mergeOdp=false like UI requests
      `&sectionName=${sectionName}&tableNames[]=${tableName}&countryISOs[]=${countryIso}&mergeOdp=false`
    )
  },

  tableNodes: (props: { countryIso: CountryIso; sectionName: string }): string => {
    const { countryIso, sectionName } = props
    return `${baseUrl}${ApiEndPoint.CycleData.Table.nodes()}?${cycleParams(countryIso)}&sectionName=${sectionName}`
  },

  tableValidations: (props: { countryIso: CountryIso; sectionName: string; tableName: string }): string => {
    const { countryIso, sectionName, tableName } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Validations.tableData()}?${cycleParams(countryIso)}` +
      `&sectionName=${sectionName}&tableNames[]=${tableName}`
    )
  },

  // NDPs are edited through the extentOfForest section
  ndp: (props: { countryIso: CountryIso; year: number }): string => {
    const { countryIso, year } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.NationalDataPoint.one()}?${cycleParams(countryIso)}` +
      `&sectionName=extentOfForest&year=${year}`
    )
  },

  ndpData: (props: { countryIso: CountryIso }): string => {
    const { countryIso } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.NationalDataPoint.originalData()}?${cycleParams(countryIso)}` +
      `&sectionName=extentOfForest`
    )
  },

  ndps: (props: { countryIso: CountryIso }): string => {
    const { countryIso } = props
    return `${baseUrl}${ApiEndPoint.CycleData.NationalDataPoint.many()}?${cycleParams(countryIso)}`
  },

  ndpValidations: (props: { countryIso: CountryIso }): string => {
    const { countryIso } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Validations.nationalDataPoints()}?${cycleParams(countryIso)}` +
      `&sectionName=extentOfForest`
    )
  },

  // Descriptions are edited in the forestAreaChange section
  description: (props: { countryIso: CountryIso; name: CommentableDescriptionName }): string => {
    const { countryIso, name } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Descriptions.many()}?${cycleParams(countryIso)}` +
      `&sectionName=forestAreaChange&name=${name}`
    )
  },

  descriptions: (props: { countryIso: CountryIso }): string => {
    const { countryIso } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Descriptions.many()}?${cycleParams(countryIso)}` +
      `&sectionName=forestAreaChange`
    )
  },

  descriptionValidations: (props: { countryIso: CountryIso }): string => {
    const { countryIso } = props
    return (
      `${baseUrl}${ApiEndPoint.CycleData.Validations.descriptions()}?${cycleParams(countryIso)}` +
      `&sectionName=forestAreaChange`
    )
  },
}
