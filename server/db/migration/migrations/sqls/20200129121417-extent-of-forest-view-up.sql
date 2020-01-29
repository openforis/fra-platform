DROP VIEW IF EXISTS public.extent_of_forest_view;
CREATE VIEW
  public.extent_of_forest_view AS
  (
    SELECT
      f.country_iso,
      f.year,
      f.forest_area,
      f.other_wooded_land
    FROM
      public.eof_fra_values f
    WHERE
      f.year NOT IN
      (
        SELECT
          n.year
        FROM
          public.ndp_view n
        WHERE
          n.country_iso = f.country_iso )
    UNION ALL
    SELECT
      n.country_iso,
      n.year,
      n.forest_area,
      n.other_wooded_land_area AS other_wooded_land
    FROM
      public.ndp_view n
    ORDER BY
      1,2
  );
  