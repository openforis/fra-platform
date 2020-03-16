import * as R from 'ramda'

export const KEYS_SECTION = {
  sectionName: 'sectionName',
  sectionAnchor: 'sectionAnchor',
  tableSections: 'tableSections',
  descriptions: 'descriptions',
}

export const KEYS_SECTION_DESCRIPTIONS = {
  introductoryText: 'introductoryText',
  nationalData: 'nationalData',
  analysisAndProcessing: 'analysisAndProcessing',
  comments: 'comments',
}

const sectionSpecDefault = {
  [KEYS_SECTION.sectionName]: '',
  [KEYS_SECTION.sectionAnchor]: '',
  [KEYS_SECTION.tableSections]: [],
  [KEYS_SECTION.descriptions]: {
    [KEYS_SECTION_DESCRIPTIONS.introductoryText]: false,
    [KEYS_SECTION_DESCRIPTIONS.nationalData]: true,
    [KEYS_SECTION_DESCRIPTIONS.analysisAndProcessing]: true,
    [KEYS_SECTION_DESCRIPTIONS.comments]: true,
  },
}

const assocTableSections = sectionSpec => {
  const tableSections = sectionSpec[KEYS_SECTION.tableSections].map((tableSection, idx) => ({
    idx,
    ...tableSection,
  }))

  return {
    ...sectionSpec,
    [KEYS_SECTION.tableSections]: tableSections,
  }
}

export const newSectionSpec = R.pipe(R.mergeDeepRight(sectionSpecDefault), assocTableSections)
