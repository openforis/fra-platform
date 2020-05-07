const camelize = require('camelize')
const db = require('../db/db')

const getStatisticalFactsheetTableAgg = async (schemaName) => {
  const result = await db.query(`
  SELECT
  level,
  row_name,
  "1990",
  "2000",
  "2010",
  "2015",
  "2020",
  data_availability
  FROM
    ${schemaName}.statistical_factisheets_table_agg
  ORDER BY
    level ASC
  `)

  // get all single countries
  const result2 = await db.query(`
  WITH s AS (
    SELECT *
    FROM ${schemaName}.extent_of_forest_view eof
    WHERE row_name = 'forest_area'
    UNION
    SELECT *
    FROM ${schemaName}.growing_stock_total_view gst
    WHERE row_name::TEXT = 'growing_stock_total'
    UNION
    SELECT *
    FROM ${schemaName}.carbon_stock_view
    WHERE row_name = 'carbon_stock_total'
       OR row_name = 'carbon_stock_biomass_total'
    UNION
    SELECT *
    FROM ${schemaName}.forest_characteristics_view
    WHERE row_name = 'natural_forest_area'
       OR row_name = 'plantation_forest_area'
    UNION
    SELECT country_iso,
           'planted_forest'                                               AS row_name,
           SUM("1990") FILTER (WHERE row_name = 'other_planted_forest_area' OR
                                     row_name = 'plantation_forest_area') AS "1990",
           SUM("2000") FILTER (WHERE row_name = 'other_planted_forest_area' OR
                                     row_name = 'plantation_forest_area') AS "2000",
           SUM("2010") FILTER (WHERE row_name = 'other_planted_forest_area' OR
                                     row_name = 'plantation_forest_area') AS "2010",
           SUM("2015") FILTER (WHERE row_name = 'other_planted_forest_area' OR
                                     row_name = 'plantation_forest_area') AS "2015",
           SUM("2020") FILTER (WHERE row_name = 'other_planted_forest_area' OR
                                     row_name = 'plantation_forest_area') AS "2020"
    FROM ${schemaName}.forest_characteristics_view
    GROUP BY 1
    UNION
    SELECT *
    FROM ${schemaName}.specific_forest_categories
    WHERE row_name = 'primary_forest'
    UNION
    SELECT country_iso, row_name, "1990", "2000", "2010", "2015", "2020"
    FROM ${schemaName}.forest_area_within_protected_areas
    WHERE row_name = 'forest_area_within_protected_areas'
    UNION
    SELECT *
    FROM ${schemaName}.primary_designated_management_objective
    WHERE row_name = 'production'
       OR row_name = 'protection_of_soil_and_water'
       OR row_name = 'conservation_of_biodiversity'
       OR row_name = 'social_services'
       OR row_name = 'multiple_use'
       OR row_name = 'other'
    UNION
    SELECT *, NULL AS "2020"
    FROM ${schemaName}.forest_ownership
    WHERE row_name = 'private_ownership'
       OR row_name = 'public_ownership'
       OR row_name = 'other_or_unknown'
    GROUP BY country_iso, row_name
    ORDER BY country_iso)
    SELECT c.list_name_en AS level,
    s.row_name,
    s."1990",
    s."2000",
    s."2010",
    s."2015",
    s."2020",
    null as data_availability
FROM ${schemaName}.country c
LEFT JOIN s
ON s.country_iso = c.country_iso
ORDER BY c.country_iso;
  `)

  return camelize([...result.rows, ...result2.rows])
}

module.exports = {
  getStatisticalFactsheetTableAgg,
}
