import * as R from 'ramda'

const updateValue = (data, action) => {
  const {name, value} = action
  const idx = R.findIndex(v => v.name === name && v.type === 'fra', data)
  return R.update(idx, {...value}, data)
}

export const updateValueReducer = (state, action) => {
  const fra = updateValue(state.fra, action)
  const fraNoNDPs = updateValue(state.fraNoNDPs, action)

  return {...state, fra, fraNoNDPs}
}

const updateValues = (data, action) => {
  const newfra = R.map(
    fra => {
      const ni = R.findIndex(
        cd => cd.year === fra.year && fra.type === 'fra',
        R.values(action.columnData)
      )
      return ni === -1
        ? fra
        : R.merge(fra, R.values(action.columnData)[ni])
    },
    data
  )

  return R.pipe(
    R.merge(data),
    R.values
  )(newfra)
}

export const updateValuesReducer = (state, action) => {
  const fra = updateValues(state.fra, action)
  const fraNoNDPs = updateValues(state.fraNoNDPs, action)

  return {...state, fra, fraNoNDPs}
}
