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
    labelKey: 'growingStock.ofWhichPlantationForest',
    subCategory: true
  }, {
    field: 'otherPlantedForest',
    areaFields: ['otherPlantedForestArea'],
    labelKey: 'growingStock.ofWhichOtherPlantedForest',
    subCategory: true
  }, {
    field: 'totalForest',
    areaFields: ['naturalForestArea', 'plantationForestArea', 'otherPlantedForestArea'],
    calculated: true,
    sumFields: ['naturallyRegeneratingForest', 'plantationForest', 'otherPlantedForest'],
    labelKey: 'fraForestCharacteristicsClass.totalForest'
  }, {
    field: 'otherWoodedLand',
    areaFields: ['otherWoodedLand'],
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

const getArea = (areaValues, year, areaFields) => R.pipe(
  getTypeArea(year, areaFields, 'fra'),
  area => area > 0 ? area : getTypeArea(year, areaFields, 'odp')(areaValues)
)(areaValues)

const updateMirrorValue = (areaValues, year, field, type, obj) => {
  const area = getArea(areaValues, year, getAreaFields(field))
  return area >= 0
    ? type === 'avg'
      ? R.assoc(field, R.prop(`${field}Avg`, obj) * area)(obj)
      : R.assoc(`${field}Avg`, area == 0 ? 0 : R.prop(field, obj) / area)(obj)
    : obj
}

const getFieldValue = field => R.pipe(
  R.prop(field),
  R.defaultTo(0)
)

const getSumFields = field => getFields(field, 'sumFields')

const calculateTotal = (obj, field) =>
  R.reduce((total, f) => total + getFieldValue(f)(obj), 0, getSumFields(field))

const updateTotals = (areaValues, year) => R.pipe(
  obj => R.assoc('plantedForest', calculateTotal(obj, 'plantedForest'), obj),
  obj => R.assoc('totalForest', calculateTotal(obj, 'totalForest'), obj),
  R.partial(updateMirrorValue, [areaValues, year, 'plantedForest', 'total']),
  R.partial(updateMirrorValue, [areaValues, year, 'totalForest', 'total'])
)

export const updateGrowingStockValue = (areaValues, growingStockValues, year, field, type, value) => {
  const updatedValue = R.pipe(
    R.find(R.propEq('year', year)),
    R.defaultTo({year}),
    R.assoc(`${field}${type === 'avg' ? 'Avg' : ''}`, R.isEmpty(value) ? null : Number(value)),
    R.partial(updateMirrorValue, [areaValues, year, field, type]),
    updateTotals(areaValues, year)
  )(growingStockValues)

  const index = R.findIndex(R.propEq('year', year), growingStockValues)
  const updatedValues = index >= 0
    ? R.update(index, updatedValue, growingStockValues)
    : R.append(updatedValue, growingStockValues)

  return updatedValues
}

export const updateGrowingStockValues = (areaValues, growingStockValues, data, type, cols, rowIdx, colIdx) => {
  const updatableRows = rows.filter(r => !r.calculated)
  let updatedValues = R.clone(growingStockValues)

  const rowStart = rowIdx > 4
    ? rowIdx - 2
    : rowIdx > 1
      ? rowIdx - 1 : rowIdx

  data.map((r, i) => {
    const item = updatableRows[rowStart + i]
    if (R.isNil(item)) return
    r.map((c, j) => {
      const col = colIdx + j
      if (R.isNil(cols[col])) return
      updatedValues = updateGrowingStockValue(areaValues, updatedValues, cols[col].year, item.field, type, c)
    })
  })

  return updatedValues
}
