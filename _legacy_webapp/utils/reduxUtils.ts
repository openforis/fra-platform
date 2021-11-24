export const applyReducerFunction = (actionHandlers: any, state: any, action: any) => {
  const actionHandler = actionHandlers[action.type]

  if (actionHandler) return actionHandler(state, action)

  return state
}

export const exportReducer =
  (actionHandlers: any, initialState: any = {}) =>
  (state = initialState, action: any) =>
    applyReducerFunction(actionHandlers, state, action)
