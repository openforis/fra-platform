import * as R from 'ramda'

export const rows = [
  {
    field: 'naturallyRegeneratingForest',
    areaFields: ['naturalForestArea'],
    labelKey: 'fraForestCharacteristicsClass.naturallyRegeneratingForest'
  }, {
    field: 'plantedForest',
    areaFields: ['plantationForestArea', 'otherPlantedForestArea'],
    calculated: true,
    sumFields: ['plantationForest', 'otherPlantedForest'],
    labelKey: 'fraForestCharacteristicsClass.plantedForest'
  }, {
    field: 'plantationForest',
    areaFields: ['plantationForestArea'],
    labelKey: 'fraForestCharacteristicsClass.plantationForest'
  }, {
    field: 'otherPlantedForest',
    areaFields: ['otherPlantedForestArea'],
    labelKey: 'fraForestCharacteristicsClass.otherPlantedForest'
  }, {
    field: 'totalForest',
    areaFields: ['naturalForestArea', 'plantationForestArea', 'otherPlantedForestArea'],
    calculated: true,
    sumFields: ['naturallyRegeneratingForest', 'plantationForest', 'otherPlantedForest'],
    labelKey: 'fraForestCharacteristicsClass.totalForest'
  }, {
    field: 'otherWoodedLand',
    labelKey: 'fraClass.otherWoodedLand'
  }
]

const getFields = (field, fieldsProperty) => R.pipe(
  R.find(R.propEq('field', field)),
  R.prop(fieldsProperty)
)(rows)

const getAreaFields = field => getFields(field, 'areaFields')

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

const updateMirrorValue = (fra, year, field, type, obj) => {
  const areaFields = getAreaFields(field)
  if (areaFields) {
    const area = getArea(fra, year, areaFields)
    return area > 0
      ? type === 'avg'
        ? R.assoc(field, R.prop(`${field}Avg`, obj) * area)(obj)
        : R.assoc(`${field}Avg`, R.prop(field, obj) / area)(obj)
      : obj
  }
  return obj
}

const getFieldValue = field => R.pipe(
  R.prop(field),
  R.defaultTo(0)
)

const getSumFields = field => getFields(field, 'sumFields')

const calculateTotal = (obj, field) =>
  R.reduce((total, f) => total + getFieldValue(f)(obj), 0, getSumFields(field))

const updateTotals = (fra, year) => R.pipe(
  obj => R.assoc('plantedForest', calculateTotal(obj, 'plantedForest'), obj),
  obj => R.assoc('totalForest', calculateTotal(obj, 'totalForest'), obj),
  R.partial(updateMirrorValue, [fra, year, 'plantedForest', 'total']),
  R.partial(updateMirrorValue, [fra, year, 'totalForest', 'total'])
)

export const updateGrowingStockValues = (fra, growingStockValues, countryIso, year, field, type, value) => {
  const updatedValue = R.pipe(
    R.find(R.propEq('year', year)),
    R.defaultTo({year}),
    R.assoc(`${field}${type === 'avg' ? 'Avg' : ''}`, Number(value)),
    R.partial(updateMirrorValue, [fra, year, field, type]),
    updateTotals(fra, year)
  )(growingStockValues)

  const index = R.findIndex(R.propEq('year', year), growingStockValues)
  const updatedValues = index >= 0
    ? R.update(index, updatedValue, growingStockValues)
    : R.append(updatedValue, growingStockValues)

  return updatedValues
}
