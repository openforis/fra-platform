DROP VIEW IF EXISTS forest_area_change_view CASCADE;
CREATE VIEW
    forest_area_change_view AS
(
SELECT *
FROM forest_area_change f
UNION
SELECT f.country_iso                                                     AS country_iso,
       'forest_area_net_change'                                          AS row_name,
       CASE
           WHEN f."1990" IS NULL AND f."2000" IS NULL THEN NULL
           ELSE (coalesce(f."2000", 0) - coalesce(f."1990", 0)) / 10 END AS "1990_2000",
       CASE
           WHEN f."2000" IS NULL AND f."2010" IS NULL THEN NULL
           ELSE (coalesce(f."2010", 0) - coalesce(f."2000", 0)) / 10 END AS "2000_2010",
       CASE
           WHEN f."2010" IS NULL AND f."2015" IS NULL THEN NULL
           ELSE (coalesce(f."2015", 0) - coalesce(f."2010", 0)) / 5 END  AS "2010_2015",
       CASE
           WHEN f."2015" IS NULL AND f."2020" IS NULL THEN NULL
           ELSE (coalesce(f."2020", 0) - coalesce(f."2015", 0)) / 5 END  AS "2015_2020"
FROM extent_of_forest_view f
WHERE f.row_name = 'forest_area'
ORDER BY 1
    )
;
