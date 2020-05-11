CREATE VIEW statistical_factsheets_view AS
WITH s AS (
    SELECT country_iso,
           CASE
               WHEN (row_name = 'forest_area') THEN 'Forest area (1000 ha)'
               WHEN (row_name = 'forest_area_percent') THEN 'Forest area (% of land area)'
               END
                            AS row_name,
           "1990"::NUMERIC(100, 2) AS "1990",
           "2000"::NUMERIC(100, 2) AS "2000",
           "2010"::NUMERIC(100, 2) AS "2010",
           "2015"::NUMERIC(100, 2) AS "2015",
           "2020"::NUMERIC(100, 2) AS "2020"
    FROM extent_of_forest_view eof
    WHERE row_name = 'forest_area'
       OR row_name = 'forest_area_percent'
    UNION
    SELECT country_iso,
           'Growing stock (million m3)' AS row_name,
           ROUND("1990", 2)             AS "1990",
           ROUND("2000", 2)             AS "2000",
           ROUND("2010", 2)             AS "2010",
           ROUND("2015", 2)             AS "2015",
           ROUND("2020", 2)             AS "2020"
    FROM growing_stock_total_view gst
    WHERE row_name = 'growing_stock_total'
    UNION
    SELECT country_iso,
           CASE
               WHEN (row_name = 'carbon_stock_total') THEN 'Carbon stock in biomass (Gt)'
               WHEN (row_name = 'carbon_stock_biomass_total') THEN 'Total carbon stock (Gt)'
               END          AS row_name,
           ROUND("1990", 2) AS "1990",
           ROUND("2000", 2) AS "2000",
           ROUND("2010", 2) AS "2010",
           ROUND("2015", 2) AS "2015",
           ROUND("2020", 2) AS "2020"
    FROM carbon_stock_view
    WHERE row_name = 'carbon_stock_total'
       OR row_name = 'carbon_stock_biomass_total'
    UNION
    SELECT country_iso,
           CASE
               WHEN (row_name = 'natural_forest_area') THEN 'Naturally regenerating forest (1000 ha)'
               WHEN (row_name = 'plantation_forest_area') THEN 'Planted forest of which plantation forest (1000 ha)'
               WHEN (row_name = 'planted_forest') THEN 'Planted forest (1000 ha)'
               END          AS row_name,
           ROUND("1990", 2) AS "1990",
           ROUND("2000", 2) AS "2000",
           ROUND("2010", 2) AS "2010",
           ROUND("2015", 2) AS "2015",
           ROUND("2020", 2) AS "2020"
    FROM forest_characteristics_view
    WHERE row_name = 'natural_forest_area'
       OR row_name = 'plantation_forest_area'
       OR row_name = 'planted_forest'
    UNION
    SELECT country_iso,
           'Primary forest (1000 ha)' AS row_name,
           ROUND("1990", 2)           AS "1990",
           ROUND("2000", 2)           AS "2000",
           ROUND("2010", 2)           AS "2010",
           ROUND("2015", 2)           AS "2015",
           ROUND("2020", 2)           AS "2020"
    FROM specific_forest_categories
    WHERE row_name = 'primary_forest'
    UNION
    SELECT country_iso,
           'Forest in protected areas (1000 ha)' AS row_name,
           ROUND("1990", 2)                      AS "1990",
           ROUND("2000", 2)                      AS "2000",
           ROUND("2010", 2)                      AS "2010",
           ROUND("2015", 2)                      AS "2015",
           ROUND("2020", 2)                      AS "2020"
    FROM forest_area_within_protected_areas
    WHERE row_name = 'forest_area_within_protected_areas'
    UNION
    SELECT country_iso,
           CASE
               WHEN (row_name = 'production') THEN 'Production (1000 ha)'
               WHEN (row_name = 'protection_of_soil_and_water') THEN 'Protection of soil and water (1000 ha)'
               WHEN (row_name = 'conservation_of_biodiversity') THEN 'Conservation (1000 ha)'
               WHEN (row_name = 'social_services') THEN 'Social services (1000 ha)'
               WHEN (row_name = 'multiple_use') THEN 'Multiple use (1000 ha)'
               WHEN (row_name = 'other') THEN 'Other (1000 ha)'
               END          AS row_name,
           ROUND("1990", 2) AS "1990",
           ROUND("2000", 2) AS "2000",
           ROUND("2010", 2) AS "2010",
           ROUND("2015", 2) AS "2015",
           ROUND("2020", 2) AS "2020"
    FROM primary_designated_management_objective
    WHERE row_name = 'production'
       OR row_name = 'protection_of_soil_and_water'
       OR row_name = 'conservation_of_biodiversity'
       OR row_name = 'social_services'
       OR row_name = 'multiple_use'
       OR row_name = 'other'
    UNION
    SELECT country_iso,
           CASE
               WHEN (row_name = 'private_ownership') THEN 'Private ownership (1000 ha)'
               WHEN (row_name = 'public_ownership') THEN 'Public ownership (1000 ha)'
               WHEN (row_name = 'other_or_unknown') THEN 'Other/unknown ownership (1000 ha)'
               END          AS row_name,
           ROUND("1990", 2) AS "1990",
           ROUND("2000", 2) AS "2000",
           ROUND("2010", 2) AS "2010",
           ROUND("2015", 2) AS "2015",
           NULL             AS "2020"
    FROM forest_ownership
    WHERE row_name = 'private_ownership'
       OR row_name = 'public_ownership'
       OR row_name = 'other_or_unknown'
    GROUP BY country_iso, row_name
    ORDER BY country_iso), s2 as (
SELECT c.list_name_en AS level,
       s.row_name,
       s."1990",
       s."2000",
       s."2010",
       s."2015",
       s."2020",
       NULL           AS data_availability
FROM country c
LEFT JOIN s
ON s.country_iso = c.country_iso
UNION
SELECT level,
       replace(row_name, 'million', '1000'),
       "1990" * 1000,
       "2000" * 1000,
       "2010" * 1000,
       "2015" * 1000,
       "2020" * 1000,
       data_availability
FROM statistical_factisheets_table_agg
WHERE row_name LIKE '% ha)'
UNION
SELECT level,
       replace(row_name, 'billion', 'million'),
       "1990" * 1000,
       "2000" * 1000,
       "2010" * 1000,
       "2015" * 1000,
       "2020" * 1000,
       data_availability
FROM statistical_factisheets_table_agg
WHERE row_name LIKE '%billion m3%'
UNION
SELECT level,
       row_name,
       "1990",
       "2000",
       "2010",
       "2015",
       "2020",
       data_availability
FROM statistical_factisheets_table_agg
WHERE row_name NOT LIKE '% ha)'
  AND row_name NOT LIKE '%billion m3%'
ORDER BY level ASC, row_name)   SELECT * FROM s2
  WHERE row_name = 'Carbon stock in biomass (Gt)'
    OR row_name = 'Conservation (1000 ha)'
    OR row_name = 'Forest area (1000 ha)'
    OR row_name = 'Forest area (% of land area)'
    OR row_name = 'Forest in protected areas (1000 ha)'
    OR row_name = 'Growing stock (million m3)'
    OR row_name = 'Multiple use (1000 ha)'
    OR row_name = 'Naturally regenerating forest (1000 ha)'
    OR row_name = 'Other (1000 ha)'
    OR row_name = 'Other/unknown ownership (1000 ha)'
    OR row_name = 'Planted forest (1000 ha)'
    OR row_name = 'Planted forest of which plantation forest (1000 ha)'
    OR row_name = 'Primary forest (1000 ha)'
    OR row_name = 'Private ownership (1000 ha)'
    OR row_name = 'Production (1000 ha)'
    OR row_name = 'Protection of soil and water (1000 ha)'
    OR row_name = 'Public ownership (1000 ha)'
    OR row_name = 'Social services (1000 ha)'
    OR row_name = 'Total carbon stock (Gt)';

