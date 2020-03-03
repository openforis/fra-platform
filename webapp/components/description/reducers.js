import * as types from './actions'
import { applyReducerFunction } from '@webapp/utils/reduxUtils'

import * as DescriptionState from '@webapp/components/description/descriptionState'

const actionHandlers = {
  [types.descriptionsFetched]: (state, { section, name, data }) =>
    DescriptionState.assocSectionName(section, name)(data[name])(state),
  [types.descriptionsChangeStart]: (state, { section, name, content }) =>
    DescriptionState.assocSectionNameContent(section, name)(content)(state),
  [types.openEditorStart]: (state, { name }) => DescriptionState.assocEditing(name)(state),
  [types.closeEditorStart]: state => DescriptionState.omitEditing(state)
}

export default (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
