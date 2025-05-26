import { ApiEndPoint } from 'meta/api/endpoint'
import { RegionCode } from 'meta/area/regionCode'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { Lang } from 'meta/lang'

interface BiomassCalculatorProps {
  assessmentName: AssessmentName
  cycleName: CycleName
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

interface DataDownloadProps {
  assessmentName: AssessmentName
  cycleName: CycleName
  file: DataDownloadFileName
  ext: 'ods' | 'xlsx'
  language: Lang
}

export enum SdgMetadataFileName {
  Metadata150101 = 'Metadata-15-01-01',
  Metadata150201 = 'Metadata-15-02-01',
}

interface SdgMetadataProps {
  file: SdgMetadataFileName
  language: Lang
}

interface StatisticalFactsheetProps {
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

const getBiomassCalculator = ({ assessmentName, cycleName, domain, language }: BiomassCalculatorProps): string => {
  const fileType = 'BiomassCalculator'
  const lang = _getSupportedLangForFile(fileType, language)
  return ApiEndPoint.Static.file(`${assessmentName}/${cycleName}/biomassStock/BiomassCalculator_${domain}_${lang}.xlsx`)
}

const getDataDownload = ({ assessmentName, cycleName, ext, file, language }: DataDownloadProps): string => {
  const fileType = file
  const lang = _getSupportedLangForFile(fileType, language)
  return ApiEndPoint.Static.file(`${assessmentName}/${cycleName}/dataDownload/${file} ${lang}.${ext}`)
}

// const getPanEuropeanQuestionnaire = ({ language }: { language: Lang }): string => {
//   const fileType = 'panEuropeanQuestionnaire'
//   const lang = _getSupportedLangForFile(fileType, language)
//   return ApiEndPoint.Static.file(`panEuropeanQuestionnaire/panEuropeanQuestionnaire_${lang}.xls`)
// }

const getSdgMetadata = ({ file, language }: SdgMetadataProps): string => {
  const fileType = file
  const lang = _getSupportedLangForFile(fileType, language)
  return ApiEndPoint.Static.file(`sdgMetadata/${file}_${lang}.pdf`)
}

const getStatisticalFactsheet = ({ language, region }: StatisticalFactsheetProps): string => {
  const fileType = 'statisticalFactsheets'
  const lang = _getSupportedLangForFile(fileType, language)
  return ApiEndPoint.Static.file(`statisticalFactsheets/Statistical Factsheets (${region})_${lang}.ods`)
}

const getUserGuide = ({ language }: { language: Lang }): string => {
  const fileType = 'userGuide'
  const lang = _getSupportedLangForFile(fileType, language)
  return ApiEndPoint.Static.file(`userGuide/User Guide FRA Platform_${lang}.pdf`)
}

export const Static = {
  getBiomassCalculator,
  getDataDownload,
  // getPanEuropeanQuestionnaire,
  getSdgMetadata,
  getStatisticalFactsheet,
  getUserGuide,
}
