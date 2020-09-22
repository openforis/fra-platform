const camelize = require('camelize')
const db = require('../db/db')

const Country = require('../../common/country')

const getExtent = async (countryIso) => {
  if (!Country.Area.isISOCountry(countryIso)) {
    return {}
  }

  const query = `
DROP TABLE IF EXISTS unpivoted_extent_of_forest_view;
DROP TABLE IF EXISTS unpivoted_specific_forest_categories;
DROP TABLE IF EXISTS temp_primary_forest_percent;
DROP TABLE IF EXISTS unpivoted_forest_area_within_protected_areas;
DROP TABLE IF EXISTS temp_protected_forest_and_management_percent;
DROP TABLE IF EXISTS unpivoted_certified_areas;

CREATE TEMP TABLE unpivoted_extent_of_forest_view AS
SELECT country_iso, row_name, year, value
FROM extent_of_forest_view t
   , LATERAL ( VALUES ('1990', t."1990"),
                      ('2000', t."2000"),
                      ('2010', t."2010"),
                      ('2015', t."2015"),
                      ('2016', t."2016"),
                      ('2017', t."2017"),
                      ('2018', t."2018"),
                      ('2019', t."2019"),
                      ('2020', t."2020") ) s(year, value);

-- Primary forest (% of forest)
-- unpivot SPECIFIC FOREST CATEGORIES

CREATE TEMP TABLE unpivoted_specific_forest_categories AS
SELECT country_iso, row_name, year, value
FROM specific_forest_categories t
   , LATERAL ( VALUES ('1990', t."1990"),
                      ('2000', t."2000"),
                      ('2010', t."2010"),
                      ('2015', t."2015"),
                      ('2020', t."2020") ) s(year, value);

CREATE TEMP TABLE temp_primary_forest_percent AS
SELECT country_iso,
       'primary_forest_percent'::TEXT                                   AS row_name,
       year,
       CASE WHEN eof.value = 0 THEN NULL ELSE sfc.value / eof.value END AS value
FROM unpivoted_specific_forest_categories sfc
JOIN unpivoted_extent_of_forest_view eof
USING (country_iso, year)
WHERE eof.row_name = 'forest_area'
  AND sfc.row_name = 'primary_forest';

-- Forest in protected areas (% of forest)
-- unpivot FOREST AREA WITHIN PROTECTED AREAS
CREATE TEMP TABLE unpivoted_forest_area_within_protected_areas AS
SELECT country_iso, row_name, year, value
FROM forest_area_within_protected_areas t
   , LATERAL ( VALUES ('1990', t."1990"),
                      ('2000', t."2000"),
                      ('2010', t."2010"),
                      ('2015', t."2015"),
                      ('2016', t."2016"),
                      ('2017', t."2017"),
                      ('2018', t."2018"),
                      ('2019', t."2019"),
                      ('2020', t."2020") ) s(year, value);

CREATE TEMP TABLE temp_protected_forest_and_management_percent AS
SELECT country_iso,
       CASE
           WHEN fawpa.row_name = 'forest_area_within_protected_areas'
               THEN 'protected_forest_percent'::TEXT
           WHEN fawpa.row_name = 'forest_area_with_long_term_management_plan'
               THEN 'management_plan_percent'::TEXT
           END                                                            AS row_name,
       year,
       CASE WHEN eof.value = 0 THEN NULL ELSE fawpa.value / eof.value END AS value
FROM unpivoted_forest_area_within_protected_areas fawpa
JOIN unpivoted_extent_of_forest_view eof
USING (country_iso, year)
WHERE eof.row_name = 'forest_area'
  AND fawpa.row_name IN ('forest_area_within_protected_areas', 'forest_area_with_long_term_management_plan');

CREATE TEMP TABLE unpivoted_certified_areas AS
WITH certified_areas AS (
    SELECT country_iso
         , 'certified_area'::TEXT                        AS row_name
         , (config #>> '{certifiedAreas,2000}')::NUMERIC AS "2000"
         , (config #>> '{certifiedAreas,2001}')::NUMERIC AS "2001"
         , (config #>> '{certifiedAreas,2002}')::NUMERIC AS "2002"
         , (config #>> '{certifiedAreas,2003}')::NUMERIC AS "2003"
         , (config #>> '{certifiedAreas,2004}')::NUMERIC AS "2004"
         , (config #>> '{certifiedAreas,2005}')::NUMERIC AS "2005"
         , (config #>> '{certifiedAreas,2006}')::NUMERIC AS "2006"
         , (config #>> '{certifiedAreas,2007}')::NUMERIC AS "2007"
         , (config #>> '{certifiedAreas,2008}')::NUMERIC AS "2008"
         , (config #>> '{certifiedAreas,2009}')::NUMERIC AS "2009"
         , (config #>> '{certifiedAreas,2010}')::NUMERIC AS "2010"
         , (config #>> '{certifiedAreas,2011}')::NUMERIC AS "2011"
         , (config #>> '{certifiedAreas,2012}')::NUMERIC AS "2012"
         , (config #>> '{certifiedAreas,2013}')::NUMERIC AS "2013"
         , (config #>> '{certifiedAreas,2014}')::NUMERIC AS "2014"
         , (config #>> '{certifiedAreas,2015}')::NUMERIC AS "2015"
         , (config #>> '{certifiedAreas,2016}')::NUMERIC AS "2016"
         , (config #>> '{certifiedAreas,2017}')::NUMERIC AS "2017"
         , (config #>> '{certifiedAreas,2018}')::NUMERIC AS "2018"
         , (config #>> '{certifiedAreas,2019}')::NUMERIC AS "2019"
         , (config #>> '{certifiedAreas,2020}')::NUMERIC AS "2020"
    FROM country
)
SELECT country_iso, row_name, year, value
FROM certified_areas ca
   , LATERAL ( VALUES ('2000', ca."2000"),
                      ('2001', ca."2001"),
                      ('2002', ca."2002"),
                      ('2003', ca."2003"),
                      ('2004', ca."2004"),
                      ('2005', ca."2005"),
                      ('2006', ca."2006"),
                      ('2007', ca."2007"),
                      ('2008', ca."2008"),
                      ('2009', ca."2009"),
                      ('2010', ca."2010"),
                      ('2011', ca."2011"),
                      ('2012', ca."2012"),
                      ('2013', ca."2013"),
                      ('2014', ca."2014"),
                      ('2015', ca."2015"),
                      ('2016', ca."2016"),
                      ('2017', ca."2017"),
                      ('2018', ca."2018"),
                      ('2019', ca."2019"),
                      ('2020', ca."2020") ) s(year, value);

WITH foo AS (
    SELECT *
    FROM unpivoted_extent_of_forest_view
    WHERE row_name = 'forest_area'
       OR row_name = 'other_wooded_land'
    UNION ALL
    SELECT *
    FROM temp_primary_forest_percent
    UNION ALL
    SELECT *
    FROM temp_protected_forest_and_management_percent
    UNION ALL
    SELECT *
    FROM unpivoted_specific_forest_categories
    WHERE row_name = 'bamboo'
       OR row_name = 'mangroves'
    UNION ALL
    SELECT *
    FROM unpivoted_certified_areas
)
SELECT *
FROM foo
WHERE country_iso = '${countryIso}'
ORDER BY country_iso, year, row_name;

-- Fail safety 101: Delete temporary tables if exist
DROP TABLE IF EXISTS unpivoted_extent_of_forest_view;
DROP TABLE IF EXISTS unpivoted_specific_forest_categories;
DROP TABLE IF EXISTS temp_primary_forest_percent;
DROP TABLE IF EXISTS unpivoted_forest_area_within_protected_areas;
DROP TABLE IF EXISTS temp_protected_forest_and_management_percent;
DROP TABLE IF EXISTS unpivoted_certified_areas;
  `

  const results = await db.query(query)
  const [result] = results.filter((r) => r.rows.length > 0)
  return camelize(result.rows)
}

module.exports = {
  getExtent,
}
