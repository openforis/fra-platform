DROP VIEW IF EXISTS content_check_forest_growing_stock_biomass_carbon CASCADE;
CREATE VIEW content_check_forest_growing_stock_biomass_carbon AS
(
WITH growing_stock_avg_pivoted AS (
    SELECT country_iso,
           'forest'::TEXT                         AS row_name,
           SUM(forest) FILTER (WHERE year = 1990) AS "1990",
           SUM(forest) FILTER (WHERE year = 2000) AS "2000",
           SUM(forest) FILTER (WHERE year = 2010) AS "2010",
           SUM(forest) FILTER (WHERE year = 2015) AS "2015",
           SUM(forest) FILTER (WHERE year = 2016) AS "2016",
           SUM(forest) FILTER (WHERE year = 2017) AS "2017",
           SUM(forest) FILTER (WHERE year = 2018) AS "2018",
           SUM(forest) FILTER (WHERE year = 2019) AS "2019",
           SUM(forest) FILTER (WHERE year = 2020) AS "2020"
    FROM growing_stock_avg
    GROUP BY country_iso
)
SELECT *
FROM growing_stock_avg_pivoted
UNION ALL
SELECT *
FROM biomass_stock
UNION ALL
SELECT *
FROM carbon_stock
UNION ALL
SELECT b.country_iso
     , 'above_ground_biomass_growing_stock_ratio'::TEXT        AS row_name
     , (b."1990" / NULLIF(g."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (b."2000" / NULLIF(g."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (b."2010" / NULLIF(g."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (b."2015" / NULLIF(g."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (b."2016" / NULLIF(g."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (b."2017" / NULLIF(g."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (b."2018" / NULLIF(g."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (b."2019" / NULLIF(g."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (b."2020" / NULLIF(g."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM growing_stock_avg_pivoted g
JOIN biomass_stock b
USING (country_iso)
WHERE b.row_name = 'forest_above_ground'
  AND g.row_name = 'forest'
UNION ALL
SELECT above.country_iso
     , 'root_shoot_ratio'::TEXT                                        AS row_name
     , (below."1990" / NULLIF(above."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (below."2000" / NULLIF(above."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (below."2010" / NULLIF(above."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (below."2015" / NULLIF(above."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (below."2016" / NULLIF(above."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (below."2017" / NULLIF(above."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (below."2018" / NULLIF(above."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (below."2019" / NULLIF(above."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (below."2020" / NULLIF(above."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM biomass_stock above
JOIN biomass_stock below
USING (country_iso)
WHERE above.row_name = 'forest_above_ground'
  AND below.row_name = 'forest_below_ground'
UNION ALL
SELECT above.country_iso
     , 'dead_living_mass_ratio'::TEXT                                                AS row_name
     , (dead."1990" / NULLIF(above."1990" + below."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (dead."2000" / NULLIF(above."2000" + below."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (dead."2010" / NULLIF(above."2010" + below."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (dead."2015" / NULLIF(above."2015" + below."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (dead."2016" / NULLIF(above."2016" + below."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (dead."2017" / NULLIF(above."2017" + below."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (dead."2018" / NULLIF(above."2018" + below."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (dead."2019" / NULLIF(above."2019" + below."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (dead."2020" / NULLIF(above."2020" + below."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM biomass_stock above
JOIN biomass_stock below
USING (country_iso)
JOIN biomass_stock dead
USING (country_iso)
WHERE above.row_name = 'forest_above_ground'
  AND below.row_name = 'forest_below_ground'
  AND dead.row_name = 'forest_deadwood'
UNION ALL
SELECT forest_above_ground.country_iso
     , 'carbon_biomass_above_ground_ratio'::TEXT                                                          AS row_name
     , (carbon_forest_above_ground."1990" / NULLIF(forest_above_ground."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (carbon_forest_above_ground."2000" / NULLIF(forest_above_ground."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (carbon_forest_above_ground."2010" / NULLIF(forest_above_ground."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (carbon_forest_above_ground."2015" / NULLIF(forest_above_ground."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (carbon_forest_above_ground."2016" / NULLIF(forest_above_ground."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (carbon_forest_above_ground."2017" / NULLIF(forest_above_ground."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (carbon_forest_above_ground."2018" / NULLIF(forest_above_ground."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (carbon_forest_above_ground."2019" / NULLIF(forest_above_ground."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (carbon_forest_above_ground."2020" / NULLIF(forest_above_ground."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM biomass_stock forest_above_ground
JOIN carbon_stock carbon_forest_above_ground
USING (country_iso)
WHERE forest_above_ground.row_name = 'forest_above_ground'
  AND carbon_forest_above_ground.row_name = 'carbon_forest_above_ground'
UNION ALL
SELECT forest_below_ground.country_iso
     , 'carbon_biomass_below_ground_ratio'::TEXT                                                          AS row_name
     , (carbon_forest_below_ground."1990" / NULLIF(forest_below_ground."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (carbon_forest_below_ground."2000" / NULLIF(forest_below_ground."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (carbon_forest_below_ground."2010" / NULLIF(forest_below_ground."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (carbon_forest_below_ground."2015" / NULLIF(forest_below_ground."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (carbon_forest_below_ground."2016" / NULLIF(forest_below_ground."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (carbon_forest_below_ground."2017" / NULLIF(forest_below_ground."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (carbon_forest_below_ground."2018" / NULLIF(forest_below_ground."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (carbon_forest_below_ground."2019" / NULLIF(forest_below_ground."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (carbon_forest_below_ground."2020" / NULLIF(forest_below_ground."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM biomass_stock forest_below_ground
JOIN carbon_stock carbon_forest_below_ground
USING (country_iso)
WHERE forest_below_ground.row_name = 'forest_below_ground'
  AND carbon_forest_below_ground.row_name = 'carbon_forest_below_ground'
UNION ALL
SELECT forest_deadwood.country_iso
     , 'carbon_biomass_deadwood_ratio'::TEXT                                                      AS row_name
     , (carbon_forest_deadwood."1990" / NULLIF(forest_deadwood."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (carbon_forest_deadwood."2000" / NULLIF(forest_deadwood."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (carbon_forest_deadwood."2010" / NULLIF(forest_deadwood."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (carbon_forest_deadwood."2015" / NULLIF(forest_deadwood."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (carbon_forest_deadwood."2016" / NULLIF(forest_deadwood."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (carbon_forest_deadwood."2017" / NULLIF(forest_deadwood."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (carbon_forest_deadwood."2018" / NULLIF(forest_deadwood."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (carbon_forest_deadwood."2019" / NULLIF(forest_deadwood."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (carbon_forest_deadwood."2020" / NULLIF(forest_deadwood."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM biomass_stock forest_deadwood
JOIN carbon_stock carbon_forest_deadwood
USING (country_iso)
WHERE forest_deadwood.row_name = 'forest_deadwood'
  AND carbon_forest_deadwood.row_name = 'carbon_forest_deadwood'

ORDER BY country_iso, row_name
);
