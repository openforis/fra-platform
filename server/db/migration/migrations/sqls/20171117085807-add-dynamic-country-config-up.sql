CREATE TABLE dynamic_country_configuration (
  country_iso VARCHAR(3) PRIMARY KEY REFERENCES country(country_iso) NOT NULL,
  config JSONB
)
