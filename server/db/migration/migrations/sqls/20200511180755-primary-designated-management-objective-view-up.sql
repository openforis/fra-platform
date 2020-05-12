DROP VIEW IF EXISTS primary_designated_management_objective_view CASCADE;
CREATE VIEW
    primary_designated_management_objective_view AS
(
SELECT *
FROM primary_designated_management_objective p
WHERE row_name <> 'no_unknown'
UNION
SELECT e.country_iso,
       'no_unknown'                           AS row_name,
       CASE
           WHEN e."1990" IS NULL AND production."1990" IS NULL AND protection."1990" IS NULL AND
                conservation."1990" IS NULL AND social_services."1990" IS NULL AND multiple_use."1990" IS NULL AND
                other."1990" IS NULL THEN NULL
           ELSE coalesce(e."1990", 0) - coalesce(production."1990", 0) - coalesce(protection."1990", 0) -
                coalesce(conservation."1990", 0) - coalesce(social_services."1990", 0) -
                coalesce(multiple_use."1990", 0) -
                coalesce(other."1990", 0) END AS "1990",
       CASE
           WHEN e."2000" IS NULL AND production."2000" IS NULL AND protection."2000" IS NULL AND
                conservation."2000" IS NULL AND social_services."2000" IS NULL AND multiple_use."2000" IS NULL AND
                other."2000" IS NULL THEN NULL
           ELSE coalesce(e."2000", 0) - coalesce(production."2000", 0) - coalesce(protection."2000", 0) -
                coalesce(conservation."2000", 0) - coalesce(social_services."2000", 0) -
                coalesce(multiple_use."2000", 0) -
                coalesce(other."2000", 0) END AS "2000",
       CASE
           WHEN e."2010" IS NULL AND production."2010" IS NULL AND protection."2010" IS NULL AND
                conservation."2010" IS NULL AND social_services."2010" IS NULL AND multiple_use."2010" IS NULL AND
                other."2010" IS NULL THEN NULL
           ELSE coalesce(e."2010", 0) - coalesce(production."2010", 0) - coalesce(protection."2010", 0) -
                coalesce(conservation."2010", 0) - coalesce(social_services."2010", 0) -
                coalesce(multiple_use."2010", 0) -
                coalesce(other."2010", 0) END AS "2010",
       CASE
           WHEN e."2015" IS NULL AND production."2015" IS NULL AND protection."2015" IS NULL AND
                conservation."2015" IS NULL AND social_services."2015" IS NULL AND multiple_use."2015" IS NULL AND
                other."2015" IS NULL THEN NULL
           ELSE coalesce(e."2015", 0) - coalesce(production."2015", 0) - coalesce(protection."2015", 0) -
                coalesce(conservation."2015", 0) - coalesce(social_services."2015", 0) -
                coalesce(multiple_use."2015", 0) -
                coalesce(other."2015", 0) END AS "2015",
       CASE
           WHEN e."2020" IS NULL AND production."2020" IS NULL AND protection."2020" IS NULL AND
                conservation."2020" IS NULL AND social_services."2020" IS NULL AND multiple_use."2020" IS NULL AND
                other."2020" IS NULL THEN NULL
           ELSE coalesce(e."2020", 0) - coalesce(production."2020", 0) - coalesce(protection."2020", 0) -
                coalesce(conservation."2020", 0) - coalesce(social_services."2020", 0) -
                coalesce(multiple_use."2020", 0) -
                coalesce(other."2020", 0) END AS "2020"
FROM extent_of_forest_view e
LEFT JOIN primary_designated_management_objective production
ON e.country_iso = production.country_iso AND production.row_name = 'production'
LEFT JOIN primary_designated_management_objective protection
ON e.country_iso = protection.country_iso AND protection.row_name = 'protection_of_soil_and_water'
LEFT JOIN primary_designated_management_objective conservation
ON e.country_iso = conservation.country_iso AND conservation.row_name = 'conservation_of_biodiversity'
LEFT JOIN primary_designated_management_objective social_services
ON e.country_iso = social_services.country_iso AND social_services.row_name = 'social_services'
LEFT JOIN primary_designated_management_objective multiple_use
ON e.country_iso = multiple_use.country_iso AND production.row_name = 'multiple_use'
LEFT JOIN primary_designated_management_objective other
ON e.country_iso = other.country_iso AND other.row_name = 'other'
WHERE e.row_name = 'forest_area'
ORDER BY 1, 2
    )
;
