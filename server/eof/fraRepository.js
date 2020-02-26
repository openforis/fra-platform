const db = require('../db/db')
const R = require('ramda')
const camelize = require('camelize')

const existingEofValues = async (countryIso, year) => {
  const result = await db.query(
    `SELECT
       forest_area,
       other_wooded_land,
       forest_area_estimated,
       other_wooded_land_estimated
     FROM eof_fra_values 
     WHERE country_iso = $1 AND year = $2`,
    [countryIso, year]
  )
  const formattedResult = R.map(camelize, result.rows)
  if (formattedResult.length === 0) return null
  return formattedResult[0]
}

module.exports.persistEofValues = async (countryIso, year, values) => {
  const existingValues = await existingEofValues(countryIso, year)
  if (existingValues) {
    // This merge is signifcant when we are generating values,
    // then we are only choosing only some of the rows and should
    // leave the rest as they are
    updateEof(countryIso, year, R.merge(existingValues, values))
  } else {
    insertEof(countryIso, year, values)
  }
}

const insertEof = (countryIso, year, fraValues) =>
  db.query(`INSERT INTO
             eof_fra_values
             (country_iso,
             year,
             forest_area,
             other_wooded_land,
             forest_area_estimated,
             other_wooded_land_estimated)
             VALUES
             ($1, $2, $3, $4, $5, $6)`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated])

const updateEof = (countryIso, year, fraValues) =>
  db.query(`UPDATE
            eof_fra_values
            SET
             forest_area = $3,
             other_wooded_land = $4,
             forest_area_estimated = $5,
             other_wooded_land_estimated = $6
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated])

const existingFocValues = async (countryIso, year) => {
  const result = await db.query(
    `SELECT
       natural_forest_area,
       plantation_forest_area,
       plantation_forest_introduced_area,
       other_planted_forest_area,
       natural_forest_area_estimated,
       plantation_forest_area_estimated,
       plantation_forest_introduced_area_estimated,
       other_planted_forest_area_estimated
     FROM foc_fra_values 
     WHERE country_iso = $1 AND year = $2`,
    [countryIso, year]
  )
  const formattedResult = R.map(camelize, result.rows)
  if (formattedResult.length === 0) return null
  return formattedResult[0]
}

module.exports.persistFocValues = async (countryIso, year, fraValues) => {
  const existingValues = await existingFocValues(countryIso, year)
  if (existingValues) {
    updateFoc(countryIso, year, R.merge(existingValues, fraValues))
  } else {
    insertFoc(countryIso, year, fraValues)
  }
}

const insertFoc = (countryIso, year, fraValues) =>
  db.query(`INSERT INTO
             foc_fra_values
             (
             country_iso,
             year,
             natural_forest_area,
             plantation_forest_area,
             plantation_forest_introduced_area,
             other_planted_forest_area,
             natural_forest_area_estimated,
             plantation_forest_area_estimated,
             plantation_forest_introduced_area_estimated,
             other_planted_forest_area_estimated)
             VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [countryIso,
      year,
      fraValues.naturalForestArea,
      fraValues.plantationForestArea,
      fraValues.plantationForestIntroducedArea,
      fraValues.otherPlantedForestArea,
      fraValues.naturalForestAreaEstimated,
      fraValues.plantationForestAreaEstimated,
      fraValues.plantationForestIntroducedAreaEstimated,
      fraValues.otherPlantedForestAreaEstimated
    ])

const updateFoc = (countryIso, year, fraValues) =>
  db.query(`UPDATE
            foc_fra_values
            SET
             natural_forest_area = $3,
             plantation_forest_area = $4,
             plantation_forest_introduced_area = $5,
             other_planted_forest_area = $6,
             natural_forest_area_estimated = $7,
             plantation_forest_area_estimated = $8,
             plantation_forest_introduced_area_estimated = $9,
             other_planted_forest_area_estimated = $10
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
      year,
      fraValues.naturalForestArea,
      fraValues.plantationForestArea,
      fraValues.plantationForestIntroducedArea,
      fraValues.otherPlantedForestArea,
      fraValues.naturalForestAreaEstimated,
      fraValues.plantationForestAreaEstimated,
      fraValues.plantationForestIntroducedAreaEstimated,
      fraValues.otherPlantedForestAreaEstimated
    ])

const forestAreaReducer = (results, row, type = 'fra') =>
  [
    ...results,
    {
      forestArea: row.forest_area,
      otherWoodedLand: row.other_wooded_land,
      name: row.year + '',
      type: 'fra',
      year: row.year !== null ? Number(row.year) : null,
      forestAreaEstimated: row.forest_area_estimated || false,
      otherWoodedLandEstimated: row.other_wooded_land_estimated || false
    }
  ]

const forestCharacteristicsReducer = (results, row, type = 'fra') =>
  [
    ...results,
    {
      naturalForestArea: row.natural_forest_area,
      plantationForestArea: row.plantation_forest_area,
      plantationForestIntroducedArea: row.plantation_forest_introduced_area,
      otherPlantedForestArea: row.other_planted_forest_area,
      name: row.year + '',
      type: 'fra',
      year: row.year !== null ? Number(row.year) : null,
      naturalForestAreaEstimated: row.natural_forest_area_estimated || false,
      plantationForestAreaEstimated: row.plantation_forest_area_estimated || false,
      plantationForestIntroducedAreaEstimated: row.plantation_forest_introduced_area_estimated || false,
      otherPlantedForestAreaEstimated: row.other_planted_forest_area_estimated || false
    }
  ]

module.exports.readFraForestAreas = (countryIso, schemaName = 'public') => {
  const tableName = `${schemaName}.eof_fra_values`
  return db.query(`
    SELECT
      year,
      forest_area,
      other_wooded_land,
      forest_area_estimated,
      other_wooded_land_estimated
    FROM
      ${tableName} WHERE country_iso = $1`,
    [countryIso]
  ).then((result) => R.reduce(forestAreaReducer, [], result.rows))
}

module.exports.readFraForestCharacteristics = (countryIso, schemaName = 'public') => {
  const tableName = `${schemaName}.foc_fra_values`
  return db.query(
    `SELECT
        year,
        natural_forest_area,
        plantation_forest_area,
        plantation_forest_introduced_area,
        other_planted_forest_area,
        natural_forest_area_estimated,
        plantation_forest_area_estimated,
        plantation_forest_introduced_area_estimated,
        other_planted_forest_area_estimated
      FROM ${tableName}
      WHERE country_iso = $1`,
    [countryIso]
  ).then((result) => R.reduce(forestCharacteristicsReducer, [], result.rows))
}
