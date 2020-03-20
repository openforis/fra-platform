DROP VIEW IF EXISTS public.growing_stock_total_view;

CREATE VIEW public.growing_stock_total_view AS ( WITH GST_SUM AS (
SELECT
	GST.ID,
	GST.COUNTRY_ISO ,
	GST."year" ,
	SUM( COALESCE (GST.NATURALLY_REGENERATING_FOREST, 0) + COALESCE(GST.PLANTATION_FOREST, 0 ) + COALESCE(GST.FOREST, 0) + COALESCE(GST.OTHER_WOODED_LAND, 0) ) AS growing_stock_total
FROM
	GROWING_STOCK_TOTAL GST
GROUP BY
	1,
	2
ORDER BY
	1,
	2 )
SELECT
	s.id,
	'growing_stock_total' AS row_name,
	s.country_iso,
	s1.growing_stock_total AS "1990",
	s2.growing_stock_total AS "2000",
	s3.growing_stock_total AS "2010",
	s4.growing_stock_total AS "2015",
	s5.growing_stock_total AS "2020"
FROM
	GST_SUM s
LEFT OUTER JOIN GST_SUM s1 ON
	s1.country_iso = s.country_iso
	AND s1.year = '1990'
LEFT OUTER JOIN GST_SUM s2 ON
	s2.country_iso = s.country_iso
	AND s2.year = '2000'
LEFT OUTER JOIN GST_SUM s3 ON
	s3.country_iso = s.country_iso
	AND s3.year = '2010'
LEFT OUTER JOIN GST_SUM s4 ON
	s4.country_iso = s.country_iso
	AND s4.year = '2015'
LEFT OUTER JOIN GST_SUM s5 ON
	s5.country_iso = s.country_iso
	AND s5.year = '2020' );
