type TableType = {
  tableName: string
  variableNames: Record<string, string>
}

type Props = {
  schemaCycle: string
  table: TableType
}

const getTableQuery = (props: Props) => {
  const { schemaCycle, table } = props

  return `
  ${table.tableName} as (select country_iso,
                                col_name                        as year,
                               ${Object.keys(table.variableNames)
                                 .map(
                                   (variableName) =>
                                     `max(case when variable_name = '${variableName}' then value ->> 'raw' end)      as ${variableName}`
                                 )
                                 .join(',\n')}
                        from ${schemaCycle}.${table.tableName}
                        where variable_name in (${Object.keys(table.variableNames)
                          .map((variableName) => `'${variableName}'`)
                          .join(', ')})
                        group by 1, 2)
  `
}

const tables: Array<TableType> = [
  // Section
  // 1

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
  {
    tableName: 'specificforestcategories',
    variableNames: {
      primary_forest: '1c_primary',
      temporarily_unstocked: '1c_tempUnstocked',
      bamboo: '1c_bamboos',
      mangroves: '1c_mangroves',
      rubber_wood: '1c_rubber',
    },
  },

  {
    tableName: 'otherlandwithtreecover',
    variableNames: {
      palms: '1f_palms',
      tree_orchards: '1f_treeOrchards',
      agroforestry: '1f_agroforestry',
      other: '1f_other',
      trees_in_urban_settings: '1f_treesUrbanSettings',
    },
  },
  // 2
  {
    tableName: 'growingstockavg',
    variableNames: {
      naturallyRegeneratingForest: '2a_gs_ha_nat_reg',
      forest: '2a_gs_ha_forest',
      plantationForest: '2a_gs_ha_plantation',
      plantedForest: '2a_gs_ha_planted',
      otherWoodedLand: '2a_gs_ha_owl',
      otherPlantedForest: '2a_gs_ha_other_planted',
    },
  },
  {
    tableName: 'growingstocktotal',
    variableNames: {
      naturallyRegeneratingForest: '2a_gs_tot_nat_reg',
      plantedForest: '2a_gs_tot_planted',
      plantationForest: '2a_gs_tot_plantation',
      otherPlantedForest: '2a_gs_tot_other_planted',
      forest: '2a_gs_tot_forest',
      otherWoodedLand: '2a_gs_tot_owl',
    },
  },
]

const getJoinClause = (tables: Array<TableType>) =>
  tables.map((table) => `left join ${table.tableName} using (country_iso, year)`).join('\n')

const getSelectClause = (tables: Array<TableType>) =>
  tables
    .map((table) =>
      Object.entries(table.variableNames)
        .map(([field, as]) => `${table.tableName}.${field} as "${as}"`)
        .join(', \n')
    )
    .join(',\n')

