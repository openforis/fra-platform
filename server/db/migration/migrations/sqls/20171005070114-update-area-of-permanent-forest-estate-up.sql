DROP TABLE area_of_permanent_forest_estate;
CREATE TABLE area_of_permanent_forest_estate (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"applicable" text,
"1990" numeric,
"2000" numeric,
"2010" numeric,
"2015" numeric,
"2020" numeric,
PRIMARY KEY (country_iso, row_name));
