CREATE TABLE climatic_domain (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"percentOfForestArea2015" numeric,
PRIMARY KEY (country_iso, row_name));
