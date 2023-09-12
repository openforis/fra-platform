import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)

  await Promise.all(
    assessment.cycles.map((cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)

      return client.query(`
        CREATE OR REPLACE VIEW ${schemaCycle}.original_data_point_data
        AS
        WITH classes AS (SELECT o.id,
                        o.country_iso,
                        o.year,
                        jsonb_array_elements(
                                CASE
                                    WHEN jsonb_array_length(o.national_classes) = 0 THEN '[
                                      {}
                                    ]'::jsonb
                                    ELSE o.national_classes
                                    END) AS class
                 FROM ${schemaCycle}.original_data_point o),
     country_years AS (SELECT c.country_iso,
                              jsonb_object_keys(c.config -> 'faoStat'::text) AS year
                       FROM country c
                       ORDER BY c.country_iso),
     extentofforest AS (SELECT c.country_iso,
                               cy.year                                                                                                                                        AS col_name,
                               jsonb_build_object('totalLandArea', jsonb_build_object('raw',
                                                                                      jsonb_extract_path(c.config,
                                                                                                         VARIADIC
                                                                                                         ARRAY ['faoStat'::text, cy.year, 'area'::text])::character varying)) AS data
                        FROM country c
                                 LEFT JOIN country_years cy ON c.country_iso::text = cy.country_iso::text),
     raw_values AS (SELECT c.id,
                           c.country_iso,
                           c.year,
                           sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                               100::numeric) AS forest_area,
                           sum(((c.class ->> 'area'::text)::numeric) *
                               ((c.class ->> 'otherWoodedLandPercent'::text)::numeric) /
                               100::numeric) AS other_wooded_land,
                           sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                               100::numeric * ((c.class ->> 'forestNaturalPercent'::text)::numeric) /
                               100::numeric) AS natural_forest_area,
                           sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                               100::numeric * ((c.class ->> 'forestPlantationPercent'::text)::numeric) /
                               100::numeric) AS plantation_forest_area,
                           sum(((c.class ->> 'area'::text)::numeric) * ((c.class ->> 'forestPercent'::text)::numeric) /
                               100::numeric * ((c.class ->> 'otherPlantedForestPercent'::text)::numeric) /
                               100::numeric) AS other_planted_forest_area
                    FROM classes c
                    GROUP BY c.id, c.country_iso, c.year
                    ORDER BY c.id, c.country_iso, c.year),
     raw_values_2 AS (SELECT rv_1.id,
                             rv_1.country_iso,
                             rv_1.year,
                             rv_1.forest_area,
                             rv_1.other_wooded_land,
                             rv_1.natural_forest_area,
                             rv_1.plantation_forest_area,
                             rv_1.other_planted_forest_area,
                             CASE
                                 WHEN rv_1.plantation_forest_area IS NOT NULL OR
                                      rv_1.other_planted_forest_area IS NOT NULL THEN
                                         COALESCE(rv_1.plantation_forest_area, 0::numeric) +
                                         COALESCE(rv_1.other_planted_forest_area, 0::numeric)
                                 ELSE NULL::numeric
                                 END AS planted_forest,
                             CASE
                                 WHEN rv_1.natural_forest_area IS NOT NULL OR rv_1.plantation_forest_area IS NOT NULL OR
                                      rv_1.other_planted_forest_area IS NOT NULL THEN
                                         COALESCE(rv_1.natural_forest_area, 0::numeric) +
                                         COALESCE(rv_1.plantation_forest_area, 0::numeric) +
                                         COALESCE(rv_1.other_planted_forest_area)
                                 ELSE NULL::numeric
                                 END AS total
                      FROM raw_values rv_1),
     total_land_area AS (SELECT node_ext.country_iso,
                                node_ext.table_name,
                                node_ext.variable_name,
                                node_ext.col_name,
                                node_ext.value,
                                node_ext.created_at,
                                node_ext.updated_at
                         FROM ${schemaCycle}.node_ext
                         WHERE node_ext.variable_name::text = 'totalLandArea'::text
                           AND node_ext.table_name::text = 'extentOfForest'::text),
     primary_forest AS (SELECT c.id,
                               c.country_iso,
                               c.year,
                               case
                                   when
                                           jsonb_array_length(jsonb_agg(c.class ->> 'forestNaturalForestOfWhichPrimaryForestPercent')) !=
                                           jsonb_array_length(jsonb_agg(c.class ->>
                                                                        'forestNaturalForestOfWhichPrimaryForestPercent')
                                                              filter ( where c.class ->> 'forestNaturalForestOfWhichPrimaryForestPercent' is not null))
                                       then null
                                   else
                                       sum(((c.class ->> 'area'::text)::numeric) *
                                           ((c.class ->> 'forestPercent'::text)::numeric) /
                                           100::numeric * ((c.class ->> 'forestNaturalPercent'::text)::numeric) /
                                           100::numeric *
                                           ((c.class ->> 'forestNaturalForestOfWhichPrimaryForestPercent'::text)::numeric) /
                                           100::numeric)
                                   end as primary_forest
                        FROM classes c
                        WHERE c.class ->> 'forestNaturalPercent' IS NOT NULL
                          AND (c.class ->> 'forestNaturalPercent')::numeric > 0
                          AND (c.class ->> 'forestPercent')::numeric > 0
                        GROUP BY c.id, c.country_iso, c.year
                        ORDER BY c.id, c.country_iso, c.year),
     introduced_area AS (SELECT c.id,
                                c.country_iso,
                                c.year,
                                case
                                    when
                                            jsonb_array_length(jsonb_agg(c.class ->> 'forestPlantationIntroducedPercent')) !=
                                            jsonb_array_length(jsonb_agg(c.class ->>
                                                                         'forestPlantationIntroducedPercent')
                                                               filter ( where c.class ->> 'forestPlantationIntroducedPercent' is not null))
                                        then null
                                    else
                                        sum(((c.class ->> 'area'::text)::numeric) *
                                            ((c.class ->> 'forestPercent'::text)::numeric) /
                                            100::numeric * ((c.class ->> 'forestPlantationPercent'::text)::numeric) /
                                            100::numeric *
                                            ((c.class ->> 'forestPlantationIntroducedPercent'::text)::numeric) /
                                            100::numeric)
                                    end as plantation_forest_introduced_area
                         FROM classes c
                         WHERE c.class ->> 'forestPlantationPercent' IS NOT NULL
                           AND (c.class ->> 'forestPercent')::numeric > 0
                         GROUP BY c.id, c.country_iso, c.year
                         ORDER BY c.id, c.country_iso, c.year)
SELECT rv.country_iso,
       rv.year,
       rv.forest_area,
       rv.other_wooded_land,
       rv.natural_forest_area,
       rv.plantation_forest_area,
       ia.plantation_forest_introduced_area,
       rv.other_planted_forest_area,
       rv.planted_forest,
       rv.total,
       tla.value ->> 'raw'::text AS total_land_area,
       CASE
           WHEN rv.forest_area IS NOT NULL OR rv.other_wooded_land IS NOT NULL THEN
                   ((tla.value ->> 'raw'::text)::double precision) -
                   COALESCE(rv.forest_area, 0::numeric)::double precision -
                   COALESCE(rv.other_wooded_land, 0::numeric)::double precision
           ELSE NULL::double precision
           END                   AS other_land,
       CASE
           WHEN rv.planted_forest IS NOT NULL OR rv.natural_forest_area IS NOT NULL THEN
                   COALESCE(rv.planted_forest, 0::numeric) + COALESCE(rv.natural_forest_area, 0::numeric)
           ELSE NULL::numeric
           END                   AS total_forest_area,
       pf.primary_forest,
       rv.id
FROM raw_values_2 rv
         LEFT JOIN total_land_area tla
                   ON tla.country_iso::text = rv.country_iso::text AND tla.col_name::text = rv.year::text
         LEFT JOIN primary_forest pf
                   ON pf.country_iso::text = rv.country_iso::text AND pf.year::text = rv.year::text
         LEFT JOIN introduced_area ia
                   ON ia.country_iso::text = rv.country_iso::text AND ia.year::text = rv.year::text;
      `)
    })
  )
}
