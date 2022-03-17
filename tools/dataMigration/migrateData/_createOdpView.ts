import { Assessment } from '../../../meta/assessment/assessment'

import { DBNames } from '../_DBNames'

export const getCreateODPViewDDL = (props: { assessment: Assessment }): string => {
  const { assessment } = props

  const schemaCycle = DBNames.getCycleSchema(assessment.props.name, assessment.cycles[0].name)

  const query = `
  create or replace view ${schemaCycle}.original_data_point_data as
  with classes as (
      select o.country_iso, o.year, jsonb_array_elements(o.national_classes) as class
      from ${schemaCycle}.original_data_point o
  )
  select c.country_iso,
         c.year,
  --        c.class ->> 'area'                                                     as area,
         sum((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) as forest,
         sum((c.class ->> 'area')::numeric *
             (c.class ->> 'otherWoodedLandPercent')::numeric / 100)                        as other_wooded_land,
  --        sum((c.class ->> 'area')::numeric *
  --            (
  --                    100 - coalesce(c.class ->> 'forestPercent', '0')::numeric -
  --                    coalesce(c.class ->> 'otherWoodedLandPercent', '0')::numeric
  --                ) / 100)                                                                  as other_land
         sum(
                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                         (c.class ->> 'forestNaturalPercent')::numeric / 100
             )                                                                             as natural_forest_area,
         sum(
                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                         (c.class ->> 'forestPlantationPercent')::numeric / 100
             )                                                                             as plantation_forest_area,
         sum(
                         (
                                     ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) *
                                     (c.class ->> 'forestPlantationPercent')::numeric / 100
                             ) -- plantation_forest_area
                         *
                         (c.class ->> 'forestPlantationIntroducedPercent')::numeric / 100
             )                                                                             as plantation_forest_introduced_area,
         sum(
                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                         (c.class ->> 'otherPlantedForestPercent')::numeric / 100
             )                                                                             as other_planted_forest_area,
         sum(
                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                         (c.class ->> 'forestPlantationPercent')::numeric / 100
             ) -- plantation_forest_area
             +
         sum(
                         ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                         (c.class ->> 'otherPlantedForestPercent')::numeric / 100
             ) -- other_planted_forest_area
  
                                                                                           as planted_forest,
  
         (
             sum(
                             ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric / 100) * -- forest
                             (c.class ->> 'forestNaturalPercent')::numeric / 100
                 ) -- natural_forest_area
             )
             +
         (
                 sum(
                                 ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric /
                                  100) * -- forest
                                 (c.class ->> 'forestPlantationPercent')::numeric / 100
                     ) -- plantation_forest_area
                 +
                 sum(
                                 ((c.class ->> 'area')::numeric * (c.class ->> 'forestPercent')::numeric /
                                  100) * -- forest
                                 (c.class ->> 'otherPlantedForestPercent')::numeric / 100
                     ) -- other_planted_forest_area
             ) -- planted_forest
                                                                                           as total
  
    from classes c
    group by c.country_iso, c.year
    order by c.country_iso, c.year;
  `
  return query
}
