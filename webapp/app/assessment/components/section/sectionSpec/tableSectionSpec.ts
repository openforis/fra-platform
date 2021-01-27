// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

export const KEYS_TABLE_SECTION = {
  tableSpecs: 'tableSpecs',
  titleKey: 'titleKey',
  descriptionKey: 'descriptionKey',
}

// @ts-expect-error ts-migrate(7005) FIXME: Variable 'tableSectionDefault' implicitly has an '... Remove this comment to see the full error message
const tableSectionDefault = {
  [KEYS_TABLE_SECTION.tableSpecs]: [],
  [KEYS_TABLE_SECTION.titleKey]: null,
  [KEYS_TABLE_SECTION.descriptionKey]: null,
}

export const newTableSection = R.mergeDeepRight(tableSectionDefault)
