DROP VIEW IF EXISTS content_check_extent_view CASCADE;
CREATE VIEW content_check_extent_view AS

SELECT *
FROM extent_of_forest_view
WHERE row_name = 'forest_area'
   OR row_name = 'other_wooded_land'
UNION ALL
SELECT sfc.country_iso
     , 'primary_forest_percent'::TEXT                              AS row_name
     , (sfc."1990" / NULLIF(eof."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (sfc."2000" / NULLIF(eof."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (sfc."2010" / NULLIF(eof."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (sfc."2015" / NULLIF(eof."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , NULL AS "2016"
     , NULL AS "2017"
     , NULL AS "2018"
     , NULL AS "2019"
     , (sfc."2020" / NULLIF(eof."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM specific_forest_categories sfc
JOIN extent_of_forest_view eof
USING (country_iso)
WHERE eof.row_name = 'forest_area'
  AND sfc.row_name = 'primary_forest'
UNION ALL

SELECT fawpa.country_iso
     , CASE
           WHEN fawpa.row_name = 'forest_area_within_protected_areas'
               THEN 'protected_forest_percent'::TEXT
           WHEN fawpa.row_name = 'forest_area_with_long_term_management_plan'
               THEN 'management_plan_percent'::TEXT
    END                                                              AS row_name
     , (fawpa."1990" / NULLIF(eof."1990", 0) * 100)::NUMERIC(100, 2) AS "1990"
     , (fawpa."2000" / NULLIF(eof."2000", 0) * 100)::NUMERIC(100, 2) AS "2000"
     , (fawpa."2010" / NULLIF(eof."2010", 0) * 100)::NUMERIC(100, 2) AS "2010"
     , (fawpa."2015" / NULLIF(eof."2015", 0) * 100)::NUMERIC(100, 2) AS "2015"
     , (fawpa."2016" / NULLIF(eof."2016", 0) * 100)::NUMERIC(100, 2) AS "2016"
     , (fawpa."2017" / NULLIF(eof."2017", 0) * 100)::NUMERIC(100, 2) AS "2017"
     , (fawpa."2018" / NULLIF(eof."2018", 0) * 100)::NUMERIC(100, 2) AS "2018"
     , (fawpa."2019" / NULLIF(eof."2019", 0) * 100)::NUMERIC(100, 2) AS "2019"
     , (fawpa."2020" / NULLIF(eof."2020", 0) * 100)::NUMERIC(100, 2) AS "2020"
FROM forest_area_within_protected_areas fawpa
JOIN extent_of_forest_view eof
USING (country_iso)
WHERE eof.row_name = 'forest_area'
  AND fawpa.row_name IN ('forest_area_within_protected_areas', 'forest_area_with_long_term_management_plan')
UNION ALL
SELECT country_iso
     , 'certified_area'::TEXT                        AS row_name
     , (config #>> '{certifiedAreas,1990}')::NUMERIC AS "1990"
     , (config #>> '{certifiedAreas,2000}')::NUMERIC AS "2000"
     , (config #>> '{certifiedAreas,2010}')::NUMERIC AS "2010"
     , (config #>> '{certifiedAreas,2015}')::NUMERIC AS "2015"
     , (config #>> '{certifiedAreas,2016}')::NUMERIC AS "2016"
     , (config #>> '{certifiedAreas,2017}')::NUMERIC AS "2017"
     , (config #>> '{certifiedAreas,2018}')::NUMERIC AS "2018"
     , (config #>> '{certifiedAreas,2019}')::NUMERIC AS "2019"
     , (config #>> '{certifiedAreas,2020}')::NUMERIC AS "2020"
FROM country
UNION ALL
SELECT country_iso
     , row_name
     , "1990"
     , "2000"
     , "2010"
     , "2015"
     , NULL AS "2016"
     , NULL AS "2017"
     , NULL AS "2018"
     , NULL AS "2019"
     , "2020"
FROM specific_forest_categories
WHERE row_name = 'bamboo'
   OR row_name = 'mangroves';

