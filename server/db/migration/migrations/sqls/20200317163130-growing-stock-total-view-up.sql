DROP VIEW IF EXISTS public.growing_stock_total_view CASCADE;

CREATE VIEW public.growing_stock_total_view AS ( WITH gst_sum AS (
    SELECT country_iso,
           'growing_stock_total'::TEXT                               AS row_name,
           SUM(growing_stock_total) FILTER (WHERE year = 1990) AS "1990",
           SUM(growing_stock_total) FILTER (WHERE year = 2000) AS "2000",
           SUM(growing_stock_total) FILTER (WHERE year = 2010) AS "2010",
           SUM(growing_stock_total) FILTER (WHERE year = 2015) AS "2015",
           SUM(growing_stock_total) FILTER (WHERE year = 2020) AS "2020"
    FROM (SELECT g.country_iso,
                 g.year,
                 sum(COALESCE(g.naturally_regenerating_forest, 0::NUMERIC) + COALESCE(g.plantation_forest, 0::NUMERIC) +
                     COALESCE(g.forest, 0::NUMERIC) + COALESCE(g.other_wooded_land, 0::NUMERIC)) AS growing_stock_total
          FROM growing_stock_total g
          GROUP BY g.country_iso, g.year
          ORDER BY g.country_iso, g.year) AS q
    GROUP BY country_iso
)
SELECT g.*
FROM country c
LEFT JOIN gst_sum g
ON c.country_iso = g.country_iso
ORDER BY g.country_iso );