export const getFraYearsDataQuery = (schemaCycle: string) => `
with ${tables.map((table) => getTableQuery({ schemaCycle, table })).join(', ')},
     growingstockcomposition as (select country_iso,
                                        col_name                                                                    as year,
                                        max(case when variable_name = 'native_rank1' then value ->> 'raw' end)      as native_rank1,
                                        max(case when variable_name = 'native_rank2' then value ->> 'raw' end)      as native_rank2,
                                        max(case when variable_name = 'native_rank3' then value ->> 'raw' end)      as native_rank3,
                                        max(case when variable_name = 'native_rank4' then value ->> 'raw' end)      as native_rank4,
                                        max(case when variable_name = 'native_rank5' then value ->> 'raw' end)      as native_rank5,
                                        max(case when variable_name = 'native_rank6' then value ->> 'raw' end)      as native_rank6,
                                        max(case when variable_name = 'native_rank7' then value ->> 'raw' end)      as native_rank7,
                                        max(case when variable_name = 'native_rank8' then value ->> 'raw' end)      as native_rank8,
                                        max(case when variable_name = 'native_rank9' then value ->> 'raw' end)      as native_rank9,
                                        max(case when variable_name = 'native_rank10' then value ->> 'raw' end)     as native_rank10,

                                        max(case when variable_name = 'introduced_rank1' then value ->> 'raw' end)  as introduced_rank1,
                                        max(case when variable_name = 'introduced_rank2' then value ->> 'raw' end)  as introduced_rank2,
                                        max(case when variable_name = 'introduced_rank3' then value ->> 'raw' end)  as introduced_rank3,
                                        max(case when variable_name = 'introduced_rank4' then value ->> 'raw' end)  as introduced_rank4,
                                        max(case when variable_name = 'introduced_rank5' then value ->> 'raw' end)  as introduced_rank5,

                                        max(case when variable_name = 'remaining_native' then value ->> 'raw' end)  as remaining_native,
                                        max(case when variable_name = 'totalGrowingStock' then value ->> 'raw' end) as totalGrowingStock,
                                        max(case when variable_name = 'totalIntroduced' then value ->> 'raw' end)   as totalIntroduced,

                                        max(case
                                                when variable_name = 'total_native_placeholder'
                                                    then value ->> 'raw' end)                                       as total_native_placeholder,
                                        max(case
                                                when variable_name = 'remaining_introduced_placeholder'
                                                    then value ->> 'raw' end)                                       as remaining_introduced_placeholder


                                 from ${schemaCycle}.growingstockcomposition
                                 where variable_name in (
                                                         'introduced_rank1', 'introduced_rank2', 'introduced_rank3',
                                                         'introduced_rank4', 'introduced_rank5', 'native_rank1',
                                                         'native_rank10', 'native_rank2', 'native_rank3',
                                                         'native_rank4', 'native_rank5', 'native_rank6', 'native_rank7',
                                                         'native_rank8', 'native_rank9',
                                                         'remaining_introduced_placeholder', 'remaining_native',
                                                         'totalGrowingStock', 'totalIntroduced',
                                                         'total_native_placeholder'
                                     )
                                 group by 1, 2),
     biomassstock as (select country_iso,
                             col_name                                                                      as year,
                             max(case when variable_name = 'forest_above_ground' then value ->> 'raw' end) as forest_above_ground,
                             max(case when variable_name = 'forest_below_ground' then value ->> 'raw' end) as forest_below_ground,
                             max(case when variable_name = 'forest_deadwood' then value ->> 'raw' end)     as forest_deadwood
                      from ${schemaCycle}.biomassstock
                      where variable_name in (
                                              'forest_above_ground', 'forest_below_ground', 'forest_deadwood'
                          )
                      group by 1, 2),

     carbonstock as (select country_iso,
                            col_name                                                                         as year,
                            max(case
                                    when variable_name = 'carbon_forest_above_ground'
                                        then value ->> 'raw' end)                                            as carbon_forest_above_ground,
                            max(case
                                    when variable_name = 'carbon_forest_below_ground'
                                        then value ->> 'raw' end)                                            as carbon_forest_below_ground,
                            max(case when variable_name = 'carbon_forest_deadwood' then value ->> 'raw' end) as carbon_forest_deadwood,
                            max(case when variable_name = 'carbon_forest_litter' then value ->> 'raw' end)   as carbon_forest_litter,
                            max(case when variable_name = 'carbon_forest_soil' then value ->> 'raw' end)     as carbon_forest_soil
                     from ${schemaCycle}.carbonstock
                     where variable_name in (
                                             'carbon_forest_above_ground',
                                             'carbon_forest_below_ground',
                                             'carbon_forest_deadwood',
                                             'carbon_forest_litter',
                                             'carbon_forest_soil'
                         )
                     group by 1, 2),
     carbonstocksoildepth as (select country_iso,
                                     col_name                                                             as year,
                                     max(case when variable_name = 'soil_depth' then value ->> 'raw' end) as soil_depth
                              from ${schemaCycle}.carbonstocksoildepth
                              where variable_name in (
                                  'soil_depth'
                                  )
                              group by 1, 2),
-- 3
     primarydesignatedmanagementobjective as (select country_iso,
                                                     col_name                                                                  as year,
                                                     max(case
                                                             when variable_name = 'conservation_of_biodiversity'
                                                                 then value ->> 'raw' end)                                     as conservation_of_biodiversity,
                                                     max(case when variable_name = 'multiple_use' then value ->> 'raw' end)    as multiple_use,
                                                     max(case when variable_name = 'no_unknown' then value ->> 'raw' end)      as no_unknown,
                                                     max(case when variable_name = 'other' then value ->> 'raw' end)           as other,
                                                     max(case when variable_name = 'production' then value ->> 'raw' end)      as production,
                                                     max(case
                                                             when variable_name = 'protection_of_soil_and_water'
                                                                 then value ->> 'raw' end)                                     as protection_of_soil_and_water,
                                                     max(case when variable_name = 'social_services' then value ->> 'raw' end) as social_services
                                              from ${schemaCycle}.primarydesignatedmanagementobjective
                                              where variable_name in (
                                                                      'conservation_of_biodiversity', 'multiple_use',
                                                                      'no_unknown', 'other', 'production',
                                                                      'protection_of_soil_and_water', 'social_services')
                                              group by 1, 2),
     totalareawithdesignatedmanagementobjective as (select country_iso,
                                                           col_name                                                                  as year,
                                                           max(case
                                                                   when variable_name = 'conservation_of_biodiversity'
                                                                       then value ->> 'raw' end)                                     as conservation_of_biodiversity,
                                                           max(case when variable_name = 'other' then value ->> 'raw' end)           as other,
                                                           max(case when variable_name = 'production' then value ->> 'raw' end)      as production,
                                                           max(case
                                                                   when variable_name = 'protection_of_soil_and_water'
                                                                       then value ->> 'raw' end)                                     as protection_of_soil_and_water,
                                                           max(case when variable_name = 'social_services' then value ->> 'raw' end) as social_services
                                                    from ${schemaCycle}.totalareawithdesignatedmanagementobjective
                                                    where variable_name in (
                                                                            'conservation_of_biodiversity', 'other',
                                                                            'production',
                                                                            'protection_of_soil_and_water',
                                                                            'social_services'
                                                        )
                                                    group by 1, 2),
     forestAreaWithinProtectedAreas as (select country_iso,
                                               col_name                              as year,
                                               max(case
                                                       when variable_name = 'forest_area_within_protected_areas'
                                                           then value ->> 'raw' end) as forest_area_within_protected_areas,
                                               max(case
                                                       when variable_name = 'forest_area_with_long_term_management_plan'
                                                           then value ->> 'raw' end) as forest_area_with_long_term_management_plan,
                                               max(case
                                                       when variable_name = 'of_which_in_protected_areas'
                                                           then value ->> 'raw' end) as of_which_in_protected_areas
                                        from ${schemaCycle}.forestAreaWithinProtectedAreas
                                        where variable_name in (
                                                                'forest_area_within_protected_areas',
                                                                'forest_area_with_long_term_management_plan',
                                                                'of_which_in_protected_areas'
                                            )
                                        group by 1, 2),
-- 4
     forestOwnership as (select country_iso,
                                col_name                                                                          as year,
                                max(case when variable_name = 'of_which_by_communities' then value ->> 'raw' end) as of_which_by_communities,
                                max(case when variable_name = 'of_which_by_individuals' then value ->> 'raw' end) as of_which_by_individuals,
                                max(case
                                        when variable_name = 'of_which_by_private_businesses'
                                            then value ->> 'raw' end)                                             as of_which_by_private_businesses,
                                max(case when variable_name = 'other_or_unknown' then value ->> 'raw' end)        as other_or_unknown,
                                max(case when variable_name = 'private_ownership' then value ->> 'raw' end)       as private_ownership,
                                max(case when variable_name = 'public_ownership' then value ->> 'raw' end)        as public_ownership
                         from ${schemaCycle}.forestownership
                         where variable_name in (
                                                 'of_which_by_communities', 'of_which_by_individuals',
                                                 'of_which_by_private_businesses', 'other_or_unknown',
                                                 'private_ownership', 'public_ownership'
                             )
                         group by 1, 2),
     holderofmanagementrights as (select country_iso,
                                         col_name                                                                        as year,
                                         max(case when variable_name = 'communities' then value ->> 'raw' end)           as communities,
                                         max(case when variable_name = 'individuals' then value ->> 'raw' end)           as individuals,
                                         max(case when variable_name = 'other' then value ->> 'raw' end)                 as other,
                                         max(case when variable_name = 'private_businesses' then value ->> 'raw' end)    as private_businesses,
                                         max(case when variable_name = 'public_administration' then value ->> 'raw' end) as public_administration
                                  from ${schemaCycle}.holderofmanagementrights
                                  where variable_name in (
                                                          'communities',
                                                          'individuals',
                                                          'other',
                                                          'private_businesses',
                                                          'public_administration'
                                      )
                                  group by 1, 2),
-- 5
     degradedforest as (select country_iso,
                               max(case when variable_name = 'does_country_monitor' then value ->> 'raw' end) as does_country_monitor
                        from ${schemaCycle}.degradedforest
                        where variable_name in (
                            'does_country_monitor'
                            )
                        group by 1),
-- 6
     forestpolicy as (select country_iso,
                             max(
                                     case
                                         when
                                                     variable_name = 'existence_of_traceability_system' and
                                                     col_name = 'national_yes_no'
                                             then value ->> 'raw' end) as national_existence_of_traceability_system,
                             max(
                                     case
                                         when
                                                     variable_name = 'existence_of_traceability_system' and
                                                     col_name = 'sub_national_yes_no'
                                             then value ->> 'raw' end) as sub_national_existence_of_traceability_system,
                             max(
                                     case
                                         when
                                                     variable_name = 'legislations_supporting_SFM' and
                                                     col_name = 'national_yes_no'
                                             then value ->> 'raw' end) as national_legislations_supporting_SFM,
                             max(
                                     case
                                         when
                                                     variable_name = 'legislations_supporting_SFM' and
                                                     col_name = 'sub_national_yes_no'
                                             then value ->> 'raw' end) as sub_national_legislations_supporting_SFM,

                             max(
                                     case
                                         when
                                                     variable_name = 'platform_for_stakeholder_participation' and
                                                     col_name = 'national_yes_no'
                                             then value ->> 'raw' end) as national_platform_for_stakeholder_participation,
                             max(
                                     case
                                         when
                                                     variable_name = 'platform_for_stakeholder_participation' and
                                                     col_name = 'sub_national_yes_no'
                                             then value ->> 'raw' end) as sub_national_platform_for_stakeholder_participation,

                             max(
                                     case
                                         when
                                             variable_name = 'policies_supporting_SFM' and col_name = 'national_yes_no'
                                             then value ->> 'raw' end) as national_policies_supporting_SFM,
                             max(
                                     case
                                         when
                                                     variable_name = 'policies_supporting_SFM' and
                                                     col_name = 'sub_national_yes_no'
                                             then value ->> 'raw' end) as sub_national_policies_supporting_SFM
                      from ${schemaCycle}.forestpolicy
                      where variable_name in (
                                              'existence_of_traceability_system',
                                              'legislations_supporting_SFM',
                                              'platform_for_stakeholder_participation',
                                              'policies_supporting_SFM'
                          )
                      group by 1),
     -- specialcase
     areaofpermanentforestestate as (select country_iso,
                                            case when col_name != 'applicable' then col_name end as year,
                                            x.applicable,
                                            max(
                                                    case
                                                        when
                                                                    variable_name =
                                                                    'area_of_permanent_forest_estate' and
                                                                    col_name != 'applicable'
                                                            then value ->> 'raw' end)            as area_of_permanent_forest_estate
                                     from ${schemaCycle}.areaofpermanentforestestate
                                              inner join (select country_iso,
                                                                 case when col_name = 'applicable' then value ->> 'raw' end as applicable
                                                          from ${schemaCycle}.areaofpermanentforestestate
                                                          where col_name = 'applicable') x using (country_iso)
                                     where variable_name in (
                                         'area_of_permanent_forest_estate'
                                         )
                                       and col_name != 'applicable'
                                     group by 1, 2, 3),
-- 7
     employment as (select country_iso,
                           x.year                                as year,
                           max(case
                                   when variable_name = 'employment_in_forestry_and_logging' and
                                        col_name ilike year || '_total'
                                       then value ->> 'raw' end) as employment_in_forestry_and_logging_total_total,
                           max(case
                                   when variable_name = 'employment_in_forestry_and_logging' and
                                        col_name ilike year || '_female'
                                       then value ->> 'raw' end) as employment_in_forestry_and_logging_total_female,
                           max(case
                                   when variable_name = 'employment_in_forestry_and_logging' and
                                        col_name ilike year || '_male'
                                       then value ->> 'raw' end) as employment_in_forestry_and_logging_total_male,

                           max(case
                                   when variable_name = 'of_which_gathering_of_non_wood_forest_products' and
                                        col_name ilike year || '_total'
                                       then value ->> 'raw' end) as of_which_gathering_of_non_wood_forest_products_total,
                           max(case
                                   when variable_name = 'of_which_gathering_of_non_wood_forest_products' and
                                        col_name ilike year || '_female'
                                       then value ->> 'raw' end) as of_which_gathering_of_non_wood_forest_products_female,
                           max(case
                                   when variable_name = 'of_which_gathering_of_non_wood_forest_products' and
                                        col_name ilike year || '_male'
                                       then value ->> 'raw' end) as of_which_gathering_of_non_wood_forest_products_male,

                           max(case
                                   when variable_name = 'of_which_logging' and col_name ilike year || '_total'
                                       then value ->> 'raw' end) as of_which_logging_total,
                           max(case
                                   when variable_name = 'of_which_logging' and col_name ilike year || '_female'
                                       then value ->> 'raw' end) as of_which_logging_female,
                           max(case
                                   when variable_name = 'of_which_logging' and col_name ilike year || '_male'
                                       then value ->> 'raw' end) as of_which_logging_male,

                           max(case
                                   when variable_name = 'of_which_silviculture_and_other_forestry_activities' and
                                        col_name ilike year || '_total'
                                       then value ->> 'raw' end) as of_which_silviculture_and_other_forestry_activities_total,
                           max(case
                                   when variable_name = 'of_which_silviculture_and_other_forestry_activities' and
                                        col_name ilike year || '_female'
                                       then value ->> 'raw' end) as of_which_silviculture_and_other_forestry_activities_female,
                           max(case
                                   when variable_name = 'of_which_silviculture_and_other_forestry_activities' and
                                        col_name ilike year || '_male'
                                       then value ->> 'raw' end) as of_which_silviculture_and_other_forestry_activities_male,

                           max(case
                                   when variable_name = 'of_which_support_services_to_forestry' and
                                        col_name ilike year || '_total'
                                       then value ->> 'raw' end) as of_which_support_services_to_forestry_total,
                           max(case
                                   when variable_name = 'of_which_support_services_to_forestry' and
                                        col_name ilike year || '_female'
                                       then value ->> 'raw' end) as of_which_support_services_to_forestry_female,
                           max(case
                                   when variable_name = 'of_which_support_services_to_forestry' and
                                        col_name ilike year || '_male'
                                       then value ->> 'raw' end) as of_which_support_services_to_forestry_male

                    from ${schemaCycle}.employment
                             inner join (select country_iso,
                                                regexp_replace(col_name, '_.*', '') as year

                                         from ${schemaCycle}.employment
                                         group by 1, 2) x using (country_iso)
                    where variable_name in (
                                            'employment_in_forestry_and_logging',
                                            'of_which_gathering_of_non_wood_forest_products',
                                            'of_which_logging',
                                            'of_which_silviculture_and_other_forestry_activities',
                                            'of_which_support_services_to_forestry'
                        )
                    group by 1, 2),
     graduationofstudents as (select country_iso,
                                     x.year                                as year,
                                     max(case
                                             when variable_name = 'bachelors_degree' and
                                                  col_name ilike year || '_total'
                                                 then value ->> 'raw' end) as bachelors_degree_total,
                                     max(case
                                             when variable_name = 'bachelors_degree' and
                                                  col_name ilike year || '_female'
                                                 then value ->> 'raw' end) as bachelors_degree_female,
                                     max(case
                                             when variable_name = 'bachelors_degree' and
                                                  col_name ilike year || '_male'
                                                 then value ->> 'raw' end) as bachelors_degree_male,

                                     max(case
                                             when variable_name = 'doctoral_degree' and
                                                  col_name ilike year || '_total'
                                                 then value ->> 'raw' end) as doctoral_degree_total,
                                     max(case
                                             when variable_name = 'doctoral_degree' and
                                                  col_name ilike year || '_female'
                                                 then value ->> 'raw' end) as doctoral_degree_female,
                                     max(case
                                             when variable_name = 'doctoral_degree' and
                                                  col_name ilike year || '_male'
                                                 then value ->> 'raw' end) as doctoral_degree_male,

                                     max(case
                                             when variable_name = 'masters_degree' and
                                                  col_name ilike year || '_total'
                                                 then value ->> 'raw' end) as masters_degree_total,
                                     max(case
                                             when variable_name = 'masters_degree' and
                                                  col_name ilike year || '_female'
                                                 then value ->> 'raw' end) as masters_degree_female,
                                     max(case
                                             when variable_name = 'masters_degree' and
                                                  col_name ilike year || '_male'
                                                 then value ->> 'raw' end) as masters_degree_male,

                                     max(case
                                             when variable_name = 'technician_certificate' and
                                                  col_name ilike year || '_total'
                                                 then value ->> 'raw' end) as technician_certificate_total,
                                     max(case
                                             when variable_name = 'technician_certificate' and
                                                  col_name ilike year || '_female'
                                                 then value ->> 'raw' end) as technician_certificate_female,
                                     max(case
                                             when variable_name = 'technician_certificate' and
                                                  col_name ilike year || '_male'
                                                 then value ->> 'raw' end) as technician_certificate_male,
                                     max(case
                                             when variable_name = 'total' and
                                                  col_name ilike year || '_total'
                                                 then value ->> 'raw' end) as total_total,
                                     max(case
                                             when variable_name = 'total' and
                                                  col_name ilike year || '_female'
                                                 then value ->> 'raw' end) as total_female,
                                     max(case
                                             when variable_name = 'total' and
                                                  col_name ilike year || '_male'
                                                 then value ->> 'raw' end) as total_male

                              from ${schemaCycle}.graduationofstudents
                                       inner join (select country_iso,
                                                          regexp_replace(col_name, '_.*', '') as year
                                                   from ${schemaCycle}.graduationofstudents
                                                   group by 1, 2) x using (country_iso)
                              where variable_name in (
                                                      'bachelors_degree',
                                                      'doctoral_degree',
                                                      'masters_degree',
                                                      'technician_certificate',
                                                      'total'
                                  )
                              group by 1, 2),


-- other
     climaticdomain as (select country_iso,
                               coalesce(max(case
                                                when variable_name = 'boreal' and col_name = 'percentOfForestArea2015'
                                                    then value ->> 'raw' end),
                                        max(case
                                                when variable_name = 'boreal' and col_name = 'percentOfForestArea2015Default'
                                                    then value ->> 'raw' end)
                                   ) as "boreal",
                               coalesce(max(case
                                                when variable_name = 'sub_tropical' and col_name = 'percentOfForestArea2015'
                                                    then value ->> 'raw' end),
                                        max(case
                                                when variable_name = 'sub_tropical' and
                                                     col_name = 'percentOfForestArea2015Default'
                                                    then value ->> 'raw' end)
                                   ) as "sub_tropical",
                               coalesce(max(case
                                                when variable_name = 'temperate' and col_name = 'percentOfForestArea2015'
                                                    then value ->> 'raw' end),
                                        max(case
                                                when variable_name = 'temperate' and col_name = 'percentOfForestArea2015Default'
                                                    then value ->> 'raw' end)
                                   ) as "temperate",
                               coalesce(max(case
                                                when variable_name = 'tropical' and col_name = 'percentOfForestArea2015'
                                                    then value ->> 'raw' end),
                                        max(case
                                                when variable_name = 'tropical' and col_name = 'percentOfForestArea2015Default'
                                                    then value ->> 'raw' end)
                                   ) as "tropical"
                        from ${schemaCycle}.climaticdomain
                        group by country_iso),
     _regions as (select cr.country_iso, array_to_string(ARRAY_AGG(distinct cr.region_code), ';') as regions
                  from ${schemaCycle}.country_region cr
                  group by cr.country_iso),
     _years as (select t1.*, t2.*
                from (select fc.year
                      from forestcharacteristics fc
                      union
                      select eof.year
                      from extentofforest eof
                      order by 1) as t1
                         full join
                         (select c.* from country as c) as t2
                         on true
                where year in ('1990', '2000', '2010', '2015', '2020')
                order by 2, 1)
select r.regions,
       cc.country_iso,
       y.year,
       boreal,
       temperate,
       tropical,
       sub_tropical                                                 as subtropical,
    
        ${getSelectClause(tables)},

       gscomposition.native_rank1                                   as "2b_native_#1",
       gscomposition.native_rank2                                   as "2b_native_#2",
       gscomposition.native_rank3                                   as "2b_native_#3",
       gscomposition.native_rank4                                   as "2b_native_#4",
       gscomposition.native_rank5                                   as "2b_native_#5",
       gscomposition.native_rank6                                   as "native_rank#6",
       gscomposition.native_rank7                                   as "native_rank#7",
       gscomposition.native_rank8                                   as "native_rank#8",
       gscomposition.native_rank9                                   as "native_rank#9",
       gscomposition.native_rank10                                  as "native_rank#10",

       gscomposition.remaining_native                               as "2b_native_remaining",
       gscomposition.total_native_placeholder                       as "2b_native_total",

       gscomposition.introduced_rank1                               as "2b_introduced_#1",
       gscomposition.introduced_rank2                               as "2b_introduced_#2",
       gscomposition.introduced_rank3                               as "2b_introduced_#3",
       gscomposition.introduced_rank4                               as "2b_introduced_#4",
       gscomposition.introduced_rank5                               as "2b_introduced_#5",

       gscomposition.remaining_introduced_placeholder               as "2b_introduced_remaining",
       gscomposition.totalIntroduced                                as "2b_introduced_total",
       gscomposition.totalGrowingStock                              as "2b_total_gs",

       bms.forest_above_ground                                      as "2c_agb",
       bms.forest_below_ground                                      as "2c_bgb",
       bms.forest_deadwood                                          as "2c_dwb",

       cs.carbon_forest_above_ground                                as "2d_carbon_agb",
       cs.carbon_forest_below_ground                                as "2d_carbon_bgb",
       cs.carbon_forest_deadwood                                    as "2d_carbon_dw",
       cs.carbon_forest_litter                                      as "2d_carbon_litter",
       cs.carbon_forest_soil                                        as "2d_carbon_soil",
       cssd.soil_depth                                              as "2d_soil_depth_cm",
-- 3
       pdmo.production                                              as "3a_prim_prod",
       pdmo.protection_of_soil_and_water                            as "3a_prim_prot",
       pdmo.conservation_of_biodiversity                            as "3a_prim_biodiv",
       pdmo.social_services                                         as "3a_prim_socserv",
       pdmo.multiple_use                                            as "3a_prim_multi",
       pdmo.other                                                   as "3a_prim_other",
       pdmo.no_unknown                                              as "3a_prim_no_unknown",

       tawdmo.production                                               "3a_tot_prod",
       tawdmo.protection_of_soil_and_water                             "3a_tot_prot",
       tawdmo.conservation_of_biodiversity                             "3a_tot_biodiv",
       tawdmo.social_services                                          "3a_tot_socserv",
       tawdmo.other                                                    "3a_tot_other",

       fawpa.forest_area_within_protected_areas                     as "3b_protected",
       fawpa.forest_area_with_long_term_management_plan             as "3b_forMngt",
       fawpa.of_which_in_protected_areas                            as "3b_mngtProt",

-- 4
       fo.private_ownership                                         as "4a_priv_own",
       fo.of_which_by_individuals                                   as "4a_individ",
       fo.of_which_by_private_businesses                            as "4a_bus_inst_fo",
       fo.of_which_by_communities                                   as "4a_indigenous_fo",
       fo.public_ownership                                          as "4a_pub_own",
       fo.other_or_unknown                                          as "4a_fo_unknown", -- Should we fallback to totalForestArea

       homr.public_administration                                   as "4b_pub_admin",
       homr.individuals                                             as "4b_individuals",
       homr.private_businesses                                      as "4b_bus_inst_mr",
       homr.communities                                             as "4b_indigenous_mr",
       homr.other                                                   as "4b_unknown",
-- -- 5
       df.does_country_monitor                                      as "5c_y_n",
-- -- 6
       fp.national_policies_supporting_SFM                          as "6a_policies_national",
       fp.sub_national_policies_supporting_SFM                      as "6a_policies_sub_national",
       fp.national_legislations_supporting_SFM                      as "6a_legislation_national",
       fp.sub_national_legislations_supporting_SFM                  as "6a_legislation_sub_national",
       fp.national_platform_for_stakeholder_participation           as "6a_platform_national",
       fp.sub_national_platform_for_stakeholder_participation       as "6a_platform_sub_national",
       fp.national_existence_of_traceability_system                 as "6a_traceability_national",
       fp.sub_national_existence_of_traceability_system             as "6a_traceability_sub_national",

       aopfe.applicable                                             as "6b_pfe_y_n",
       aopfe.area_of_permanent_forest_estate                        as "6b_pfe_area",
-- -- 7
       e.employment_in_forestry_and_logging_total_total             as "7a_employment_tot",
       e.employment_in_forestry_and_logging_total_female            as "7a_employment_fem",
       e.employment_in_forestry_and_logging_total_male              as "7a_employment_male",

       e.of_which_silviculture_and_other_forestry_activities_total  as "7a_emp_forestry_tot",
       e.of_which_silviculture_and_other_forestry_activities_female as "7a_emp_forestry_fem",
       e.of_which_silviculture_and_other_forestry_activities_male   as "7a_emp_forestry_male",

       e.of_which_logging_total                                     as "7a_emp_logging_tot",
       e.of_which_logging_female                                    as "7a_emp_logging_fem",
       e.of_which_logging_male                                      as "7a_emp_logging_male",

       e.of_which_gathering_of_non_wood_forest_products_total       as "7a_emp_nwfp_tot",
       e.of_which_gathering_of_non_wood_forest_products_female      as "7a_emp_nwfp_fem",
       e.of_which_gathering_of_non_wood_forest_products_male        as "7a_emp_nwfp_male",

       e.of_which_support_services_to_forestry_total                as "7a_emp_support_tot",
       e.of_which_support_services_to_forestry_female               as "7a_emp_support_fem",
       e.of_which_support_services_to_forestry_male                 as "7a_emp_support_male",

       gos.doctoral_degree_total                                    as "7b_phd_tot",
       gos.doctoral_degree_female                                   as "7b_phd_fem",
       gos.doctoral_degree_male                                     as "7b_phd_male",

       gos.masters_degree_total                                     as "7b_msc_tot",
       gos.masters_degree_female                                    as "7b_msc_fem",
       gos.masters_degree_male                                      as "7b_msc_male",

       gos.bachelors_degree_total                                   as "7b_ba_tot",
       gos.bachelors_degree_female                                  as "7b_ba_fem",
       gos.bachelors_degree_male                                    as "7b_ba_male",

       gos.technician_certificate_total                             as "7b_tec_tot",
       gos.technician_certificate_female                            as "7b_tec_fem",
       gos.technician_certificate_male                              as "7b_tec_male",

       gos.total_total                                              as "7b_total_tot",
       gos.total_female                                             as "7b_total_fem",
       gos.total_male                                               as "7b_total_male"

from ${schemaCycle}.country cc
         join _regions r using (country_iso)
         join _years y using (country_iso)
         join climaticdomain c using (country_iso)
         
         ${getJoinClause(tables)}

         left join growingstockcomposition gscomposition using (country_iso, year)

         left join biomassstock bms using (country_iso, year)

         left join carbonstock cs using (country_iso, year)

--       3
         left join primarydesignatedmanagementobjective pdmo using (country_iso, year)
         left join totalareawithdesignatedmanagementobjective tawdmo using (country_iso, year)

         left join forestAreaWithinProtectedAreas fawpa using (country_iso, year)
--       4
         left join forestOwnership fo using (country_iso, year)
         left join holderofmanagementrights homr using (country_iso, year)
--        6
         left join areaofpermanentforestestate aopfe using (country_iso, year)
--        7
         left join employment e using (country_iso, year)
         left join graduationofstudents gos using (country_iso, year)
    -- special cases
-- 2 no year
         left join carbonstocksoildepth cssd on (cc.country_iso = cssd.country_iso) -- no year, single col
-- 5 no year
         left join degradedforest df on (cc.country_iso = df.country_iso) -- no year
-- 6 no year
         left join forestpolicy fp on (cc.country_iso = fp.country_iso) -- no year

where cc.country_iso not ilike 'X%'
`
