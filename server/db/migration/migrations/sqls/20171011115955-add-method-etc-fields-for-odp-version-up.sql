ALTER TABLE
  odp_version
ADD COLUMN dataSource TEXT,
ADD COLUMN methods JSONB,
ADD COLUMN years TEXT,
ADD COLUMN appliesToVariables JSONB,
ADD COLUMN additionalComments TEXT;
