export const applyReducerFunction = (actionHandlers: any, state: any, action: any) => {
  const actionHandler = actionHandlers[action.type]

  if (actionHandler) return actionHandler(state, action)

  return state
}

export const exportReducer = (actionHandlers: any) => (state = {}, action: any) =>
  applyReducerFunction(actionHandlers, state, action)
