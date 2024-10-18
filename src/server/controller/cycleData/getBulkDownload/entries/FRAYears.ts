import { Cycle, TableNames } from 'meta/assessment'

export const entries = (
  cycle: Cycle
): Array<{ tableName: string; variables: Array<{ csvColumn: string; variableName: string }> }> => {
  const graduationOfStudents =
    cycle.name === '2020'
      ? [
          {
            tableName: 'graduationOfStudents',
            variables: [
              {
                variableName: 'doctoral_degree',
                csvColumn: '7b_phd',
              },

              {
                variableName: 'masters_degree',
                csvColumn: '7b_msc',
              },

              {
                variableName: 'bachelors_degree',
                csvColumn: '7b_ba',
              },

              {
                variableName: 'technician_certificate',
                csvColumn: '7b_tech',
              },

              {
                variableName: 'total',
                csvColumn: '7b_total',
              },
            ],
          },
        ]
      : []

  const carbonStock = {
    tableName: cycle.name === '2020' ? 'carbonStock' : 'carbonStockAvg',
    variables: [
      {
        variableName: 'carbon_forest_above_ground',
        csvColumn: '2d_carbon_agb',
      },
      {
        variableName: 'carbon_forest_below_ground',
        csvColumn: '2d_carbon_bgb',
      },
      {
        variableName: 'carbon_forest_deadwood',
        csvColumn: '2d_carbon_dw',
      },
      {
        variableName: 'carbon_forest_litter',
        csvColumn: '2d_carbon_litter',
      },
      {
        variableName: 'carbon_forest_soil',
        csvColumn: '2d_carbon_soil',
      },
    ],
  }

  const degradedForest = {
    tableName: cycle.name === '2020' ? 'degradedForest' : 'degradedForestMonitoring2025',
    variables: [
      {
        variableName: cycle.name === '2020' ? 'does_country_monitor' : 'doesYourCountryMonitor',
        csvColumn: '5c_y_n',
      },
    ],
  }

  const employment =
    cycle.name === '2020'
      ? [
          {
            tableName: 'employment',
            variables: [
              {
                variableName: 'employment_in_forestry_and_logging',
                csvColumn: '7a_employment',
              },
              {
                variableName: 'of_which_silviculture_and_other_forestry_activities',
                csvColumn: '7a_emp_forestry',
              },
              {
                variableName: 'of_which_logging',
                csvColumn: '7a_emp_logging',
              },
              {
                variableName: 'of_which_gathering_of_non_wood_forest_products',
                csvColumn: '7a_emp_nwfp',
              },
              {
                variableName: 'of_which_support_services_to_forestry',
                csvColumn: '7a_emp_support',
              },
            ],
          },
        ]
      : []

  const biomassStock = {
    tableName: cycle.name === '2020' ? 'biomassStock' : 'biomassStockAvg',
    variables: [
      {
        variableName: 'forest_above_ground',
        csvColumn: '2c_agb',
      },
      {
        variableName: 'forest_below_ground',
        csvColumn: '2c_bgb',
      },
      {
        variableName: 'forest_deadwood',
        csvColumn: '2c_dwb',
      },
    ],
  }

  const growingStockComposition = {
    tableName: cycle.name === '2020' ? 'growingStockComposition' : 'growingStockComposition2025',
    variables: [
      ...Array.from({ length: 10 }, (_, i) => ({
        variableName: `native${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
        csvColumn: `2b_native_#${i + 1}`,
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_native' : 'remainingNative',
        csvColumn: '2b_native_remaining',
      },
      {
        variableName: cycle.name === '2020' ? 'total_native_placeholder' : 'totalNative',
        csvColumn: '2b_native_total',
      },
      ...Array.from({ length: 5 }, (_, i) => ({
        variableName: `introduced${cycle.name === '2020' ? '_r' : 'R'}ank${i + 1}`,
        csvColumn: `2b_introduced_#${i + 1}`,
      })),
      {
        variableName: cycle.name === '2020' ? 'remaining_introduced_placeholder' : 'remainingIntroduced',
        csvColumn: '2b_introduced_remaining',
      },
      {
        variableName: 'totalIntroduced',
        csvColumn: '2b_introduced_total',
      },
      {
        variableName: 'totalGrowingStock',
        csvColumn: '2b_total_gs',
      },
    ],
  }
  const otherLandWithTreeCover =
    cycle.name === '2020'
      ? [
          {
            tableName: 'otherLandWithTreeCover',
            variables: [
              {
                variableName: 'palms',
                csvColumn: '1f_palms',
              },
              {
                variableName: 'tree_orchards',
                csvColumn: '1f_treeOrchards',
              },
              {
                variableName: 'agroforestry',
                csvColumn: '1f_agroforestry',
              },
              {
                variableName: 'other',
                csvColumn: '1f_other',
              },
              {
                variableName: 'trees_in_urban_settings',
                csvColumn: '1f_treesUrbanSettings',
              },
            ],
          },
        ]
      : [
          {
            tableName: 'otherLandWithTreeCover',
            variables: [
              {
                variableName: 'palms',
                csvColumn: '1e_palms',
              },
              {
                variableName: 'tree_orchards',
                csvColumn: '1e_treeOrchards',
              },
              {
                variableName: 'agroforestry',
                csvColumn: '1e_agroforestry',
              },
              {
                variableName: 'trees_in_urban_settings',
                csvColumn: '1e_treesUrbanSettings',
              },
              {
                variableName: 'other',
                csvColumn: '1e_other',
              },
            ],
          },
        ]

  const specificForestCategoriesVariables =
    cycle.name === '2020'
      ? [
          {
            variableName: 'primary_forest',
            csvColumn: '1c_primary',
          },
          {
            variableName: 'temporarily_unstocked',
            csvColumn: '1c_tempUnstocked',
          },
        ]
      : []

  const forestCharacteristicsVariables =
    cycle.name === '2020'
      ? []
      : [
          {
            variableName: 'primaryForest',
            csvColumn: '1b_primary',
          },
        ]

  const primaryDesignatedManagementObjectiveVariables =
    cycle.name === '2020'
      ? [
          {
            variableName: 'no_unknown',
            csvColumn: '3a_prim_no_unknown',
          },
        ]
      : [
          {
            variableName: 'no_designation',
            csvColumn: '3a_prim_no',
          },
          {
            variableName: 'unknown',
            csvColumn: '3a_prim_unknown',
          },
        ]

  const forestOwnershipVariables =
    cycle.name === '2020'
      ? [
          {
            variableName: 'other_or_unknown',
            csvColumn: '4a_fo_unknown',
          },
        ]
      : [
          {
            variableName: 'other',
            csvColumn: '4a_fo_other',
          },
          {
            variableName: 'unknown',
            csvColumn: '4a_fo_unknown',
          },
        ]

  const growingStockAvgVariables =
    cycle.name === '2020'
      ? []
      : [
          {
            variableName: 'primaryForest',
            csvColumn: '2a_gs_ha_primary',
          },
          {
            variableName: 'plantationForestIntroducedArea',
            csvColumn: '2a_gs_ha_introduced',
          },
        ]

  const growingStockTotalVariables =
    cycle.name === '2020'
      ? []
      : [
          {
            variableName: 'primaryForest',
            csvColumn: '2a_gs_total_primary',
          },
          {
            variableName: 'plantationForestIntroducedArea',
            csvColumn: '2a_gs_total_introduced',
          },
        ]

  const arr = [
    {
      tableName: TableNames.extentOfForest,
      variables: [
        {
          variableName: 'forestArea',
          csvColumn: '1a_forestArea',
        },
        {
          variableName: 'otherWoodedLand',
          csvColumn: '1a_otherWoodedLand',
        },
        {
          variableName: 'totalLandArea',
          csvColumn: '1a_landArea',
        },
      ],
    },
    {
      tableName: TableNames.forestCharacteristics,
      variables: [
        {
          variableName: 'naturalForestArea',
          csvColumn: '1b_naturallyRegeneratingForest',
        },
        ...forestCharacteristicsVariables,
        {
          variableName: 'plantedForest',
          csvColumn: '1b_plantedForest',
        },
        {
          variableName: 'plantationForestArea',
          csvColumn: '1b_plantationForest',
        },
        {
          variableName: 'plantationForestIntroducedArea',
          csvColumn: '1b_plantationForestIntroduced',
        },
        {
          variableName: 'otherPlantedForestArea',
          csvColumn: '1b_otherPlantedForest',
        },
      ],
    },
    {
      tableName: 'specificForestCategories',
      variables: [
        ...specificForestCategoriesVariables,
        {
          variableName: 'bamboo',
          csvColumn: '1c_bamboos',
        },
        {
          variableName: 'mangroves',
          csvColumn: '1c_mangroves',
        },
        {
          variableName: 'rubber_wood',
          csvColumn: '1c_rubber',
        },
      ],
    },
    ...otherLandWithTreeCover,
    {
      tableName: 'growingStockAvg',
      variables: [
        {
          variableName: 'naturallyRegeneratingForest',
          csvColumn: '2a_gs_ha_nat_reg',
        },
        ...growingStockAvgVariables,
        {
          variableName: 'forest',
          csvColumn: '2a_gs_ha_forest',
        },
        {
          variableName: 'plantationForest',
          csvColumn: '2a_gs_ha_plantation',
        },
        {
          variableName: 'plantedForest',
          csvColumn: '2a_gs_ha_planted',
        },
        {
          variableName: 'otherWoodedLand',
          csvColumn: '2a_gs_ha_owl',
        },
        {
          variableName: 'otherPlantedForest',
          csvColumn: '2a_gs_ha_other_planted',
        },
      ],
    },
    {
      tableName: 'growingStockTotal',
      variables: [
        {
          variableName: 'naturallyRegeneratingForest',
          csvColumn: '2a_gs_tot_nat_reg',
        },
        ...growingStockTotalVariables,
        {
          variableName: 'plantedForest',
          csvColumn: '2a_gs_tot_planted',
        },
        {
          variableName: 'plantationForest',
          csvColumn: '2a_gs_tot_plantation',
        },
        {
          variableName: 'otherPlantedForest',
          csvColumn: '2a_gs_tot_other_planted',
        },
        {
          variableName: 'forest',
          csvColumn: '2a_gs_tot_forest',
        },
        {
          variableName: 'otherWoodedLand',
          csvColumn: '2a_gs_tot_owl',
        },
      ],
    },
    growingStockComposition,
    biomassStock,
    carbonStock,
    {
      tableName: 'carbonStockSoilDepth',
      variables: [
        {
          variableName: 'soil_depth',
          csvColumn: '2d_soil_depth_cm',
        },
      ],
    },
    {
      tableName: 'primaryDesignatedManagementObjective',
      variables: [
        {
          variableName: 'production',
          csvColumn: '3a_prim_prod',
        },
        {
          variableName: 'protection_of_soil_and_water',
          csvColumn: '3a_prim_prot',
        },
        {
          variableName: 'conservation_of_biodiversity',
          csvColumn: '3a_prim_biodiv',
        },
        {
          variableName: 'social_services',
          csvColumn: '3a_prim_socserv',
        },
        {
          variableName: 'multiple_use',
          csvColumn: '3a_prim_multi',
        },
        {
          variableName: 'other',
          csvColumn: '3a_prim_other',
        },
        ...primaryDesignatedManagementObjectiveVariables,
      ],
    },
    {
      tableName: 'totalAreaWithDesignatedManagementObjective',
      variables: [
        {
          variableName: 'production',
          csvColumn: '3a_tot_prod',
        },
        {
          variableName: 'protection_of_soil_and_water',
          csvColumn: '3a_tot_prot',
        },
        {
          variableName: 'conservation_of_biodiversity',
          csvColumn: '3a_tot_biodiv',
        },
        {
          variableName: 'social_services',
          csvColumn: '3a_tot_socserv',
        },
        {
          variableName: 'other',
          csvColumn: '3a_tot_other',
        },
      ],
    },
    {
      tableName: 'forestAreaWithinProtectedAreas',
      variables: [
        {
          variableName: 'forest_area_within_protected_areas',
          csvColumn: '3b_protected',
        },
        {
          variableName: 'forest_area_with_long_term_management_plan',
          csvColumn: '3b_forMngt',
        },
        {
          variableName: 'of_which_in_protected_areas',
          csvColumn: '3b_mngtProt',
        },
      ],
    },
    {
      tableName: 'forestOwnership',
      variables: [
        {
          variableName: 'private_ownership',
          csvColumn: '4a_priv_own',
        },

        ...[
          ...(cycle.name === '2020'
            ? [
                {
                  variableName: 'of_which_by_individuals',
                  csvColumn: '4a_individ',
                },
              ]
            : []),
        ],
        {
          variableName: 'of_which_by_private_businesses',
          csvColumn: '4a_bus_inst_fo',
        },
        {
          variableName: 'of_which_by_communities',
          csvColumn: '4a_indigenous_fo',
        },
        {
          variableName: 'public_ownership',
          csvColumn: '4a_pub_own',
        },
        ...forestOwnershipVariables,
      ],
    },
    {
      tableName: 'holderOfManagementRights',
      variables: [
        {
          variableName: 'public_administration',
          csvColumn: '4b_pub_admin',
        },
        ...[
          ...(cycle.name === '2020'
            ? [
                {
                  variableName: 'individuals',
                  csvColumn: '4b_individuals',
                },
              ]
            : []),
        ],
        {
          variableName: 'private_businesses',
          csvColumn: '4b_bus_inst_mr',
        },
        {
          variableName: 'communities',
          csvColumn: '4b_indigenous_mr',
        },
        {
          variableName: cycle.name === '2020 ' ? 'other' : 'unknown',
          csvColumn: '4b_unknown',
        },
      ],
    },
    degradedForest,
    {
      tableName: 'forestPolicy',
      variables: [
        {
          variableName: 'national_policies_supporting_SFM',
          csvColumn: '6a_policies_national',
        },
        {
          variableName: 'sub_national_policies_supporting_SFM',
          csvColumn: '6a_policies_sub_national',
        },
        {
          variableName: 'national_legislations_supporting_SFM',
          csvColumn: '6a_legislation_national',
        },
        {
          variableName: 'sub_national_legislations_supporting_SFM',
          csvColumn: '6a_legislation_sub_national',
        },
        {
          variableName: 'national_platform_for_stakeholder_participation',
          csvColumn: '6a_platform_national',
        },
        {
          variableName: 'sub_national_platform_for_stakeholder_participation',
          csvColumn: '6a_platform_sub_national',
        },
        {
          variableName: 'national_existence_of_traceability_system',
          csvColumn: '6a_traceability_national',
        },
        {
          variableName: 'sub_national_existence_of_traceability_system',
          csvColumn: '6a_traceability_sub_national',
        },
      ],
    },
    {
      tableName: 'areaOfPermanentForestEstate',
      variables: [
        {
          variableName: 'applicable',
          csvColumn: '6b_pfe_y_n',
        },
        {
          variableName: 'area_of_permanent_forest_estate',
          csvColumn: '6b_pfe_area',
        },
      ],
    },
    ...graduationOfStudents,
    ...employment,
  ]

  return arr
}
