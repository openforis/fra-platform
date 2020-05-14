DROP VIEW IF EXISTS forest_ownership_view CASCADE;
CREATE VIEW
    forest_ownership_view AS
(
SELECT *
FROM forest_ownership f
WHERE f.row_name <> 'other_or_unknown'
UNION
SELECT e.country_iso,
       'other_or_unknown'                                                                            AS row_name,
       CASE
           WHEN e."1990" IS NULL AND public."1990" IS NULL AND private."1990" IS NULL THEN NULL
           ELSE coalesce(e."1990", 0) - coalesce(public."1990", 0) - coalesce(private."1990", 0) END AS "1990",
       CASE
           WHEN e."2000" IS NULL AND public."2000" IS NULL AND private."2000" IS NULL THEN NULL
           ELSE coalesce(e."2000", 0) - coalesce(public."2000", 0) - coalesce(private."2000", 0) END AS "2000",
       CASE
           WHEN e."2010" IS NULL AND public."2010" IS NULL AND private."2010" IS NULL THEN NULL
           ELSE coalesce(e."2010", 0) - coalesce(public."2010", 0) - coalesce(private."2010", 0) END AS "2010",
       CASE
           WHEN e."2015" IS NULL AND public."2015" IS NULL AND private."2015" IS NULL THEN NULL
           ELSE coalesce(e."2015", 0) - coalesce(public."2015", 0) - coalesce(private."2015", 0) END AS "2015"
FROM extent_of_forest_view e
LEFT JOIN forest_ownership private
ON e.country_iso = private.country_iso
    AND private.row_name = 'private_ownership'
LEFT JOIN forest_ownership public
ON e.country_iso = public.country_iso
    AND public.row_name = 'public_ownership'
WHERE e.row_name = 'forest_area'
ORDER BY 1, 2
    )
;
