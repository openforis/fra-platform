import R from 'ramda'

export const updateValueReducer = (state, action) => {
  const idx = R.findIndex( v => v.name === action.name && v.type === 'fra', state.fra)
  return {...state, fra: R.update(idx, {...action.value}, state.fra)}
}

export const updateValuesReducer = (state, action) => {
  const newfra = R.map(fra => {
    const ni = R.findIndex(cd => cd.year === fra.year && fra.type === 'fra')(R.values(action.columnData))
    if (ni === -1) return fra
    return R.merge(fra, R.values(action.columnData)[ni])
  }, state.fra)
  return {...state, fra: R.pipe(R.merge(state.fra), R.values)(newfra)}
}
