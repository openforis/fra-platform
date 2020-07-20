DROP VIEW IF EXISTS public.ndp_view CASCADE;
CREATE VIEW
  ndp_view AS
  (
    SELECT
      o.country_iso,
      v.year,
      v.data_source_methods,
      CASE
        WHEN o.draft_id IS NULL
        THEN FALSE
        ELSE TRUE
      END                                               AS draft,
      SUM(c.area * c.forest_percent / 100.0)                              AS forest_area,
      SUM(c.area * c.other_wooded_land_percent / 100.0)                   AS other_wooded_land_area,
      SUM(c.area * c.forest_percent * c.forest_natural_percent / 10000.0)    AS natural_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent / 10000.0) AS plantation_forest_area,
      SUM(c.area * c.forest_percent * c.forest_plantation_percent * c.forest_plantation_introduced_percent / 1000000.0)      AS plantation_forest_introduced_area,
      SUM(c.area * c.forest_percent * c.other_planted_forest_percent / 10000.0) AS other_planted_forest_area
    FROM
      public.odp o
    LEFT OUTER JOIN
      public.odp_version v
    ON
      v.id =
      CASE
        WHEN o.draft_id IS NULL
        THEN o.actual_id
        ELSE o.draft_id
      END
    LEFT OUTER JOIN
      odp_class c
    ON
      c.odp_version_id = v.id
    WHERE
      v.year IS NOT NULL
    GROUP BY
      1,2,3,4
  );
