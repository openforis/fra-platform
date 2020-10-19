DROP TABLE IF EXISTS region
DROP TABLE IF EXISTS country_region

CREATE TABLE region
(
    region_code TEXT PRIMARY KEY,
    name       TEXT
);

INSERT INTO region
VALUES ('AS', 'asia'),
 ('EU', 'europe'),
 ('NA', 'north_and_central_america'),
 ('OC', 'oceania'),
 ('AT', 'atlantis'),
 ('AF', 'africa'),
 ('SA', 'south_america');

CREATE TABLE country_region
(
    region_code  TEXT REFERENCES region (region_code),
    country_iso TEXT REFERENCES country (country_iso),
    PRIMARY KEY (region_code, country_iso)
);

INSERT INTO country_region SELECT region_iso, country_iso FROM country;
