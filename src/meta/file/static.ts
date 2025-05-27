import { ApiEndPoint } from 'meta/api/endpoint'
import { Global } from 'meta/area'
import { AreaCode } from 'meta/area/area'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'

interface BaseParams {
  countryIso?: AreaCode
  assessmentName: AssessmentName
  cycleName: CycleName
}

interface BiomassCalculatorProps extends BaseParams {
  domain: string
  language: Lang
}

export enum DataDownloadFileName {
  ForestExtentCharacteristicsAndChanges = '1 Forest extent characteristics and changes',
  ForestGrowingStockBiomassAndCarbon = '2 Forest growing stock biomass and carbon',
  ForestDesignationAndManagement = '3 Forest designation and management',
  ForestOwnershipAndManagementRights = '4 Forest ownership and management rights',
  PermanentForestEstate = '6 Permanent forest estate',
}

interface DataDownloadProps extends BaseParams {
  file: DataDownloadFileName
  ext: 'ods' | 'xlsx'
  language: Lang
}

export enum SdgMetadataFileName {
  Metadata150101 = 'Metadata-15-01-01',
  Metadata150201 = 'Metadata-15-02-01',
}

interface SdgMetadataProps extends BaseParams {
  file: SdgMetadataFileName
  language: Lang
}

interface StatisticalFactsheetProps extends BaseParams {
  region: RegionCode
  language: Lang
}

const supportedLanguagesMap: Record<string, Array<Lang>> = {
  BiomassCalculator: [Lang.en, Lang.es, Lang.fr, Lang.ru],
  '1_Forest_extent_characteristics_and_changes': [Lang.en],
  '2_Forest_growing_stock_biomass_and_carbon': [Lang.en],
  '3_Forest_designation_and_management': [Lang.en],
  '4_Forest_ownership_and_management_rights': [Lang.en],
  '6_Permanent_forest_estate': [Lang.en],
  panEuropeanQuestionnaire: [Lang.en, Lang.ru],
  'Metadata-15-01-01': [Lang.en],
  'Metadata-15-02-01': [Lang.en],
  statisticalFactsheets: [Lang.en],
  userGuide: [Lang.en, Lang.es, Lang.fr, Lang.ru],
}

const _getSupportedLangForFile = (fileType: string, language: Lang): Lang => {
  const supported = supportedLanguagesMap[fileType] || [Lang.en]
  return supported.includes(language) ? language : Lang.en
}

const appendBaseParams = (url: string, params: BaseParams): string => {
  const { assessmentName, countryIso, cycleName } = params
  const searchParams = new URLSearchParams({
    assessmentName,
    cycleName,
    countryIso: countryIso ?? Global.WO,
  })
  return `${url}?${searchParams.toString()}`
}

const getBiomassCalculator = (props: BiomassCalculatorProps): string => {
  const { assessmentName, countryIso, cycleName, domain, language } = props
  const fileType = 'BiomassCalculator'
  const lang = _getSupportedLangForFile(fileType, language)
  const url = ApiEndPoint.Static.file(
    `${assessmentName}/${cycleName}/biomassStock/BiomassCalculator_${domain}_${lang}.xlsx`
  )
  return appendBaseParams(url, { assessmentName, cycleName, countryIso })
}

const getDataDownload = (props: DataDownloadProps): string => {
  const { assessmentName, countryIso, cycleName, ext, file, language } = props
  const fileType = file
  const lang = _getSupportedLangForFile(fileType, language)
  const url = ApiEndPoint.Static.file(`${assessmentName}/${cycleName}/dataDownload/${file} ${lang}.${ext}`)
  return appendBaseParams(url, { assessmentName, cycleName, countryIso })
}

// const getPanEuropeanQuestionnaire = ({ language }: { language: Lang }): string => {
//   const fileType = 'panEuropeanQuestionnaire'
//   const lang = _getSupportedLangForFile(fileType, language)
//   return ApiEndPoint.Static.file(`panEuropeanQuestionnaire/panEuropeanQuestionnaire_${lang}.xls`)
// }

const getSdgMetadata = ({ assessmentName, countryIso, cycleName, file, language }: SdgMetadataProps): string => {
  const fileType = file
  const lang = _getSupportedLangForFile(fileType, language)
  const url = ApiEndPoint.Static.file(`sdgMetadata/${file}_${lang}.pdf`)
  return appendBaseParams(url, { assessmentName, cycleName, countryIso })
}

const getStatisticalFactsheet = ({
  assessmentName,
  countryIso,
  cycleName,
  language,
  region,
}: StatisticalFactsheetProps): string => {
  const fileType = 'statisticalFactsheets'
  const lang = _getSupportedLangForFile(fileType, language)
  const url = ApiEndPoint.Static.file(
    `${assessmentName}/${cycleName}/statisticalFactsheets/Statistical Factsheets (${region})_${lang}.ods`
  )
  return appendBaseParams(url, { assessmentName, cycleName, countryIso })
}

const getUserGuide = ({ assessmentName, countryIso, cycleName, language }: BaseParams & { language: Lang }): string => {
  const fileType = 'userGuide'
  const lang = _getSupportedLangForFile(fileType, language)
  const url = ApiEndPoint.Static.file(`${assessmentName}/${cycleName}/userGuide/User Guide FRA Platform_${lang}.pdf`)
  return appendBaseParams(url, { assessmentName, cycleName, countryIso })
}

export const Static = {
  getBiomassCalculator,
  getDataDownload,
  // getPanEuropeanQuestionnaire,
  getSdgMetadata,
  getStatisticalFactsheet,
  getUserGuide,
}
