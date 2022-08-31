ALTER TABLE
  odp_version
ADD COLUMN data_source_references TEXT,
ADD COLUMN data_source_methods JSONB,
ADD COLUMN data_source_years TEXT,
ADD COLUMN data_source_applies_to_variables JSONB,
ADD COLUMN data_source_additional_comments TEXT;
