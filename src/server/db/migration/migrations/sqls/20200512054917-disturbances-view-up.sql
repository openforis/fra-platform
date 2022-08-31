DROP VIEW IF EXISTS disturbances_view CASCADE;
CREATE VIEW
    disturbances_view AS
(
SELECT *
FROM disturbances d
UNION
SELECT d.country_iso,
       'total'       AS row_name,
       sum(d."2000") AS "2000",
       sum(d."2001") AS "2001",
       sum(d."2002") AS "2002",
       sum(d."2003") AS "2003",
       sum(d."2004") AS "2004",
       sum(d."2005") AS "2004",
       sum(d."2006") AS "2006",
       sum(d."2007") AS "2007",
       sum(d."2008") AS "2008",
       sum(d."2009") AS "2009",
       sum(d."2010") AS "2010",
       sum(d."2011") AS "2011",
       sum(d."2012") AS "2012",
       sum(d."2013") AS "2013",
       sum(d."2014") AS "2014",
       sum(d."2015") AS "2015",
       sum(d."2016") AS "2016",
       sum(d."2017") AS "2017"
FROM disturbances d
GROUP BY d.country_iso
ORDER BY 1, 2
    )
;
