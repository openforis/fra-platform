create or replace view original_data_point_view as
with c as (
    select o.id,
           o.country_iso,
           o.year,
           o.data_source_methods,
           jsonb_array_elements(o.national_classes) ->> 'name'                               as name,
           (jsonb_array_elements(o.national_classes) ->> 'area')::numeric                    as area,
           (jsonb_array_elements(o.national_classes) ->> 'forestPercent')::numeric           as forest_percent,
           (jsonb_array_elements(o.national_classes) ->> 'forestNaturalPercent')::numeric    as forest_natural_percent,
           (jsonb_array_elements(o.national_classes) ->> 'forestPlantationPercent')::numeric as forest_plantation_percent,
           (jsonb_array_elements(o.national_classes) ->>
            'forestPlantationIntroducedPercent')::numeric                                    as forest_plantation_introduced_percent,
           (jsonb_array_elements(o.national_classes) ->>
            'otherPlantedForestPercent')::numeric                                            as other_planted_forest_percent,
           (jsonb_array_elements(o.national_classes) ->> 'otherWoodedLandPercent')::numeric  as other_wooded_land_percent
    from original_data_point o
    where o.year is not null
)
select c.id,
       c.country_iso,
       c.year,
       c.data_source_methods,
--        c.area::numeric * c.forest_percent::numeric / 100.0
       sum(c.area * c.forest_percent / 100.0)                                    AS forest_area,
       sum(c.area * c.other_wooded_land_percent / 100.0)                         AS other_wooded_land_area,
       sum(c.area * c.forest_percent * c.forest_natural_percent / 10000.0)       AS natural_forest_area,
       sum(c.area * c.forest_percent * c.forest_plantation_percent / 10000.0)    AS plantation_forest_area,
       sum(c.area * c.forest_percent * c.forest_plantation_percent * c.forest_plantation_introduced_percent /
           1000000.0)                                                            AS plantation_forest_introduced_area,
       sum(c.area * c.forest_percent * c.other_planted_forest_percent / 10000.0) AS other_planted_forest_area
from c
group by c.id,
         c.country_iso,
         c.year,
         c.data_source_methods
order by c.country_iso, c.year;


CREATE OR REPLACE VIEW extent_of_forest_view AS
(
WITH extent_of_forest AS (
    SELECT *, row_number() OVER (PARTITION BY country_iso, year) AS row_number
    FROM (
             SELECT n.country_iso,
                    n.year,
                    1                        AS source,
                    n.forest_area,
                    n.other_wooded_land_area AS other_wooded_land
             FROM original_data_point_view n
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
                sum(e.forest_area) FILTER ( WHERE e.year = 2016 ) AS "2016",
                sum(e.forest_area) FILTER ( WHERE e.year = 2017 ) AS "2017",
                sum(e.forest_area) FILTER ( WHERE e.year = 2018 ) AS "2018",
                sum(e.forest_area) FILTER ( WHERE e.year = 2019 ) AS "2019",
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
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2016 ) AS "2016",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2017 ) AS "2017",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2018 ) AS "2018",
                sum(e.other_wooded_land) FILTER ( WHERE e.year = 2019 ) AS "2019",
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
                (c.config #>> '{faoStat,2016,area}')::NUMERIC AS "2016",
                (c.config #>> '{faoStat,2017,area}')::NUMERIC AS "2017",
                (c.config #>> '{faoStat,2018,area}')::NUMERIC AS "2018",
                (c.config #>> '{faoStat,2019,area}')::NUMERIC AS "2019",
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
       f."2015" / NULLIF(t."2016", 0) * 100 AS "2016",
       f."2015" / NULLIF(t."2017", 0) * 100 AS "2017",
       f."2015" / NULLIF(t."2018", 0) * 100 AS "2018",
       f."2015" / NULLIF(t."2019", 0) * 100 AS "2019",
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
       t."2016" - f."2016" - o."2016" AS "2016",
       t."2017" - f."2017" - o."2017" AS "2017",
       t."2018" - f."2018" - o."2018" AS "2018",
       t."2019" - f."2019" - o."2019" AS "2019",
       t."2020" - f."2020" - o."2020" AS "2020"
FROM total_land_area t
         LEFT JOIN forest_area f
                   ON t.country_iso = f.country_iso
         LEFT JOIN other_wooded_land o
                   ON t.country_iso = o.country_iso
ORDER BY 1, 2
    );


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
         FROM original_data_point_view n
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
    );

drop view if exists ndp_view;

alter table if exists odp rename to _legacy_odp;
alter table if exists odp_class rename to _legacy_odp_class;
alter table if exists odp_version rename to _legacy_odp_version;
