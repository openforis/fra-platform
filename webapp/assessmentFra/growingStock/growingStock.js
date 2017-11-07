import * as R from 'ramda'
import { sum, mul, div, eq, greaterThanOrEqualTo } from '../../../common/bignumberUtils'

export const rows = [
  {
    field: 'naturallyRegeneratingForest',
    areaFields: ['naturalForestArea'],
    labelKey: 'growingStock.naturallyRegeneratingForest'
  }, {
    field: 'plantedForest',
    areaFields: ['plantationForestArea', 'otherPlantedForestArea'],
    calculated: true,
    sumFields: ['plantationForest', 'otherPlantedForest'],
    labelKey: 'growingStock.plantedForest'
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
    labelKey: 'growingStock.totalForest'
  }, {
    field: 'otherWoodedLand',
    areaFields: ['otherWoodedLand'],
    labelKey: 'growingStock.otherWoodedLand'
  }
]

const getFields = (field, fieldsProperty) => R.pipe(
  R.find(R.propEq('field', field)),
  R.prop(fieldsProperty)
)(rows)

const getAreaFields = field => getFields(field, 'areaFields')

const getTypeArea = (year, areaFields, type) => R.pipe(
  R.find(v => eq(v.year, year) && R.propEq('type', type, v)),
  R.defaultTo({}),
  R.props(areaFields),
  sum
)

const getArea = (areaValues, year, areaFields) => R.pipe(
  getTypeArea(year, areaFields, 'fra'),
  area => area > 0 ? area : getTypeArea(year, areaFields, 'odp')(areaValues)
)(areaValues)

const updateMirrorValue = (areaValues, year, field, type, obj) => {
  const area = getArea(areaValues, year, getAreaFields(field))
  if (R.isNil(area) || !greaterThanOrEqualTo(area, 0)) return {...obj, [field]: null, [`${field}Avg`]: null}
  return type === 'avg'
    ? R.assoc(field, div(mul(R.prop(`${field}Avg`, obj), area), 1000))(obj)
    : R.assoc(`${field}Avg`, eq(area, 0) ? 0 : div(mul(R.prop(field, obj), 1000), area))(obj)
}

const getFieldValue = field => R.pipe(
  R.prop(field),
  R.defaultTo(0)
)

export const updateGrowingStockValue = (areaValues, growingStockValues, year, field, type, value) => {
  const updatedValue = R.pipe(
    R.find(R.propEq('year', year)),
    R.defaultTo({year}),
    R.assoc(`${field}${type === 'avg' ? 'Avg' : ''}`, R.isEmpty(value) ? null : value),
    R.partial(updateMirrorValue, [areaValues, year, field, type])
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
