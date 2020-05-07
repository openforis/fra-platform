DROP TABLE IF EXISTS statistical_factisheets_table_agg;

CREATE TABLE statistical_factisheets_table_agg(
    id serial PRIMARY KEY,
    level text NOT NULL,
    row_name text NOT NULL,
    "1990" decimal,
    "2000" decimal,
    "2010" decimal,
    "2015" decimal,
    "2020" decimal,
    data_availability decimal,
    UNIQUE(level, row_name)
);
