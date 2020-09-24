DROP VIEW IF EXISTS forest_characteristics_view CASCADE;
CREATE VIEW
    forest_characteristics_view AS
(
WITH config as (
    select c.country_iso,
           case
               when (cf.config ->> 'useOriginalDataPointsInFoc')::boolean = true then 1
               else 2
               end
               as source
    from country c
             left join dynamic_country_configuration cf
                on c.country_iso = cf.country_iso
),
     data as (
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
         ORDER BY 1, 2, 3
     ),
     forest_characteristics as (
         SELECT d.*
         FROM data d
                  join config c
                       on d.country_iso = c.country_iso
         where d.source = c.source
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
