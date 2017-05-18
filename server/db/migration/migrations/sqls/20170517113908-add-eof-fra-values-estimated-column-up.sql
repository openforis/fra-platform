ALTER TABLE
eof_fra_values ADD COLUMN estimated BOOLEAN;

ALTER TABLE
eof_fra_values ALTER COLUMN estimated SET DEFAULT false;

UPDATE
  eof_fra_values SET estimated = false;