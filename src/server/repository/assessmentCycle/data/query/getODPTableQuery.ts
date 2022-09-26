const ODPTables = [
  // 1
  // 1a, 1b handled in getODPTableQuery
  {
    tableName: 'extentofforest',
    variableNames: {
      forestArea: '1a_forestArea',
      otherWoodedLand: '1a_otherWoodedLand',
      totalLandArea: '1a_landArea',
    },
  },
  {
    tableName: 'forestcharacteristics',
    variableNames: {
      naturalForestArea: '1b_naturallyRegeneratingForest',
      plantedForest: '1b_plantedForest',
      plantationForestArea: '1b_plantationForest',
      plantationForestIntroducedArea: '1b_plantationForestIntroduced',
      otherPlantedForestArea: '1b_otherPlantedForest',
    },
  },
]

const _getSubQuery = (schemaName: string, tableName: string, variableName: string) => {
  return `
  select value ->> 'raw'
  from ${schemaName}.${tableName}
  where col_name = e.col_name
    and variable_name = '${variableName}'
    and country_iso = e.country_iso
  `
}

export const ODPQuery = {
  tables: ODPTables,
  extentOfForest: {
    subquery: (schemaName: string) => {
      return `
      extentofforest as (
      select e.country_iso,
             col_name as year,
             max(coalesce(o.forest_area::text, (${_getSubQuery(
               schemaName,
               'extentOfForest',
               'forestArea'
             )}))) as forestArea,
             max(coalesce(o.other_wooded_land::text, (${_getSubQuery(
               schemaName,
               'extentOfForest',
               'otherWoodedLand'
             )}))) as otherWoodedLand,
             max(coalesce(o.total_land_area::text, (${_getSubQuery(schemaName, 'extentOfForest', 'totalLandArea')})))
                      as totalLandArea

      from ${schemaName}.extentofforest e
               left join ${schemaName}.original_data_point_data o
                         on (e.country_iso = o.country_iso and e.col_name = o.year::text)
      where e.variable_name in ('otherWoodedLand', 'forestArea', 'totalLandArea')
      group by e.country_iso, col_name)
  `
    },
  },
  forestCharacteristics: {
    subquery: (schemaName: string) => {
      return `
       forestcharacteristics as (
with forestcharacteristics_no_odp as (select country_iso,
                                             col_name                              as year,

                                             max(case
                                                     when variable_name = 'naturalForestArea'
                                                         then value ->> 'raw' end) as naturalForestArea,

                                             max(case
                                                     when variable_name = 'plantedForest'
                                                         then value ->> 'raw' end) as plantedForest,

                                             max(case
                                                     when variable_name = 'plantationForestArea'
                                                         then value ->> 'raw' end) as plantationForestArea,

                                             max(case
                                                     when variable_name = 'plantationForestIntroducedArea'
                                                         then value ->> 'raw' end) as plantationForestIntroducedArea,

                                             max(case
                                                     when variable_name = 'otherPlantedForestArea'
                                                         then value ->> 'raw' end) as otherPlantedForestArea

                                      from ${schemaName}.forestcharacteristics f
                                      where f.variable_name in (
                                                                'naturalForestArea',
                                                                'plantedForest',
                                                                'plantationForestArea',
                                                                'plantationForestIntroducedArea',
                                                                'otherPlantedForestArea'
                                          )
                                      group by country_iso, col_name)
select fc.country_iso,
       fc.year,

       case
           when c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint' = 'false'
               then max(fc.naturalForestArea)
           else
               max(coalesce(o.natural_forest_area::text, (
                   fc.naturalForestArea
                   ))) end as naturalForestArea,

       case
           when c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint' = 'false'
               then max(fc.plantedForest)
           else
               max(coalesce(o.planted_forest::text, (
                   fc.plantedForest
                   ))) end as plantedForest,

       case
           when c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint' = 'false'
               then max(fc.plantationForestArea)
           else
               max(coalesce(o.plantation_forest_area::text, (
                   fc.plantationForestArea
                   ))) end as plantationForestArea,

       case
           when c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint' = 'false'
               then max(fc.plantationForestIntroducedArea)
           else
               max(coalesce(o.plantation_forest_introduced_area::text, (
                   fc.plantationForestIntroducedArea
                   ))) end as plantationForestIntroducedArea,

       case
           when c.props -> 'forestCharacteristics' ->> 'useOriginalDataPoint' = 'false'
               then max(fc.otherPlantedForestArea)
           else
               max(coalesce(o.other_planted_forest_area::text, (
                   fc.otherPlantedForestArea
                   ))) end as otherPlantedForestArea

from forestcharacteristics_no_odp fc
         left join ${schemaName}.original_data_point_data o
                   on (fc.country_iso = o.country_iso and fc.year = o.year::text)
         join ${schemaName}.country c on (c.country_iso = fc.country_iso)
group by o.year, fc.country_iso, fc.year, c.props)
  `
    },
  },
}
