import * as R from 'ramda'

export const stateKey = 'descriptions'

const keys = {
  editing: 'editing',
  content: 'content',
}

const getState = R.prop(stateKey)

// === READ
export const getEditing = R.pipe(getState, R.propOr(false, keys.editing))
export const getSection = section =>
  R.pipe(getState, R.prop(section))
export const getSectionName = (section, name) =>
  R.pipe(getSection(section), R.prop(name))
export const getSectionNameContent = (section, name) =>
  R.pipe(getSectionName(section, name), R.prop(keys.content))

// === UPDATE
export const assocEditing = R.assoc(keys.editing)
export const omitEditing = R.omit([keys.editing])
export const assocSectionName = (section, name) => R.assocPath([section, name])
export const assocSectionNameContent = (section, name) => R.assocPath([section, name, keys.content])
