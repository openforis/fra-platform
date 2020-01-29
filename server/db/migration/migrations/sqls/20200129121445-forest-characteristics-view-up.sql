DROP VIEW IF EXISTS public.forest_characteristics_view;
CREATE VIEW
  public.forest_characteristics_view AS
  (
    SELECT
      f.country_iso,
      f.year,
      f.natural_forest_area,
      f.plantation_forest_area,
      f.plantation_forest_introduced_area,
      f.other_planted_forest_area
    FROM
      public.foc_fra_values f
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
      n.natural_forest_area,
      n.plantation_forest_area,
      n.plantation_forest_introduced_area,
      n.other_planted_forest_area
    FROM
      public.ndp_view n
    ORDER BY
      1,2
  );
  
