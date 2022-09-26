export type TableType = {
  tableName: string
  variableNames: Record<string, string>
  joinOn?: string
}

export const tables: Array<TableType> = [
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
  {
    tableName: 'growingstockcomposition',
    variableNames: {
      native_rank1: '2b_native_#1',
      native_rank2: '2b_native_#2',
      native_rank3: '2b_native_#3',
      native_rank4: '2b_native_#4',
      native_rank5: '2b_native_#5',
      native_rank6: '2b_native_#6',
      native_rank7: '2b_native_#7',
      native_rank8: '2b_native_#8',
      native_rank9: '2b_native_#9',
      native_rank10: '2b_native_#10',
      remaining_native: '2b_native_remaining',
      total_native_placeholder: '2b_native_total',
      introduced_rank1: '2b_introduced_#1',
      introduced_rank2: '2b_introduced_#2',
      introduced_rank3: '2b_introduced_#3',
      introduced_rank4: '2b_introduced_#4',
      introduced_rank5: '2b_introduced_#5',
      remaining_introduced_placeholder: '2b_introduced_remaining',
      totalIntroduced: '2b_introduced_total',
      totalGrowingStock: '2b_total_gs',
    },
  },
  {
    tableName: 'biomassstock',
    variableNames: {
      forest_above_ground: '2c_agb',
      forest_below_ground: '2c_bgb',
      forest_deadwood: '2c_dwb',
    },
  },
  {
    tableName: 'carbonstock',
    variableNames: {
      carbon_forest_above_ground: '2d_carbon_agb',
      carbon_forest_below_ground: '2d_carbon_bgb',
      carbon_forest_deadwood: '2d_carbon_dw',
      carbon_forest_litter: '2d_carbon_litter',
      carbon_forest_soil: '2d_carbon_soil',
    },
  },
  // special: carbonstocksoildepth
  // 3
  {
    tableName: 'primarydesignatedmanagementobjective',
    variableNames: {
      production: '3a_prim_prod',
      protection_of_soil_and_water: '3a_prim_prot',
      conservation_of_biodiversity: '3a_prim_biodiv',
      social_services: '3a_prim_socserv',
      multiple_use: '3a_prim_multi',
      other: '3a_prim_other',
      no_unknown: '3a_prim_no_unknown',
    },
  },
  {
    tableName: 'totalareawithdesignatedmanagementobjective',
    variableNames: {
      production: '3a_tot_prod',
      protection_of_soil_and_water: '3a_tot_prot',
      conservation_of_biodiversity: '3a_tot_biodiv',
      social_services: '3a_tot_socserv',
      other: '3a_tot_other',
    },
  },
  {
    tableName: 'forestAreaWithinProtectedAreas',
    variableNames: {
      forest_area_within_protected_areas: '3b_protected',
      forest_area_with_long_term_management_plan: '3b_forMngt',
      of_which_in_protected_areas: '3b_mngtProt',
    },
  },
  // 4
  {
    tableName: 'forestOwnership',
    variableNames: {
      private_ownership: '4a_priv_own',
      of_which_by_individuals: '4a_individ',
      of_which_by_private_businesses: '4a_bus_inst_fo',
      of_which_by_communities: '4a_indigenous_fo',
      public_ownership: '4a_pub_own',
      other_or_unknown: '4a_fo_unknown', // Should we fallback to totalForestArea
    },
  },
  {
    tableName: 'holderofmanagementrights',
    variableNames: {
      public_administration: '4b_pub_admin',
      individuals: '4b_individuals',
      private_businesses: '4b_bus_inst_mr',
      communities: '4b_indigenous_mr',
      other: '4b_unknown',
    },
  },
]

export const specialTables: Array<TableType> = [
  {
    tableName: 'graduationofstudents',
    variableNames: {
      doctoral_degree_total: '7b_phd_tot',
      doctoral_degree_female: '7b_phd_fem',
      doctoral_degree_male: '7b_phd_male',
      masters_degree_total: '7b_msc_tot',
      masters_degree_female: '7b_msc_fem',
      masters_degree_male: '7b_msc_male',
      bachelors_degree_total: '7b_ba_tot',
      bachelors_degree_female: '7b_ba_fem',
      bachelors_degree_male: '7b_ba_male',
      technician_certificate_total: '7b_tech_tot',
      technician_certificate_female: '7b_tech_fem',
      technician_certificate_male: '7b_tech_male',
      total_total: '7b_total_tot',
      total_female: '7b_total_fem',
      total_male: '7b_total_male',
    },
  },
  {
    tableName: 'employment',
    variableNames: {
      employment_in_forestry_and_logging_total: '7a_employment_tot',
      employment_in_forestry_and_logging_female: '7a_employment_fem',
      employment_in_forestry_and_logging_male: '7a_employment_male',
      of_which_silviculture_and_other_forestry_activities_total: '7a_emp_forestry_tot',
      of_which_silviculture_and_other_forestry_activities_female: '7a_emp_forestry_fem',
      of_which_silviculture_and_other_forestry_activities_male: '7a_emp_forestry_male',
      of_which_logging_total: '7a_emp_logging_tot',
      of_which_logging_female: '7a_emp_logging_fem',
      of_which_logging_male: '7a_emp_logging_male',
      of_which_gathering_of_non_wood_forest_products_total: '7a_emp_nwfp_tot',
      of_which_gathering_of_non_wood_forest_products_female: '7a_emp_nwfp_fem',
      of_which_gathering_of_non_wood_forest_products_male: '7a_emp_nwfp_male',
      of_which_support_services_to_forestry_total: '7a_emp_support_tot',
      of_which_support_services_to_forestry_female: '7a_emp_support_fem',
      of_which_support_services_to_forestry_male: '7a_emp_support_male',
    },
  },

  {
    tableName: 'areaofpermanentforestestate',
    variableNames: {
      applicable: '6b_pfe_y_n',
      area_of_permanent_forest_estate: '6b_pfe_area',
    },
  },
  {
    tableName: 'carbonstocksoildepth',
    joinOn: 'cc.country_iso',
    variableNames: {
      soil_depth: '2d_soil_depth_cm',
    },
  },
  {
    tableName: 'degradedforest',
    joinOn: 'cc.country_iso',
    variableNames: {
      does_country_monitor: '5c_y_n',
    },
  },
  {
    tableName: 'forestpolicy',
    joinOn: 'cc.country_iso',
    variableNames: {
      national_policies_supporting_SFM: '6a_policies_national',
      sub_national_policies_supporting_SFM: '6a_policies_sub_national',
      national_legislations_supporting_SFM: '6a_legislation_national',
      sub_national_legislations_supporting_SFM: '6a_legislation_sub_national',
      national_platform_for_stakeholder_participation: '6a_platform_national',
      sub_national_platform_for_stakeholder_participation: '6a_platform_sub_national',
      national_existence_of_traceability_system: '6a_traceability_national',
      sub_national_existence_of_traceability_system: '6a_traceability_sub_national',
    },
  },
]
