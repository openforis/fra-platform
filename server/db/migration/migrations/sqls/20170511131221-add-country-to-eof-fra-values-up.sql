ALTER TABLE eof_fra_values
ADD COLUMN country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL;
