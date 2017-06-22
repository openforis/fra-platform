ALTER TABLE
eof_descriptions
  DROP COLUMN "data_sources";
ALTER TABLE
eof_descriptions
  DROP COLUMN "national_classification";
ALTER TABLE
eof_descriptions
  DROP COLUMN "original_data";
ALTER TABLE
eof_descriptions
  ADD COLUMN field VARCHAR;
ALTER TABLE
eof_descriptions
  ADD COLUMN description TEXT;
ALTER TABLE
eof_descriptions
  RENAME TO descriptions;
