ALTER TABLE country
    ADD region_iso VARCHAR;

UPDATE country SET region_iso = 'AF' WHERE region = 'africa';
UPDATE country SET region_iso = 'AS' WHERE region = 'asia';
UPDATE country SET region_iso = 'AT' WHERE region = 'atlantis';
UPDATE country SET region_iso = 'EU' WHERE region = 'europe';
UPDATE country SET region_iso = 'OC' WHERE region = 'oceania';
UPDATE country SET region_iso = 'SA' WHERE region = 'south_america';
UPDATE country SET region_iso = 'NA' WHERE region = 'north_and_central_america';
