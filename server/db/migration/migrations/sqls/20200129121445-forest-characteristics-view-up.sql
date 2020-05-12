DROP VIEW IF EXISTS forest_characteristics_view CASCADE;
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
        ORDER BY 1, 2, 3) AS q
),
     natural_forest_area AS (
         SELECT f.country_iso,
                'natural_forest_area'::TEXT                             AS row_name,
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 1990) AS "1990",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2000) AS "2000",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2010) AS "2010",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2015) AS "2015",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2020) AS "2020"
         FROM forest_characteristics f
         WHERE f.row_number = 1
         GROUP BY 1
     ),
     plantation_forest_area AS (
         SELECT f.country_iso,
                'plantation_forest_area'::TEXT                             AS row_name,
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 1990) AS "1990",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2000) AS "2000",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2010) AS "2010",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2015) AS "2015",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2020) AS "2020"
         FROM forest_characteristics f
         WHERE f.row_number = 1
         GROUP BY 1
     ),
     plantation_forest_introduced_area AS (
         SELECT f.country_iso,
                'plantation_forest_introduced_area'::TEXT                             AS row_name,
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 1990) AS "1990",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2000) AS "2000",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2010) AS "2010",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2015) AS "2015",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2020) AS "2020"
         FROM forest_characteristics f
         WHERE f.row_number = 1
         GROUP BY 1
     ),
     other_planted_forest_area AS (
         SELECT f.country_iso,
                'other_planted_forest_area'::TEXT                             AS row_name,
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 1990) AS "1990",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2000) AS "2000",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2010) AS "2010",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2015) AS "2015",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2020) AS "2020"
         FROM forest_characteristics f
         WHERE f.row_number = 1
         GROUP BY 1
     )
SELECT *
FROM natural_forest_area
UNION
SELECT *
FROM plantation_forest_area
UNION
SELECT *
FROM plantation_forest_introduced_area
UNION
SELECT *
FROM other_planted_forest_area
UNION
SELECT o.country_iso,
       'planted_forest'::TEXT                                     AS row_name,
       CASE
           WHEN o."1990" IS NULL AND p."1990" IS NULL THEN NULL
           ELSE coalesce(o."1990", 0) + coalesce(p."1990", 0) END AS "1990",
       CASE
           WHEN o."2000" IS NULL AND p."2000" IS NULL THEN NULL
           ELSE coalesce(o."2000", 0) + coalesce(p."2000", 0) END AS "2000",
       CASE
           WHEN o."2010" IS NULL AND p."2010" IS NULL THEN NULL
           ELSE coalesce(o."2010", 0) + coalesce(p."2010", 0) END AS "2010",
       CASE
           WHEN o."2015" IS NULL AND p."2015" IS NULL THEN NULL
           ELSE coalesce(o."2015", 0) + coalesce(p."2015", 0) END AS "2015",
       CASE
           WHEN o."2020" IS NULL AND p."2020" IS NULL THEN NULL
           ELSE coalesce(o."2020", 0) + coalesce(p."2020", 0) END AS "2020"
FROM other_planted_forest_area o
LEFT JOIN plantation_forest_area p
ON o.country_iso = p.country_iso
ORDER BY 1
    )
;
