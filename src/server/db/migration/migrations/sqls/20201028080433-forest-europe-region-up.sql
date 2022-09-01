INSERT INTO region
VALUES ('FE', 'forest_europe');

INSERT INTO country_region
SELECT 'FE' AS region_iso
     , country_iso
FROM country
WHERE pan_european;

ALTER TABLE country
    DROP COLUMN pan_european;
