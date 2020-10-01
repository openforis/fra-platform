
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

INSERT INTO region
VALUES ('EU27', 'eu-27');

INSERT INTO country_region
VALUES ('EU27', 'AUT'),
        ('EU27', 'BEL'),
        ('EU27', 'BGR'),
        ('EU27', 'HRV'),
        ('EU27', 'CYP'),
        ('EU27', 'CZE'),
        ('EU27', 'DNK'),
        ('EU27', 'EST'),
        ('EU27', 'FIN'),
        ('EU27', 'FRA'),
        ('EU27', 'DEU'),
        ('EU27', 'GRC'),
        ('EU27', 'HUN'),
        ('EU27', 'IRL'),
        ('EU27', 'ITA'),
        ('EU27', 'LVA'),
        ('EU27', 'LTU'),
        ('EU27', 'LUX'),
        ('EU27', 'MLT'),
        ('EU27', 'NLD'),
        ('EU27', 'POL'),
        ('EU27', 'PRT'),
        ('EU27', 'ROU'),
        ('EU27', 'SVK'),
        ('EU27', 'SVN'),
        ('EU27', 'ESP'),
        ('EU27', 'SWE');
