const db = require('../db/db')
const R = require('ramda')

const emptyEof = (countryIso, year) =>
  db.query('SELECT id FROM eof_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length === 0)

module.exports.persistEofValues = (countryIso, year, values) =>
  emptyEof(countryIso, year).then(isEmpty =>
    isEmpty
      ? insertEof(countryIso, year, values)
      : updateEof(countryIso, year, values))

const insertEof = (countryIso, year, fraValues) =>
  db.query(`INSERT INTO
             eof_fra_values
             (country_iso, year, forest_area, other_wooded_land, other_land, forest_area_estimated, other_wooded_land_estimated, other_land_estimated,
              other_land_palms, other_land_tree_orchards, other_land_agroforestry, other_land_trees_urban_settings,
              other_land_palms_estimated, other_land_tree_orchards_estimated, other_land_agroforestry_estimated, other_land_trees_urban_settings_estimated)
             VALUES
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.otherLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated,
      fraValues.otherLandEstimated,
      fraValues.otherLandPalms,
      fraValues.otherLandTreeOrchards,
      fraValues.otherLandAgroforestry,
      fraValues.otherLandTreesUrbanSettings,
      fraValues.otherLandPalmsEstimated,
      fraValues.otherLandTreeOrchardsEstimated,
      fraValues.otherLandAgroforestryEstimated,
      fraValues.otherLandTreesUrbanSettingsEstimated])

const updateEof = (countryIso, year, fraValues) =>
  db.query(`UPDATE
            eof_fra_values
            SET
             forest_area = $3,
             other_wooded_land = $4,
             other_land = $5,
             forest_area_estimated = $6,
             other_wooded_land_estimated = $7,
             other_land_estimated = $8,
             other_land_palms = $9,
             other_land_tree_orchards = $10,
             other_land_agroforestry = $11,
             other_land_trees_urban_settings = $12,
             other_land_palms_estimated = $13,
             other_land_tree_orchards_estimated = $14,
             other_land_agroforestry_estimated = $15,
             other_land_trees_urban_settings_estimated = $16
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
      year,
      fraValues.forestArea,
      fraValues.otherWoodedLand,
      fraValues.otherLand,
      fraValues.forestAreaEstimated,
      fraValues.otherWoodedLandEstimated,
      fraValues.otherLandEstimated,
      fraValues.otherLandPalms,
      fraValues.otherLandTreeOrchards,
      fraValues.otherLandAgroforestry,
      fraValues.otherLandTreesUrbanSettings,
      fraValues.otherLandPalmsEstimated,
      fraValues.otherLandTreeOrchardsEstimated,
      fraValues.otherLandAgroforestryEstimated,
      fraValues.otherLandTreesUrbanSettingsEstimated])

const emptyFoc = (countryIso, year) =>
  db.query('SELECT id FROM foc_fra_values WHERE country_iso = $1 and year = $2', [countryIso, year])
    .then(result => result.rows.length === 0)

module.exports.persistFocValues = (countryIso, year, fraValues) =>
  emptyFoc(countryIso, year).then(isEmpty =>
    isEmpty
      ? insertFoc(countryIso, year, fraValues)
      : updateFoc(countryIso, year, fraValues))

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

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: row.forest_area,
    otherWoodedLand: row.other_wooded_land,
    otherLand: row.other_land,
    name: row.year + '',
    type: 'fra',
    year: row.year !== null ? Number(row.year) : null,
    forestAreaEstimated: row.forest_area_estimated || false,
    otherWoodedLandEstimated: row.other_wooded_land_estimated || false,
    otherLandEstimated: row.other_land_estimated || false,
    otherLandPalms: row.other_land_palms,
    otherLandTreeOrchards: row.other_land_tree_orchards,
    otherLandAgroforestry: row.other_land_agroforestry,
    otherLandTreesUrbanSettings: row.other_land_trees_urban_settings,
    otherLandPalmsEstimated: row.other_land_palms_estimated || false,
    otherLandTreeOrchardsEstimated: row.other_land_tree_orchards_estimated || false,
    otherLandAgroforestryEstimated: row.other_land_agroforestry_estimated || false,
    otherLandTreesUrbanSettingsEstimated: row.other_land_trees_urban_settings_estimated || false
  },
  results)

const forestCharacteristicsReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
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
  },
  results)

module.exports.readFraForestAreas = (countryIso) =>
  db.query(`
    SELECT
      year, forest_area, other_wooded_land, other_land,
      forest_area_estimated, other_wooded_land_estimated , other_land_estimated,
      other_land_palms, other_land_tree_orchards, other_land_agroforestry, other_land_trees_urban_settings,
      other_land_palms_estimated, other_land_tree_orchards_estimated, other_land_agroforestry_estimated, other_land_trees_urban_settings_estimated
    FROM
      eof_fra_values WHERE country_iso = $1`,
    [countryIso]
  ).then((result) => R.reduce(forestAreaReducer, {}, result.rows))

module.exports.readFraForestCharacteristics = countryIso =>
  db.query(
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
      FROM foc_fra_values
      WHERE country_iso = $1`,
    [countryIso]
  ).then((result) => R.reduce(forestCharacteristicsReducer, {}, result.rows))
