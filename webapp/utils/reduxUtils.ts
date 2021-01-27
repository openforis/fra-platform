export const applyReducerFunction = (actionHandlers, state, action) => {
  const actionHandler = actionHandlers[action.type]

  if (actionHandler)
    return actionHandler(state, action)

  return state
}

export const exportReducer = actionHandlers =>
  (state = {}, action) => applyReducerFunction(actionHandlers, state, action)
