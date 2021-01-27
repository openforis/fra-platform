import * as R from 'ramda'

export const eofReducer = (results: any, row: any, type = 'fra') => [
  ...results,
  {
    odpId: row.odp_id,
    forestArea: row.forest_area,
    otherWoodedLand: row.other_wooded_land_area,
    name: `${row.year}`,
    type: 'odp',
    year: Number(row.year),
    dataSourceMethods: R.path(['data_source_methods', 'methods'], row),
    draft: row.draft,
  },
]

export const focReducer = (results: any, row: any, type = 'fra') => [
  ...results,
  {
    odpId: row.odp_id,
    naturalForestArea: row.natural_forest_area,
    plantationForestArea: row.plantation_forest_area,
    plantationForestIntroducedArea: row.plantation_forest_introduced_area,
    otherPlantedForestArea: row.other_planted_forest_area,
    name: `${row.year}`,
    type: 'odp',
    year: Number(row.year),
    dataSourceMethods: R.path(['data_source_methods', 'methods'], row),
    draft: row.draft,
  },
]

export default {
  eofReducer,
  focReducer,
}
