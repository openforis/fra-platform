const db = require('../db/db')
const R = require('ramda')
const {toNumberOrNull} = require('../utils/databaseConversions')

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
             natural_forest_primary_area,
             plantation_forest_area,
             platation_forest_introduced_area,
             other_planted_forest_area,
             natural_forest_area_estimated,
             natural_forest_primary_area_estimated,
             plantation_forest_area_estimated,
             platation_forest_introduced_area_estimated,
             other_planted_forest_area_estimated) 
             VALUES 
             ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    [countryIso,
      year,
      fraValues.naturalForestArea,
      fraValues.naturalForestPrimaryArea,
      fraValues.plantationForestArea,
      fraValues.plantationForestIntroducedArea,
      fraValues.otherPlantedForestArea,
      fraValues.naturalForestAreaEstimated,
      fraValues.naturalForestAreaPrimaryEstimated,
      fraValues.plantationForestAreaEstimated,
      fraValues.plantationForestIntroducedAreaEstimated,
      fraValues.otherPlantedForestAreaEstimated
    ])

const updateFoc = (countryIso, year, fraValues) =>
  db.query(`UPDATE 
            foc_fra_values 
            SET 
             natural_forest_area = $3,
             natural_forest_primary_area = $4,
             plantation_forest_area = $5,
             platation_forest_introduced_area = $6,
             other_planted_forest_area = $7,
             natural_forest_area_estimated = $8,
             natural_forest_primary_area_estimated = $9,
             plantation_forest_area_estimated = $10,
             platation_forest_introduced_area_estimated = $11,
             other_planted_forest_area_estimated = $12 
            WHERE country_iso = $1 AND year = $2`,
    [countryIso,
      year,
      fraValues.naturalForestArea,
      fraValues.naturalForestPrimaryArea,
      fraValues.plantationForestArea,
      fraValues.plantationForestIntroducedArea,
      fraValues.otherPlantedForestArea,
      fraValues.naturalForestAreaEstimated,
      fraValues.naturalForestAreaPrimaryEstimated,
      fraValues.plantationForestAreaEstimated,
      fraValues.plantationForestIntroducedAreaEstimated,
      fraValues.otherPlantedForestAreaEstimated
    ])

const forestAreaReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    forestArea: toNumberOrNull(row.forest_area),
    otherWoodedLand: toNumberOrNull(row.other_wooded_land),
    otherLand: toNumberOrNull(row.other_land),
    name: row.year + '',
    type: 'fra',
    year: Number(row.year),
    forestAreaEstimated: row.forest_area_estimated || false,
    otherWoodedLandEstimated: row.other_wooded_land_estimated || false,
    otherLandEstimated: row.other_land_estimated || false,
    otherLandPalms: toNumberOrNull(row.other_land_palms),
    otherLandTreeOrchards: toNumberOrNull(row.other_land_tree_orchards),
    otherLandAgroforestry: toNumberOrNull(row.other_land_agroforestry),
    otherLandTreesUrbanSettings: toNumberOrNull(row.other_land_trees_urban_settings),
    otherLandPalmsEstimated: row.other_land_palms_estimated || false,
    otherLandTreeOrchardsEstimated: row.other_land_tree_orchards_estimated || false,
    otherLandAgroforestryEstimated: row.other_land_agroforestry_estimated || false,
    otherLandTreesUrbanSettingsEstimated: row.other_land_trees_urban_settings_estimated || false
  },
  results)

const forestCharacteristicsReducer = (results, row, type = 'fra') => R.assoc(`fra_${row.year}`,
  {
    naturalForestArea: toNumberOrNull(row.natural_forest_area),
    naturalForestPrimaryArea: toNumberOrNull(row.natural_forest_primary_area),
    plantationForestArea: toNumberOrNull(row.plantation_forest_area),
    plantationForestIntroducedArea: toNumberOrNull(row.platation_forest_introduced_area),
    otherPlantedForestArea: toNumberOrNull(row.other_planted_forest_area),
    otherWoodedLand: toNumberOrNull(row.other_wooded_land),
    name: row.year + '',
    type: 'fra',
    year: Number(row.year),
    naturalForestAreaEstimated: row.natural_forest_area_estimated || false,
    naturalForestAreaPrimaryEstimated: row.natural_forest_primary_area_estimated || false,
    plantationForestAreaEstimated: row.plantation_forest_area_estimated || false,
    plantationForestIntroducedAreaEstimated: row.platation_forest_introduced_area_estimated || false,
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
    `SELECT c.*, f.other_wooded_land 
      FROM foc_fra_values c 
      LEFT OUTER JOIN eof_fra_values f
        ON c.country_iso = f.country_iso
        AND c.year = f.year
      WHERE c.country_iso = $1`,
    [countryIso]
  ).then((result) => R.reduce(forestCharacteristicsReducer, {}, result.rows))

