DROP VIEW IF EXISTS public.growing_stock_total_view CASCADE;

CREATE VIEW public.growing_stock_total_view AS ( WITH gst_sum AS (
  SELECT
    g.country_iso,
    g."year",
    SUM(COALESCE(g.naturally_regenerating_forest, 0) + COALESCE(g.plantation_forest, 0) + COALESCE(g.forest, 0) +
        COALESCE(g.other_wooded_land, 0)) AS growing_stock_total
  FROM
    growing_stock_total g
  GROUP BY 1, 2
  ORDER BY 1, 2
                )
SELECT
  c.country_iso,
  'growing_stock_total'  AS row_name,
  s1.growing_stock_total AS "1990",
  s2.growing_stock_total AS "2000",
  s3.growing_stock_total AS "2010",
  s4.growing_stock_total AS "2015",
  s5.growing_stock_total AS "2020"
FROM
  country c
  LEFT OUTER JOIN gst_sum s1 ON s1.country_iso = c.country_iso AND s1.year = '1990'
  LEFT OUTER JOIN gst_sum s2 ON s2.country_iso = c.country_iso AND s2.year = '2000'
  LEFT OUTER JOIN gst_sum s3 ON s3.country_iso = c.country_iso AND s3.year = '2010'
  LEFT OUTER JOIN gst_sum s4 ON s4.country_iso = c.country_iso AND s4.year = '2015'
  LEFT OUTER JOIN gst_sum s5 ON s5.country_iso = c.country_iso AND s5.year = '2020'
ORDER BY
  1 );
