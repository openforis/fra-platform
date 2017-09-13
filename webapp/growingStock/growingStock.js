import * as R from 'ramda'

const getTypeArea = (year, areaFields, type) => R.pipe(
  R.find(v => R.propEq('year', year, v) && R.propEq('type', type, v)),
  R.defaultTo({}),
  R.props(areaFields),
  R.sum
)

const getArea = (fra, year, areaFields) => R.pipe(
  getTypeArea(year, areaFields, 'fra'),
  area => area > 0 ? area : getTypeArea(year, areaFields, 'odp')(fra)
)(fra)

const updateMirrorValue = (fra, year, field, areaFields, type, obj) => {
  const area = getArea(fra, year, areaFields)
  return area > 0
    ? type === 'avg'
      ? R.assoc(field, R.prop(`${field}Avg`, obj) * area)(obj)
      : R.assoc(`${field}Avg`, R.prop(field, obj) / area)(obj)
    : obj
}

const getFieldValue = field => R.pipe(
  R.prop(field),
  R.defaultTo(0)
)

const calculateTotal = (obj, fields) =>
  R.reduce((total, field) => total + getFieldValue(field)(obj), 0, fields)

const updateTotals = (fra, year) => R.pipe(
  obj => R.assoc('plantedForest', calculateTotal(obj, ['plantationForest', 'otherPlantedForest']), obj),
  obj => R.assoc('totalForest', calculateTotal(obj, ['naturallyRegeneratingForest', 'plantationForest', 'otherPlantedForest']), obj),
  R.partial(updateMirrorValue, [fra, year, 'plantedForest', ['plantationForestArea', 'otherPlantedForestArea'], 'total']),
  R.partial(updateMirrorValue, [fra, year, 'totalForest', ['naturalForestArea', 'plantationForestArea', 'otherPlantedForestArea'], 'total'])
)

export const updateGrowingStockValues = (fra, values, countryIso, year, field, areaFields, type, value) => {

  const updatedValue = R.pipe(
    R.find(R.propEq('year', year)),
    R.defaultTo({year}),
    R.assoc(`${field}${type === 'avg' ? 'Avg' : ''}`, Number(value)),
    obj => areaFields
      ? updateMirrorValue(fra, year, field, areaFields, type, obj)
      : obj,
    updateTotals(fra, year)
  )(values)

  const index = R.findIndex(R.propEq('year', year), values)
  const updatedValues = index >= 0
    ? R.update(index, updatedValue, values)
    : R.append(updatedValue, values)

  return updatedValues
}

