DROP VIEW IF EXISTS content_check_periodic_change_rates_view CASCADE;
CREATE VIEW content_check_periodic_change_rates_view AS
SELECT country_iso
     , CASE
           WHEN row_name = 'forest_area' THEN 'forest_area_annual_net_change'
           WHEN row_name = 'other_wooded_land' THEN 'other_wooded_land_annual_net_change'
    END                       AS row_name
     , ("2000" - "1990") / 10 AS "1990-2000"
     , ("2010" - "2000") / 10 AS "2000-2010"
     , ("2015" - "2010") / 5  AS "2010-2015"
     , ("2016" - "2015")      AS "2015-2016"
     , ("2017" - "2016")      AS "2016-2017"
     , ("2018" - "2017")      AS "2017-2018"
     , ("2019" - "2018")      AS "2018-2019"
     , ("2020" - "2019")      AS "2019-2020"
FROM extent_of_forest_view
WHERE row_name IN ('forest_area', 'other_wooded_land')
UNION ALL
SELECT country_iso
     , CASE
           WHEN row_name = 'forest_area' THEN 'forest_area_annual_net_change_rate'
           WHEN row_name = 'other_wooded_land' THEN 'other_wooded_land_annual_net_change_rate'
    END AS row_name
     , 100 * (1 - POW(
        ("2000" / NULLIF("1990", 0)),
        (1 / (2000 - 1990)))
    )   AS "1990-2000"
     , 100 * (1 - POW(
        ("2010" / NULLIF("2000", 0)),
        (1 / (2010 - 2000)))
    )   AS "2000-2010"
     , 100 * (1 - POW(
        ("2015" / NULLIF("2010", 0)),
        (1 / (2015 - 2010)))
    )   AS "2010-2015"
     , 100 * (1 - POW(
        ("2016" / NULLIF("2015", 0)),
        (1 / (2016 - 2015)))
    )   AS "2015-2016"
     , 100 * (1 - POW(
        ("2017" / NULLIF("2016", 0)),
        (1 / (2017 - 2016)))
    )   AS "2016-2017"
     , 100 * (1 - POW(
        ("2018" / NULLIF("2017", 0)),
        (1 / (2018 - 2017)))
    )   AS "2017-2018"
     , 100 * (1 - POW(
        ("2019" / NULLIF("2018", 0)),
        (1 / (2019 - 2018)))
    )   AS "2018-2019"
     , 100 * (1 - POW(
        ("2020" / NULLIF("2019", 0)),
        (1 / (2020 - 2019)))
    )   AS "2019-2020"
FROM extent_of_forest_view
WHERE row_name IN ('forest_area', 'other_wooded_land')
UNION ALL
SELECT country_iso
     , 'primary_forest_annual_net_change' AS row_name
     , ("2000" - "1990") / 10             AS "1990-2000"
     , ("2010" - "2000") / 10             AS "2000-2010"
     , ("2015" - "2010") / 5              AS "2010-2015"
     , NULL                               AS "2015-2016"
     , NULL                               AS "2016-2017"
     , NULL                               AS "2017-2018"
     , NULL                               AS "2018-2019"
     , NULL                               AS "2019-2020"
FROM specific_forest_categories
WHERE row_name = 'primary_forest'
UNION ALL
SELECT country_iso
     , 'forest_area_annual_net_change_rate' AS row_name
     , 100 * (1 - POW(
        ("2000" / NULLIF("1990", 0)),
        (1 / (2000 - 1990)))
    )                                       AS "1990-2000"
     , 100 * (1 - POW(
        ("2010" / NULLIF("2000", 0)),
        (1 / (2010 - 2000)))
    )                                       AS "2000-2010"
     , 100 * (1 - POW(
        ("2015" / NULLIF("2010", 0)),
        (1 / (2015 - 2010)))
    )                                       AS "2010-2015"
     , NULL                                 AS "2015-2016"
     , NULL                                 AS "2016-2017"
     , NULL                                 AS "2017-2018"
     , NULL                                 AS "2018-2019"
     , NULL                                 AS "2019-2020"
FROM specific_forest_categories
WHERE row_name = 'primary_forest'
UNION ALL
SELECT country_iso
     , CASE
           WHEN row_name = 'natural_forest_area' THEN 'natural_forest_area_annual_net_change'
           WHEN row_name = 'planted_forest' THEN 'planted_forest_annual_net_change'
    END                       AS row_name
     , ("2000" - "1990") / 10 AS "1990-2000"
     , ("2010" - "2000") / 10 AS "2000-2010"
     , ("2015" - "2010") / 5  AS "2010-2015"
     , ("2016" - "2015")      AS "2015-2016"
     , ("2017" - "2016")      AS "2016-2017"
     , ("2018" - "2017")      AS "2017-2018"
     , ("2019" - "2018")      AS "2018-2019"
     , ("2020" - "2019")      AS "2019-2020"
FROM forest_characteristics_view
WHERE row_name IN ('natural_forest_area', 'planted_forest')
UNION ALL
SELECT country_iso
     , CASE
           WHEN row_name = 'natural_forest_area' THEN 'natural_forest_area_annual_net_change_rate'
           WHEN row_name = 'planted_forest' THEN 'planted_forest_annual_net_change_rate'
    END AS row_name
     , 100 * (1 - POW(
        ("2000" / NULLIF("1990", 0)),
        (1 / (2000 - 1990)))
    )   AS "1990-2000"
     , 100 * (1 - POW(
        ("2010" / NULLIF("2000", 0)),
        (1 / (2010 - 2000)))
    )   AS "2000-2010"
     , 100 * (1 - POW(
        ("2015" / NULLIF("2010", 0)),
        (1 / (2015 - 2010)))
    )   AS "2010-2015"
     , 100 * (1 - POW(
        ("2016" / NULLIF("2015", 0)),
        (1 / (2016 - 2015)))
    )   AS "2015-2016"
     , 100 * (1 - POW(
        ("2017" / NULLIF("2016", 0)),
        (1 / (2017 - 2016)))
    )   AS "2016-2017"
     , 100 * (1 - POW(
        ("2018" / NULLIF("2017", 0)),
        (1 / (2018 - 2017)))
    )   AS "2017-2018"
     , 100 * (1 - POW(
        ("2019" / NULLIF("2018", 0)),
        (1 / (2019 - 2018)))
    )   AS "2018-2019"
     , 100 * (1 - POW(
        ("2020" / NULLIF("2019", 0)),
        (1 / (2020 - 2019)))
    )   AS "2019-2020"
FROM forest_characteristics_view
WHERE row_name IN ('natural_forest_area', 'planted_forest');

