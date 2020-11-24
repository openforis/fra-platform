CREATE OR REPLACE VIEW
    primary_designated_management_objective_view AS

SELECT country_iso
     , 'no_unknown'            AS row_name
     , e."1990" - total."1990" AS "1990"
     , e."2000" - total."2000" AS "2000"
     , e."2010" - total."2010" AS "2010"
     , e."2015" - total."2015" AS "2015"
     , e."2020" - total."2020" AS "2020"
FROM extent_of_forest_view e
JOIN (SELECT country_iso
           , sum(coalesce("1990", 0)) AS "1990"
           , sum(coalesce("2000", 0)) AS "2000"
           , sum(coalesce("2010", 0)) AS "2010"
           , sum(coalesce("2015", 0)) AS "2015"
           , sum(coalesce("2020", 0)) AS "2020"

      FROM primary_designated_management_objective
      WHERE row_name <> 'no_unknown'
      GROUP BY country_iso) total
USING (country_iso)
WHERE row_name = 'forest_area'
UNION ALL
SELECT *
FROM primary_designated_management_objective
WHERE row_name <> 'no_unknown'
ORDER BY country_iso;
