DROP TABLE biomass_stock_avg, biomass_stock_total;
CREATE TABLE biomass_stock (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"1990" numeric,
"2000" numeric,
"2010" numeric,
"2015" numeric,
"2016" numeric,
"2017" numeric,
"2018" numeric,
"2019" numeric,
"2020" numeric,
PRIMARY KEY (country_iso, row_name));
