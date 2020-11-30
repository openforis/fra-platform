create table country_aggregate
(
	country_iso VARCHAR not null,
	row_name VARCHAR not null,
	"1990" NUMERIC,
	"2000" NUMERIC,
	"2010" NUMERIC,
	"2015" NUMERIC,
	"2020" NUMERIC,
	constraint country_aggregate_pkey
		primary key (country_iso, row_name)
);

