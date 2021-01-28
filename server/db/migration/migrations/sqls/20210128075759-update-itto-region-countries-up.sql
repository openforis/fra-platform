INSERT INTO country_region (country_iso, region_code) VALUES
  ('ALB', 'ITTO'),
  ('BGR', 'ITTO'),
  ('CRI', 'ITTO'),
  ('HRV', 'ITTO'),
  ('CYP', 'ITTO'),
  ('CZE', 'ITTO'),
  ('EST', 'ITTO'),
  ('GTM', 'ITTO'),
  ('HUN', 'ITTO'),
  ('LVA', 'ITTO'),
  ('LTU', 'ITTO'),
  ('LUX', 'ITTO'),
  ('MDG', 'ITTO'),
  ('MLI', 'ITTO'),
  ('MLT', 'ITTO'),
  ('MEX', 'ITTO'),
  ('MOZ', 'ITTO'),
  ('POL', 'ITTO'),
  ('PRT', 'ITTO'),
  ('ROU', 'ITTO'),
  ('SVK', 'ITTO'),
  ('VNM', 'ITTO'),
  ('SVN', 'ITTO'),
  ('TTO', 'ITTO');

DELETE FROM country_region WHERE country_iso in
  ('BOL',
  'CAN',
  'EGY',
  'NPL'
  )
 and region_code = 'ITTO';
