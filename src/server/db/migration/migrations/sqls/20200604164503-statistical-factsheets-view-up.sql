CREATE OR REPLACE VIEW statistical_factsheets_view AS
with x as (select country_iso
           from specific_forest_categories
           where row_name = 'primary_forest'
             and "2020" is not null),
     forest_area as (
         select *
         from extent_of_forest_view
         where country_iso in (select * from x)
           and row_name = 'forest_area'
     ),
     s AS (
         select primary_forest.country_iso
              , 'primary_forest_ratio'                                as row_name
              , NULL::NUMERIC                                         as "1990"
              , NULL::NUMERIC                                         as "2000"
              , NULL::NUMERIC                                         as "2010"
              , NULL::NUMERIC                                         as "2015"
              , primary_forest."2020" / NULLIF(forest_area."2020", 0) as "2020"

         from specific_forest_categories primary_forest
                  join forest_area using (country_iso)
         where country_iso in (select * from x)
           and primary_forest.row_name = 'primary_forest'
         UNION
         SELECT country_iso
              , 'land_area' as row_name
              , null        AS "1990"
              , null        AS "2000"
              , null        AS "2010"
              , "2015"      AS "2015"
              , null        AS "2020"
         FROM extent_of_forest_view
         WHERE row_name = 'total_land_area'
         UNION
         SELECT country_iso,
                row_name,
                "1990"::NUMERIC(100, 2) AS "1990",
                "2000"::NUMERIC(100, 2) AS "2000",
                "2010"::NUMERIC(100, 2) AS "2010",
                "2015"::NUMERIC(100, 2) AS "2015",
                "2020"::NUMERIC(100, 2) AS "2020"
         FROM extent_of_forest_view eof
         WHERE row_name = 'forest_area'
            OR row_name = 'forest_area_percent'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM growing_stock_view gst
         WHERE row_name = 'growing_stock_total'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM carbon_stock_view
         WHERE row_name = 'carbon_stock_total'
            OR row_name = 'carbon_stock_biomass_total'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM forest_characteristics_view
         WHERE row_name = 'natural_forest_area'
            OR row_name = 'plantation_forest_area'
            OR row_name = 'planted_forest'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM specific_forest_categories
         WHERE row_name = 'primary_forest'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM forest_area_within_protected_areas
         WHERE row_name = 'forest_area_within_protected_areas'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                ROUND("2020", 2) AS "2020"
         FROM primary_designated_management_objective_view
         WHERE row_name = 'production'
            OR row_name = 'protection_of_soil_and_water'
            OR row_name = 'conservation_of_biodiversity'
            OR row_name = 'social_services'
            OR row_name = 'multiple_use'
            OR row_name = 'other'
         UNION
         SELECT country_iso,
                row_name,
                ROUND("1990", 2) AS "1990",
                ROUND("2000", 2) AS "2000",
                ROUND("2010", 2) AS "2010",
                ROUND("2015", 2) AS "2015",
                NULL             AS "2020"
         FROM forest_ownership_view
         WHERE row_name = 'private_ownership'
            OR row_name = 'public_ownership'
            OR row_name = 'other_or_unknown'),

     s2 AS (
         SELECT c.country_iso AS level,
                s.row_name,
                s."1990",
                s."2000",
                s."2010",
                s."2015",
                s."2020",
                NULL          AS data_availability
         FROM country c
                  LEFT JOIN s
                            ON s.country_iso = c.country_iso
         UNION
         SELECT level,
                row_name,
                "1990",
                "2000",
                "2010",
                "2015",
                "2020",
                data_availability
         FROM statistical_factsheets_table_agg
         ORDER BY level ASC, row_name)
SELECT *
FROM s2;

