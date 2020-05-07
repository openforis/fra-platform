DROP VIEW IF EXISTS carbon_stock_view CASCADE;

CREATE VIEW carbon_stock_view AS
(
SELECT country_iso, row_name, "1990", "2000", "2010", "2015", "2020"
FROM carbon_stock c
UNION
SELECT country_iso,
       'carbon_stock_biomass_total'                                       AS row_name,
       SUM("1990") FILTER (WHERE row_name = 'carbon_forest_above_ground' OR
                                 row_name = 'carbon_forest_below_ground') AS "1990",
       SUM("2000") FILTER (WHERE row_name = 'carbon_forest_above_ground' OR
                                 row_name = 'carbon_forest_below_ground') AS "2000",
       SUM("2010") FILTER (WHERE row_name = 'carbon_forest_above_ground' OR
                                 row_name = 'carbon_forest_below_ground') AS "2010",
       SUM("2015") FILTER (WHERE row_name = 'carbon_forest_above_ground' OR
                                 row_name = 'carbon_forest_below_ground') AS "2015",
       SUM("2020") FILTER (WHERE row_name = 'carbon_forest_above_ground' OR
                                 row_name = 'carbon_forest_below_ground') AS "2020"
FROM carbon_stock
GROUP BY 1
UNION
SELECT country_iso,
       'carbon_stock_total' AS row_name,
       SUM("1990")          AS "1990",
       SUM("2000")          AS "2000",
       SUM("2010")          AS "2010",
       SUM("2015")          AS "2015",
       SUM("2020")          AS "2020"
FROM carbon_stock
GROUP BY 1
ORDER BY 1
    );
