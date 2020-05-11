DROP VIEW IF EXISTS forest_characteristics_view;
CREATE VIEW
    forest_characteristics_view AS
(
WITH forest_characteristics AS (
    SELECT *, row_number() OVER (PARTITION BY country_iso, year) AS row_number
    FROM (
        SELECT n.country_iso,
               n.year,
               1 AS source,
               n.natural_forest_area,
               n.plantation_forest_area,
               n.plantation_forest_introduced_area,
               n.other_planted_forest_area
        FROM ndp_view n
        UNION
        SELECT f.country_iso,
               f.year,
               2 AS source,
               f.natural_forest_area,
               f.plantation_forest_area,
               f.plantation_forest_introduced_area,
               f.other_planted_forest_area
        FROM foc_fra_values f
        ORDER BY 1, 2, 3) AS q),
     forest_characteristics2 AS (
         SELECT fc.country_iso,
                'natural_forest_area'                                     AS row_name,
                SUM(fc.natural_forest_area) FILTER (WHERE fc.year = 1990) AS "1990",
                SUM(fc.natural_forest_area) FILTER (WHERE fc.year = 2000) AS "2000",
                SUM(fc.natural_forest_area) FILTER (WHERE fc.year = 2010) AS "2010",
                SUM(fc.natural_forest_area) FILTER (WHERE fc.year = 2015) AS "2015",
                SUM(fc.natural_forest_area) FILTER (WHERE fc.year = 2020) AS "2020"
         FROM forest_characteristics fc
         WHERE fc.row_number = 1
         GROUP BY fc.country_iso
         UNION
         SELECT fc.country_iso,
                'plantation_forest_area'                                     AS row_name,
                SUM(fc.plantation_forest_area) FILTER (WHERE fc.year = 1990) AS "1990",
                SUM(fc.plantation_forest_area) FILTER (WHERE fc.year = 2000) AS "2000",
                SUM(fc.plantation_forest_area) FILTER (WHERE fc.year = 2010) AS "2010",
                SUM(fc.plantation_forest_area) FILTER (WHERE fc.year = 2015) AS "2015",
                SUM(fc.plantation_forest_area) FILTER (WHERE fc.year = 2020) AS "2020"
         FROM forest_characteristics fc
         WHERE fc.row_number = 1
         GROUP BY fc.country_iso
         UNION
         SELECT fc.country_iso,
                'plantation_forest_introduced_area'                                     AS row_name,
                SUM(fc.plantation_forest_introduced_area) FILTER (WHERE fc.year = 1990) AS "1990",
                SUM(fc.plantation_forest_introduced_area) FILTER (WHERE fc.year = 2000) AS "2000",
                SUM(fc.plantation_forest_introduced_area) FILTER (WHERE fc.year = 2010) AS "2010",
                SUM(fc.plantation_forest_introduced_area) FILTER (WHERE fc.year = 2015) AS "2015",
                SUM(fc.plantation_forest_introduced_area) FILTER (WHERE fc.year = 2020) AS "2020"
         FROM forest_characteristics fc
         WHERE fc.row_number = 1
         GROUP BY fc.country_iso
         UNION
         SELECT fc.country_iso,
                'other_planted_forest_area'                                     AS row_name,
                SUM(fc.other_planted_forest_area) FILTER (WHERE fc.year = 1990) AS "1990",
                SUM(fc.other_planted_forest_area) FILTER (WHERE fc.year = 2000) AS "2000",
                SUM(fc.other_planted_forest_area) FILTER (WHERE fc.year = 2010) AS "2010",
                SUM(fc.other_planted_forest_area) FILTER (WHERE fc.year = 2015) AS "2015",
                SUM(fc.other_planted_forest_area) FILTER (WHERE fc.year = 2020) AS "2020"
         FROM forest_characteristics fc
         WHERE fc.row_number = 1
         GROUP BY fc.country_iso
         ORDER BY 1, 2)
SELECT *
FROM forest_characteristics2
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
FROM forest_characteristics2
GROUP BY 1
ORDER BY 1

    );

