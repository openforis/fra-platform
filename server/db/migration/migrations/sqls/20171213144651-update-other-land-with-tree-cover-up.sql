DROP TABLE other_land_with_tree_cover;
CREATE TABLE other_land_with_tree_cover (
"country_iso" varchar(3) REFERENCES country(country_iso) NOT NULL,
"row_name" text,
"1990" numeric,
"2000" numeric,
"2010" numeric,
"2015" numeric,
"2020" numeric,
PRIMARY KEY (country_iso, row_name));
