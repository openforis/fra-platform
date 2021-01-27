import * as R from 'ramda'
// @ts-ignore
import * as camelize from 'camelize'

import * as auditRepository from '../audit/auditRepository'
import * as db from '../db/db'

export const readGrowingStock = (countryIso: any, tableName: any) =>
   db.pool.query(
      `
    SELECT
        year,
        naturally_regenerating_forest,
        planted_forest,
        plantation_forest,
        other_planted_forest,
        forest,
        other_wooded_land
    FROM
        ${tableName}
    WHERE
        country_iso = $1
    ORDER BY year`,
      [countryIso]
    )
    .then((result: any) =>
      result.rows.map((row: any) => ({
        year: row.year,
        naturallyRegeneratingForest: row.naturally_regenerating_forest,
        plantedForest: row.planted_forest,
        plantationForest: row.plantation_forest,
        otherPlantedForest: row.other_planted_forest,
        forest: row.forest,
        otherWoodedLand: row.other_wooded_land,
      }))
    )

export const persistBothGrowingStock = async (client: any, user: any, countryIso: any, values: any) => {
  await persistGrowingStock(client, user, countryIso, values.avgTable, 'growing_stock_avg')
  await persistGrowingStock(client, user, countryIso, values.totalTable, 'growing_stock_total')
}

const persistGrowingStock = (client: any, user: any, countryIso: any, values: any, tableName: any) =>
  auditRepository
    .insertAudit(client, user.id, 'persistGrowingStockValues', countryIso, 'growingStock')
    .then(() => client.query(`DELETE FROM ${tableName} WHERE country_iso = $1`, [countryIso]))
    .then(() =>
      Promise.all(
        R.toPairs(values).map(([year, value]: any[]) =>
          client.query(
            `INSERT INTO ${tableName}
         (
              country_iso,
              year,
              naturally_regenerating_forest,
              plantation_forest,
              other_planted_forest,
              other_wooded_land,
              planted_forest,
              forest
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              countryIso,
              year,
              value.naturallyRegeneratingForest,
              value.plantationForest,
              value.otherPlantedForest,
              value.otherWoodedLand,
              value.plantedForest,
              value.forest,
            ]
          )
        )
      )
    )
