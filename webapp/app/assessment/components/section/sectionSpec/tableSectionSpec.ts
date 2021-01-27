import * as R from 'ramda'

export const KEYS_TABLE_SECTION: any = {
  tableSpecs: 'tableSpecs',
  titleKey: 'titleKey',
  descriptionKey: 'descriptionKey',
}

const tableSectionDefault: any = {
  [KEYS_TABLE_SECTION.tableSpecs]: [],
  [KEYS_TABLE_SECTION.titleKey]: null,
  [KEYS_TABLE_SECTION.descriptionKey]: null,
}

export const newTableSection = R.mergeDeepRight(tableSectionDefault)
