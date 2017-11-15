ALTER TABLE assessment ADD CONSTRAINT unique_assessment_type_for_country UNIQUE (country_iso, type);
