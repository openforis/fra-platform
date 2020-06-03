CREATE VIEW growing_stock_view AS (
SELECT gst.country_iso,
       'naturally_regenerating_forest'::TEXT                                      AS row_name,
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.naturally_regenerating_forest) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
UNION
SELECT gst.country_iso,
       'plantation_forest'::TEXT                                      AS row_name,
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.plantation_forest) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
UNION
SELECT gst.country_iso,
       'other_planted_forest'::TEXT                                      AS row_name,
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.other_planted_forest) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
UNION
SELECT gst.country_iso,
       'other_wooded_land'::TEXT                                      AS row_name,
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.other_wooded_land) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
UNION
SELECT gst.country_iso,
       'planted_forest'::TEXT                                      AS row_name,
       sum(gst.planted_forest) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.planted_forest) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
UNION
SELECT gst.country_iso,
       'forest'::TEXT                                      AS row_name,
       sum(gst.forest) FILTER (WHERE gst.year = 1990::NUMERIC) AS "1990",
       sum(gst.forest) FILTER (WHERE gst.year = 2000::NUMERIC) AS "2000",
       sum(gst.forest) FILTER (WHERE gst.year = 2010::NUMERIC) AS "2010",
       sum(gst.forest) FILTER (WHERE gst.year = 2015::NUMERIC) AS "2015",
       sum(gst.forest) FILTER (WHERE gst.year = 2016::NUMERIC) AS "2016",
       sum(gst.forest) FILTER (WHERE gst.year = 2017::NUMERIC) AS "2017",
       sum(gst.forest) FILTER (WHERE gst.year = 2018::NUMERIC) AS "2018",
       sum(gst.forest) FILTER (WHERE gst.year = 2019::NUMERIC) AS "2019",
       sum(gst.forest) FILTER (WHERE gst.year = 2020::NUMERIC) AS "2020"
FROM growing_stock_total gst
GROUP BY country_iso
ORDER BY country_iso, row_name
);

