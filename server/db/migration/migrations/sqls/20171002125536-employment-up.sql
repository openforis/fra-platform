CREATE TABLE employment (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"1990" numeric,
"1990_female" numeric,
"2000" numeric,
"2000_female" numeric,
"2010" numeric,
"2010_female" numeric,
"2015" numeric,
"2015_female" numeric,
PRIMARY KEY (country_iso, row_name));

