-- DROP VIEW IF EXISTS forest_characteristics_view CASCADE;
CREATE OR REPLACE VIEW
    forest_characteristics_view AS
(
WITH config AS (
    SELECT c.country_iso,
           CASE
               WHEN (cf.config ->> 'useOriginalDataPointsInFoc')::BOOLEAN = TRUE THEN 1
               ELSE 2
               END
               AS source
    FROM country c
    LEFT JOIN dynamic_country_configuration cf
    ON c.country_iso = cf.country_iso
),
     data AS (
         SELECT n.country_iso,
                n.year,
                CASE WHEN c.source = 1 THEN 1 ELSE 2 END AS source,
                n.natural_forest_area,
                n.plantation_forest_area,
                n.plantation_forest_introduced_area,
                n.other_planted_forest_area
         FROM ndp_view n
         JOIN config c
         ON c.country_iso = n.country_iso
         UNION
         SELECT f.country_iso,
                f.year,
                CASE WHEN c.source = 1 THEN 2 ELSE 1 END AS source,
                f.natural_forest_area,
                f.plantation_forest_area,
                f.plantation_forest_introduced_area,
                f.other_planted_forest_area
         FROM foc_fra_values f
         JOIN config c
         ON c.country_iso = f.country_iso
         ORDER BY 1, 2, 3
     ),
     forest_characteristics AS (
         SELECT d.*, row_number() OVER (PARTITION BY d.country_iso, d.year) AS row_number
         FROM data d
     ),
     natural_forest_area AS (
         SELECT f.country_iso,
                'natural_forest_area'::TEXT                             AS row_name,
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 1990) AS "1990",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2000) AS "2000",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2010) AS "2010",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2015) AS "2015",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2016) AS "2016",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2017) AS "2017",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2018) AS "2018",
                SUM(f.natural_forest_area) FILTER (WHERE f.year = 2019) AS "2019",
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
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2016) AS "2016",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2017) AS "2017",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2018) AS "2018",
                SUM(f.plantation_forest_area) FILTER (WHERE f.year = 2019) AS "2019",
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
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2016) AS "2016",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2017) AS "2017",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2018) AS "2018",
                SUM(f.plantation_forest_introduced_area) FILTER (WHERE f.year = 2019) AS "2019",
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
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2016) AS "2016",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2017) AS "2017",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2018) AS "2018",
                SUM(f.other_planted_forest_area) FILTER (WHERE f.year = 2019) AS "2019",
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
           WHEN o."2016" IS NULL AND p."2016" IS NULL THEN NULL
           ELSE coalesce(o."2016", 0) + coalesce(p."2016", 0) END AS "2016",
       CASE
           WHEN o."2017" IS NULL AND p."2017" IS NULL THEN NULL
           ELSE coalesce(o."2017", 0) + coalesce(p."2017", 0) END AS "2017",
       CASE
           WHEN o."2018" IS NULL AND p."2018" IS NULL THEN NULL
           ELSE coalesce(o."2018", 0) + coalesce(p."2018", 0) END AS "2018",
       CASE
           WHEN o."2019" IS NULL AND p."2019" IS NULL THEN NULL
           ELSE coalesce(o."2019", 0) + coalesce(p."2019", 0) END AS "2019",
       CASE
           WHEN o."2020" IS NULL AND p."2020" IS NULL THEN NULL
           ELSE coalesce(o."2020", 0) + coalesce(p."2020", 0) END AS "2020"
FROM other_planted_forest_area o
LEFT JOIN plantation_forest_area p
ON o.country_iso = p.country_iso
ORDER BY 1
    )
;
