import * as R from 'ramda'
/**
 * @deprecated
 */
export const KEYS_SECTION = {
  sectionName: 'sectionName',
  sectionAnchor: 'sectionAnchor',
  tableSections: 'tableSections',
  showTitle: 'showTitle',
  descriptions: 'descriptions',
  dataExport: 'dataExport',
}
/**
 * @deprecated
 */
export const KEYS_SECTION_DESCRIPTIONS = {
  introductoryText: 'introductoryText',
  nationalData: 'nationalData',
  analysisAndProcessing: 'analysisAndProcessing',
  comments: 'comments',
}
/**
 * @deprecated
 */
export const KEYS_DATA_EXPORT = {
  included: 'included',
}
/**
 * @deprecated
 */
const sectionSpecDefault: any = {
  [KEYS_SECTION.sectionName]: '',
  [KEYS_SECTION.sectionAnchor]: '',
  [KEYS_SECTION.tableSections]: [],
  [KEYS_SECTION.showTitle]: true,
  [KEYS_SECTION.descriptions]: {
    [KEYS_SECTION_DESCRIPTIONS.introductoryText]: false,
    [KEYS_SECTION_DESCRIPTIONS.nationalData]: true,
    [KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: true,
    [KEYS_SECTION_DESCRIPTIONS.comments]: true,
  },
  [KEYS_SECTION.dataExport]: { [KEYS_DATA_EXPORT.included]: true },
}
/**
 * @deprecated
 */
const assocTableSections = (sectionSpec: any) => {
  const tableSections = sectionSpec[KEYS_SECTION.tableSections].map((tableSection: any, idx: any) => ({
    idx,
    ...tableSection,
  }))

  return {
    ...sectionSpec,
    [KEYS_SECTION.tableSections]: tableSections,
  }
}
/**
 * @deprecated
 */
export const newSectionSpec = R.pipe(R.mergeDeepRight(sectionSpecDefault), assocTableSections)
