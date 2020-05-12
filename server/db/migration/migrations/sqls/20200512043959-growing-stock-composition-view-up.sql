DROP VIEW IF EXISTS growing_stock_composition_view CASCADE;
CREATE VIEW
    growing_stock_composition_view AS
(
SELECT *
FROM growing_stock_composition g
WHERE g.row_name <> 'total_native_placeholder'
UNION
SELECT g.country_iso,
       'total_native' AS row_name,
       NULL           AS scientific_name,
       NULL           AS common_name,
       sum(g."1990")  AS "1990",
       sum(g."2000")  AS "2000",
       sum(g."2010")  AS "2010",
       sum(g."2015")  AS "2015",
       sum(g."2020")  AS "2020"
FROM growing_stock_composition g
WHERE g.row_name LIKE 'native_rank%'
   OR g.row_name = 'remaining_native'
GROUP BY 1
UNION
SELECT g.country_iso,
       'total_remaining' AS row_name,
       NULL              AS scientific_name,
       NULL              AS common_name,
       sum(g."1990")     AS "1990",
       sum(g."2000")     AS "2000",
       sum(g."2010")     AS "2010",
       sum(g."2015")     AS "2015",
       sum(g."2020")     AS "2020"
FROM growing_stock_composition g
WHERE g.row_name LIKE 'introduced_rank%'
   OR g.row_name = 'remaining_introduced_placeholder'
GROUP BY 1
ORDER BY 1, 2
    )
;
