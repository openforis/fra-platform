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
     q2 AS (
         SELECT e.country_iso,
                'other_wooded_land'                                   AS row_name,
                SUM(e.other_wooded_land) FILTER (WHERE e.year = 1990) AS "1990",
                SUM(e.other_wooded_land) FILTER (WHERE e.year = 2000) AS "2000",
                SUM(e.other_wooded_land) FILTER (WHERE e.year = 2010) AS "2010",
                SUM(e.other_wooded_land) FILTER (WHERE e.year = 2015) AS "2015",
                SUM(e.other_wooded_land) FILTER (WHERE e.year = 2020) AS "2020"
         FROM extent_of_forest e
         WHERE e.row_number = 1
         GROUP BY e.country_iso
         UNION
         SELECT e.country_iso,
                'forest_area'                                   AS row_name,
                SUM(e.forest_area) FILTER (WHERE e.year = 1990) AS "1990",
                SUM(e.forest_area) FILTER (WHERE e.year = 2000) AS "2000",
                SUM(e.forest_area) FILTER (WHERE e.year = 2010) AS "2010",
                SUM(e.forest_area) FILTER (WHERE e.year = 2015) AS "2015",
                SUM(e.forest_area) FILTER (WHERE e.year = 2020) AS "2020"
         FROM extent_of_forest e
         WHERE e.row_number = 1
         GROUP BY e.country_iso
         UNION
         SELECT e.country_iso,
                'total_land_area'                                AS row_name,
                (c.config #> '{faoStat,1990,area}')::TEXT::FLOAT AS "1990",
                (c.config #> '{faoStat,2000,area}')::TEXT::FLOAT AS "2000",
                (c.config #> '{faoStat,2010,area}')::TEXT::FLOAT AS "2010",
                (c.config #> '{faoStat,2015,area}')::TEXT::FLOAT AS "2015",
                (c.config #> '{faoStat,2020,area}')::TEXT::FLOAT AS "2020"
         FROM extent_of_forest e
         INNER JOIN country c
         ON e.country_iso = c.country_iso
         WHERE e.row_number = 1
         GROUP BY e.country_iso, c.config
         ORDER BY 1, 2
     )
SELECT *
FROM q2
UNION
SELECT q2.country_iso,
       'forest_area_percent'                                                                             AS row_name,
       ROUND((100 * ("1990" / NULLIF((c.config #> '{faoStat,1990,area}')::TEXT::FLOAT, 0)))::NUMERIC, 2) AS "1990",
       ROUND((100 * ("2000" / NULLIF((c.config #> '{faoStat,2000,area}')::TEXT::FLOAT, 0)))::NUMERIC, 2) AS "2000",
       ROUND((100 * ("2010" / NULLIF((c.config #> '{faoStat,2010,area}')::TEXT::FLOAT, 0)))::NUMERIC, 2) AS "2010",
       ROUND((100 * ("2015" / NULLIF((c.config #> '{faoStat,2015,area}')::TEXT::FLOAT, 0)))::NUMERIC, 2) AS "2015",
       ROUND((100 * ("2020" / NULLIF((c.config #> '{faoStat,2020,area}')::TEXT::FLOAT, 0)))::NUMERIC, 2) AS "2020"
FROM q2
INNER JOIN country c
ON q2.country_iso = c.country_iso
WHERE q2.row_name = 'forest_area'
ORDER BY country_iso
    );
