import * as R from 'ramda'

export const canEditFRA2020Data = state => {
  const assessments = R.path(['country', 'status', 'assessments'], state)
  const userInfo = R.path(['user', 'userInfo'], state)

  return R.path(['fra2020', 'canEditData'], assessments)
}

export const isFRA2020DataEditDisabled = state => {
  return !canEditFRA2020Data(state)
}
