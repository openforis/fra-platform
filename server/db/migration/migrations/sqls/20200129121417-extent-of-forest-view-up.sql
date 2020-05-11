DROP VIEW IF EXISTS extent_of_forest_view CASCADE;
CREATE VIEW extent_of_forest_view AS
(
WITH extent_of_forest AS (
    SELECT *, row_number() OVER (PARTITION BY country_iso, year) AS row_number
    FROM (
        SELECT n.country_iso,
               n.year,
               1                        AS source,
               n.forest_area,
               n.other_wooded_land_area AS other_wooded_land
        FROM ndp_view n
        UNION
        SELECT f.country_iso,
               f.year,
               2 AS source,
               f.forest_area,
               f.other_wooded_land
        FROM eof_fra_values f
        ORDER BY 1, 2, 3
    ) AS q
),
     forest_area AS (
         SELECT e.country_iso,
                'forest_area'::TEXT                               AS row_name,
                sum(e.forest_area) FILTER ( WHERE e.year = 1990 ) AS "1990",
                sum(e.forest_area) FILTER ( WHERE e.year = 2000 ) AS "2000",
                sum(e.forest_area) FILTER ( WHERE e.year = 2010 ) AS "2010",
                sum(e.forest_area) FILTER ( WHERE e.year = 2015 ) AS "2015",
                sum(e.forest_area) FILTER ( WHERE e.year = 2020 ) AS "2020"
         FROM extent_of_forest e
         WHERE e.row_number = 1
         GROUP BY 1
     ),
     other_wooded_land AS (
         SELECT e.country_iso,
                'other_wooded_land'::TEXT                               AS row_name,
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 1990 ) AS "1990",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2000 ) AS "2000",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2010 ) AS "2010",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2015 ) AS "2015",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2020 ) AS "2020"
         FROM extent_of_forest e
         WHERE e.row_number = 1
         GROUP BY 1
     ),
     total_land_area AS (
         SELECT c.country_iso,
                'total_land_area'::TEXT                       AS row_name,
                (c.config #>> '{faoStat,1990,area}')::NUMERIC AS "1990",
                (c.config #>> '{faoStat,2000,area}')::NUMERIC AS "2000",
                (c.config #>> '{faoStat,2010,area}')::NUMERIC AS "2010",
                (c.config #>> '{faoStat,2015,area}')::NUMERIC AS "2015",
                (c.config #>> '{faoStat,2020,area}')::NUMERIC AS "2020"
         FROM country c
     )
SELECT *
FROM forest_area
UNION
SELECT *
FROM other_wooded_land
UNION
SELECT *
FROM total_land_area
UNION
SELECT t.country_iso,
       'forest_area_percent'::TEXT          AS row_name,
       f."1990" / NULLIF(t."1990", 0) * 100 AS "1990",
       f."2000" / NULLIF(t."2000", 0) * 100 AS "2000",
       f."2010" / NULLIF(t."2010", 0) * 100 AS "2010",
       f."2015" / NULLIF(t."2015", 0) * 100 AS "2015",
       f."2020" / NULLIF(t."2020", 0) * 100 AS "2020"
FROM total_land_area t
LEFT JOIN forest_area f
ON t.country_iso = f.country_iso
UNION
SELECT t.country_iso,
       'other_land'::TEXT             AS row_name,
       t."1990" - f."1990" - o."1990" AS "1990",
       t."2000" - f."2000" - o."2000" AS "2000",
       t."2010" - f."2010" - o."2010" AS "2010",
       t."2015" - f."2015" - o."2015" AS "2015",
       t."2020" - f."2020" - o."2020" AS "2020"
FROM total_land_area t
LEFT JOIN forest_area f
ON t.country_iso = f.country_iso
LEFT JOIN other_wooded_land o
ON t.country_iso = o.country_iso
ORDER BY 1, 2
    )
;
