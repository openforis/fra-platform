// @ts-nocheck
import { annualReforestation } from './sections/annualReforestation'
import { areaAffectedByFire } from './sections/areaAffectedByFire'
import { areaOfPermanentForestEstate } from './sections/areaOfPermanentForestEstate'
import { biomassStock } from './sections/biomassStock'
import { carbonStock } from './sections/carbonStock'
import { contactPersons } from './sections/contactPersons'
import { degradedForest } from './sections/degradedForest'
import { designatedManagementObjective } from './sections/designatedManagementObjective'
import { disturbances } from './sections/disturbances'
import { extentOfForest } from './sections/extentOfForest'
import { forestAreaChange } from './sections/forestAreaChange'
import { forestCharacteristics } from './sections/forestCharacteristics'
import { forestOwnership } from './sections/forestOwnership'
import { growingStock } from './sections/growingStock'
import { growingStockComposition } from './sections/growingStockComposition'
import { holderOfManagementRights } from './sections/holderOfManagementRights'
import { nonWoodForestProductsRemovals } from './sections/nonWoodForestProductsRemovals'
import { otherLandWithTreeCover } from './sections/otherLandWithTreeCover'
import { sustainableDevelopment } from './sections/sustainableDevelopment'
import { SectionSpec } from './sectionSpec'

export const FraSpecs: Record<string, SectionSpec> = {
  contactPersons,
  extentOfForest,
  forestCharacteristics,
  specificForestCategories: {
    sectionName: 'specificForestCategories',
    sectionAnchor: '1c',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'specificForestCategories',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'specificForestCategories.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                    migration: {
                      label: {
                        '2020': { key: 'fra.categoryHeader2020' },
                        '2025': { key: 'fra.categoryHeader2025' },
                      },
                    },
                  },
                  {
                    idx: 1,
                    colSpan: 5,
                    rowSpan: 1,
                    labelKey: 'specificForestCategories.areaUnitLabel',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 1990,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2000,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2010,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2015,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2020,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'specificForestCategories.primaryForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'specificForestCategories.primaryForest',
                variableExport: 'primary_forest',
                migration: {
                  validateFns: [
                    `validatorPrimaryForest(specificForestCategories.primaryForest, forestCharacteristics.naturalForestArea)`,
                  ],
                  cycles: ['2020'],
                },
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'specificForestCategories.temporarilyUnstocked',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'specificForestCategories.temporarilyUnstocked',
                variableExport: 'temporarily_unstocked',
                migration: {
                  cycles: ['2020'],
                },
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'specificForestCategories.bamboo',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'specificForestCategories.bamboo',
                variableExport: 'bamboo',
                migration: {
                  validateFns: [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, specificForestCategories.bamboo)`,
                  ],
                },
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    className: 'fra-table__category-cell',
                    migration: {
                      label: {
                        '2020': { key: 'specificForestCategories.mangroves' },
                        '2025': { key: 'fra.specificForestCategories.mangroves2025' },
                      },
                    },
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'specificForestCategories.mangroves',
                variableExport: 'mangroves',
                migration: {
                  validateFns: [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, specificForestCategories.mangroves)`,
                  ],
                },
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'specificForestCategories.rubberWood',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'specificForestCategories.rubberWood',
                variableExport: 'rubber_wood',
                migration: {
                  validateFns: [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, specificForestCategories.rubberWood)`,
                  ],
                },
              },
              {
                idx: 5,
                type: 'noticeMessage',
                cols: [
                  {
                    idx: 0,
                    colSpan: 7,
                    rowSpan: 1,
                    type: 'noticeMessage',
                    migration: {
                      label: {
                        '2025': { key: 'fra.specificForestCategories.mangrovesDisclaimer' },
                      },
                    },
                  },
                ],
                migration: {
                  cycles: ['2025'],
                },
              },
              {
                idx: 6,
                type: 'validationMessages',
                cols: [],
              },
            ],
            tableDataRequired: [
              {
                assessmentType: 'fra2020',
                sectionName: 'forestCharacteristics',
                tableName: 'forestCharacteristics',
              },
            ],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            unit: 'haThousand',
            columnsExport: [1990, 2000, 2010, 2015, 2020],
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: true,
      comments: true,
      introductoryText: false,
      nationalData: true,
    },
    dataExport: {
      included: true,
    },
    migration: {
      label: {
        '2020': { key: 'specificForestCategories.specificForestCategories' },
        '2025': { key: 'fra.specificForestCategories.specificForestCategories2025' },
      },
    },
  },
  forestAreaChange,
  annualReforestation,
  otherLandWithTreeCover,
  growingStock,
  growingStockComposition,
  biomassStock,
  carbonStock,
  designatedManagementObjective,
  forestAreaWithinProtectedAreas: {
    sectionName: 'forestAreaWithinProtectedAreas',
    sectionAnchor: '3b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'forestAreaWithinProtectedAreas',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'forestAreaWithinProtectedAreas.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                    migration: {
                      label: {
                        '2020': { key: 'fra.categoryHeader2020' },
                        '2025': { key: 'fra.categoryHeader2025' },
                      },
                    },
                  },
                  {
                    idx: 1,
                    colSpan: 9,
                    rowSpan: 1,
                    labelKey: 'forestAreaWithinProtectedAreas.areaUnitLabel',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 1990,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2000,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2010,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2015,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2016,
                    className: 'fra-table__header-cell',
                    type: 'header',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2017,
                    className: 'fra-table__header-cell',
                    type: 'header',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2018,
                    className: 'fra-table__header-cell',
                    type: 'header',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2019,
                    className: 'fra-table__header-cell',
                    type: 'header',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2020,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaWithinProtectedAreas.header',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'forestAreaWithinProtectedAreas.header',
                variableExport: 'forest_area_within_protected_areas',
                migration: {
                  validateFns: [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, forestAreaWithinProtectedAreas.forest_area_within_protected_areas)`,
                  ],
                },
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
                    className: 'fra-table__category-cell',
                    migration: {
                      label: {
                        '2020': { key: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan' },
                        '2025': { key: 'fra.forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan2025' },
                      },
                    },
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
                variableExport: 'forest_area_with_long_term_management_plan',
                migration: {
                  label: {
                    '2020': { key: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan' },
                    '2025': { key: 'fra.forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan2025' },
                  },
                  validateFns: [
                    `validatorNotGreaterThanForest(extentOfForest.forestArea, forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan)`,
                  ],
                },
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
                    className: 'fra-table__subcategory-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                    migration: {
                      cycles: ['2020'],
                    },
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
                variableExport: 'of_which_in_protected_areas',
                subcategory: true,
                migration: {
                  validateFns: [
                    `validatorSubCategory(forestAreaWithinProtectedAreas.forest_area_with_long_term_management_plan,[forestAreaWithinProtectedAreas.of_which_in_protected_areas])`,
                  ],
                  categoryLevel: 1,
                },
              },
              {
                idx: 3,
                type: 'noticeMessage',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: null,
                    type: 'noticeMessage',
                  },
                ],
              },
              {
                idx: 4,
                type: 'validationMessages',
                cols: [],
              },
            ],
            tableDataRequired: [
              {
                assessmentType: 'fra2020',
                sectionName: 'extentOfForest',
                tableName: 'extentOfForest',
              },
            ],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
            unit: 'haThousand',
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: true,
      comments: true,
      introductoryText: false,
      nationalData: true,
    },
    dataExport: {
      included: true,
    },
  },
  forestRestoration: {
    sectionName: 'forestRestoration',
    sectionAnchor: '3c',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'forestRestoration',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 2,
                    labelKey: 'fra.forestRestoration.hasYourCountryForestRestorationCommitments',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'select',
                    colName: 'answer',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                ],
                labelKey: 'fra.forestRestoration.hasYourCountryForestRestorationCommitments',
                variableExport: 'has_your_country_forest_restoration_commitments',
                variableName: 'has_your_country_forest_restoration_commitments',
                colSpan: 2,
                mainCategory: true,
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    rowSpan: 5,
                    labelKey: 'fra.forestRestoration.ifYes',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'placeholder',
                    labelKey: 'fra.forestRestoration.isThereALawOrOtherGovernmentMandateInSupportOfRestoration',
                  },
                  {
                    idx: 1,
                    colName: 'answer',
                    type: 'textarea',
                  },
                ],
                labelKey: 'fra.forestRestoration.ifYes',
                variableExport: 'law_or_other_mandate',
                variableName: 'law_or_other_mandate',
                rowSpan: 2,
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'fra.forestRestoration.isThereANationalDefinitionOfRestoration',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    colName: 'answer',
                    type: 'textarea',
                  },
                ],
                labelKey: 'fra.forestRestoration.isThereANationalDefinitionOfRestoration',
                variableExport: 'how_monitored',
                variableName: 'how_monitored',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'fra.forestRestoration.whatAreasInNeedOfRestorationHaveBeenIdentified',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'textarea',
                    colName: 'answer',
                  },
                ],
                labelKey: 'fra.forestRestoration.whatAreasInNeedOfRestorationHaveBeenIdentified',
                variableName: 'areas_in_need_of_restoration',
                variableExport: 'areas_in_need_of_restoration',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'fra.forestRestoration.whatAreTheTargetsSetForTheRestoration',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'textarea',
                    colName: 'answer',
                  },
                ],
                labelKey: 'fra.forestRestoration.whatAreTheTargetsSetForTheRestoration',
                variableName: 'restoration_targets',
                variableExport: 'restoration_targets',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'fra.forestRestoration.howManyHectaresOfForestHaveBeenRestoredToDate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'textarea',
                    colName: 'answer',
                  },
                ],
                labelKey: 'fra.forestRestoration.howManyHectaresOfForestHaveBeenRestoredToDate',
                variableExport: 'hectares_restored',
                variableName: 'hectares_restored',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: [
              'has_your_country_forest_restoration_commitments',
              'law_or_other_mandate',
              'how_monitored',
              'areas_in_need_of_restoration',
              'restoration_targets',
              'hectares_restored',
            ],
            migration: {
              columnNames: {
                '2020': [],
                '2025': ['national_yes_no', 'sub_national_yes_no'],
              },
            },
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: false,
      comments: true,
      introductoryText: false,
      nationalData: false,
    },
    dataExport: {
      included: false,
    },
    migration: {
      label: {
        '2025': { key: 'fra.forestRestoration.forestRestoration' },
      },
      cycles: ['2025'],
    },
  },
  forestOwnership,
  holderOfManagementRights,
  disturbances,
  areaAffectedByFire,
  degradedForest,
  forestPolicy: {
    sectionName: 'forestPolicy',
    sectionAnchor: '6a',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'forestPolicy',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'forestPolicy.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 2,
                    rowSpan: 1,
                    labelKey: 'forestPolicy.areaUnitLabel',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'forestPolicy.national',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'forestPolicy.subnational',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestPolicy.policiesSFM',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                  {
                    idx: 1,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                ],
                labelKey: 'forestPolicy.policiesSFM',
                variableExport: 'policies_supporting_SFM',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestPolicy.legislationsSFM',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                  {
                    idx: 1,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                ],
                labelKey: 'forestPolicy.legislationsSFM',
                variableExport: 'legislations_supporting_SFM',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestPolicy.stakeholderParticipation',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                  {
                    idx: 1,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                ],
                labelKey: 'forestPolicy.stakeholderParticipation',
                variableExport: 'platform_for_stakeholder_participation',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestPolicy.existenceOfTraceabilitySystem',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                  {
                    idx: 1,
                    type: 'select',
                    options: [
                      {
                        optionName: 'yes',
                      },
                      {
                        optionName: 'no',
                      },
                    ],
                    optionsLabelKeyPrefix: 'yesNoTextSelect',
                  },
                ],
                labelKey: 'forestPolicy.existenceOfTraceabilitySystem',
                variableExport: 'existence_of_traceability_system',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: ['national_yes_no', 'sub_national_yes_no'],
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: false,
      comments: true,
      introductoryText: false,
      nationalData: true,
    },
    dataExport: {
      included: true,
    },
  },
  areaOfPermanentForestEstate,
  employment: {
    sectionName: 'employment',
    sectionAnchor: '7a',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'employment',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 3,
                    labelKey: 'employment.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 12,
                    rowSpan: 1,
                    labelKey: 'employment.unitHeader',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_2',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 9,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 10,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 11,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'employment.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'employment.inForestry',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                    validator: null,
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                    validator: null,
                  },
                ],
                labelKey: 'employment.inForestry',
                variableExport: 'employment_in_forestry_and_logging',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'employment.ofWhichSilviculture',
                    className: 'fra-table__subcategory-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'employment.ofWhichSilviculture',
                variableExport: 'of_which_silviculture_and_other_forestry_activities',
                subcategory: true,
                migration: {
                  validateFns: [
                    `validatorSubCategory(employment.employment_in_forestry_and_logging,[employment.of_which_silviculture_and_other_forestry_activities,employment.of_which_logging,employment.of_which_gathering_of_non_wood_forest_products,employment.of_which_support_services_to_forestry])`,
                  ],
                  categoryLevel: 1,
                },
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'employment.ofWhichLogging',
                    className: 'fra-table__subcategory-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'employment.ofWhichLogging',
                variableExport: 'of_which_logging',
                subcategory: true,
                migration: {
                  validateFns: [
                    `validatorSubCategory(employment.employment_in_forestry_and_logging,[employment.of_which_silviculture_and_other_forestry_activities,employment.of_which_logging,employment.of_which_gathering_of_non_wood_forest_products,employment.of_which_support_services_to_forestry])`,
                  ],
                  categoryLevel: 1,
                },
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'employment.ofWhichGathering',
                    className: 'fra-table__subcategory-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'employment.ofWhichGathering',
                variableExport: 'of_which_gathering_of_non_wood_forest_products',
                subcategory: true,
                migration: {
                  validateFns: [
                    `validatorSubCategory(employment.employment_in_forestry_and_logging,[employment.of_which_silviculture_and_other_forestry_activities,employment.of_which_logging,employment.of_which_gathering_of_non_wood_forest_products,employment.of_which_support_services_to_forestry])`,
                  ],
                  categoryLevel: 1,
                },
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'employment.ofWhichSupport',
                    className: 'fra-table__subcategory-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'employment.ofWhichSupport',
                variableExport: 'of_which_support_services_to_forestry',
                subcategory: true,
                migration: {
                  validateFns: [
                    `validatorSubCategory(employment.employment_in_forestry_and_logging,[employment.of_which_silviculture_and_other_forestry_activities,employment.of_which_logging,employment.of_which_gathering_of_non_wood_forest_products,employment.of_which_support_services_to_forestry])`,
                  ],
                  categoryLevel: 1,
                },
              },
              {
                idx: 5,
                type: 'noticeMessage',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: null,
                    type: 'noticeMessage',
                  },
                ],
              },
              {
                idx: 6,
                type: 'validationMessages',
                cols: [],
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: [
              '1990_total',
              '1990_female',
              '1990_male',
              '2000_total',
              '2000_female',
              '2000_male',
              '2010_total',
              '2010_female',
              '2010_male',
              '2015_total',
              '2015_female',
              '2015_male',
            ],
            unit: 'fte1000',
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: false,
      comments: true,
      introductoryText: false,
      nationalData: true,
    },
    dataExport: {
      included: true,
    },
    migration: {
      cycles: ['2020'],
    },
  },
  graduationOfStudents: {
    sectionName: 'graduationOfStudents',
    sectionAnchor: '7b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'graduationOfStudents',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 3,
                    labelKey: 'graduationOfStudents.fra2020Categories',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 12,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.numberOfStudents',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 3,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_2',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 9,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.total',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 10,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.female',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 11,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'graduationOfStudents.male',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'graduationOfStudents.doctoralDegree',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'graduationOfStudents.doctoralDegree',
                variableExport: 'doctoral_degree',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'graduationOfStudents.mastersDegree',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'graduationOfStudents.mastersDegree',
                variableExport: 'masters_degree',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'graduationOfStudents.bachelorsDegree',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'graduationOfStudents.bachelorsDegree',
                variableExport: 'bachelors_degree',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'graduationOfStudents.technicianCertificate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'graduationOfStudents.technicianCertificate',
                variableExport: 'technician_certificate',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'graduationOfStudents.total',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                ],
                labelKey: 'graduationOfStudents.total',
                variableExport: 'total',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: [
              '1990_total',
              '1990_female',
              '1990_male',
              '2000_total',
              '2000_female',
              '2000_male',
              '2010_total',
              '2010_female',
              '2010_male',
              '2015_total',
              '2015_female',
              '2015_male',
            ],
            unit: 'numberOfStudents',
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      analysisAndProcessing: false,
      comments: true,
      introductoryText: false,
      nationalData: true,
    },
    dataExport: {
      included: true,
    },
    migration: {
      cycles: ['2020'],
    },
  },
  nonWoodForestProductsRemovals,
  sustainableDevelopment,
  contentCheck: {
    sectionName: 'contentCheck',
    sectionAnchor: '',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'extent',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.extent.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2020',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.forest_area',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.forest_area',
                variableExport: 'forest_area',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.other_wooded_land',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.other_wooded_land',
                variableExport: 'other_wooded_land',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.primary_forest_percent',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.primary_forest_percent',
                variableExport: 'primary_forest_percent',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.protected_forest_percent',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.protected_forest_percent',
                variableExport: 'protected_forest_percent',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.management_plan_percent',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.management_plan_percent',
                variableExport: 'management_plan_percent',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.certified_area',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.certified_area',
                variableExport: 'certified_area',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.mangroves',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.mangroves',
                variableExport: 'mangroves',
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.extent.bamboo',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.extent.bamboo',
                variableExport: 'bamboo',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'periodicChangeRate',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.periodicChangeRate.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990-2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000-2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010-2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015-2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016-2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017-2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018-2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019-2020',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.forest_area_annual_net_change',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.forest_area_annual_net_change',
                variableExport: 'forest_area_annual_net_change',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.forest_area_annual_net_change_rate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.forest_area_annual_net_change_rate',
                variableExport: 'forest_area_annual_net_change_rate',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.other_wooded_land_annual_net_change',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.other_wooded_land_annual_net_change',
                variableExport: 'other_wooded_land_annual_net_change',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.other_wooded_land_annual_net_change_rate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.other_wooded_land_annual_net_change_rate',
                variableExport: 'other_wooded_land_annual_net_change_rate',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.primary_forest_annual_net_change',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.primary_forest_annual_net_change',
                variableExport: 'primary_forest_annual_net_change',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.primary_forest_annual_net_change_rate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.primary_forest_annual_net_change_rate',
                variableExport: 'primary_forest_annual_net_change_rate',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.natural_forest_area_annual_net_change',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.natural_forest_area_annual_net_change',
                variableExport: 'natural_forest_area_annual_net_change',
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.natural_forest_area_annual_net_change_rate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.natural_forest_area_annual_net_change_rate',
                variableExport: 'natural_forest_area_annual_net_change_rate',
              },
              {
                idx: 8,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.planted_forest_annual_net_change',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.planted_forest_annual_net_change',
                variableExport: 'planted_forest_annual_net_change',
              },
              {
                idx: 9,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.periodicChangeRate.planted_forest_annual_net_change_rate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.periodicChangeRate.planted_forest_annual_net_change_rate',
                variableExport: 'planted_forest_annual_net_change_rate',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'primaryDesignatedManagementObjective',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2020',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.production',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.production',
                variableExport: 'production',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.protection_of_soil_and_water',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.protection_of_soil_and_water',
                variableExport: 'protection_of_soil_and_water',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.conservation_of_biodiversity',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.conservation_of_biodiversity',
                variableExport: 'conservation_of_biodiversity',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.social_services',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.social_services',
                variableExport: 'social_services',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.multiple_use',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.multiple_use',
                variableExport: 'multiple_use',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.other',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.other',
                variableExport: 'other',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.primaryDesignatedManagementObjective.no_unknown',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.primaryDesignatedManagementObjective.no_unknown',
                variableExport: 'no_unknown',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'forestGrowingStockBiomassCarbon',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2020',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest',
                variableExport: 'forest',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_above_ground',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_above_ground',
                variableExport: 'forest_above_ground',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_below_ground',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_below_ground',
                variableExport: 'forest_below_ground',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_deadwood',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.forest_deadwood',
                variableExport: 'forest_deadwood',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_above_ground',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_above_ground',
                variableExport: 'carbon_forest_above_ground',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_below_ground',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_below_ground',
                variableExport: 'carbon_forest_below_ground',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_deadwood',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_deadwood',
                variableExport: 'carbon_forest_deadwood',
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_litter',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_litter',
                variableExport: 'carbon_forest_litter',
              },
              {
                idx: 8,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_soil',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_forest_soil',
                variableExport: 'carbon_forest_soil',
              },
              {
                idx: 9,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.above_ground_biomass_growing_stock_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.above_ground_biomass_growing_stock_ratio',
                variableExport: 'above_ground_biomass_growing_stock_ratio',
              },
              {
                idx: 10,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.root_shoot_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.root_shoot_ratio',
                variableExport: 'root_shoot_ratio',
              },
              {
                idx: 11,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_deadwood_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_deadwood_ratio',
                variableExport: 'carbon_biomass_deadwood_ratio',
              },
              {
                idx: 12,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_above_ground_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_above_ground_ratio',
                variableExport: 'carbon_biomass_above_ground_ratio',
              },
              {
                idx: 13,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_below_ground_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.carbon_biomass_below_ground_ratio',
                variableExport: 'carbon_biomass_below_ground_ratio',
              },
              {
                idx: 14,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.dead_living_mass_ratio',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestGrowingStockBiomassCarbon.dead_living_mass_ratio',
                variableExport: 'dead_living_mass_ratio',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'forestOwnership',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.forestOwnership.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestOwnership.private_ownership',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestOwnership.private_ownership',
                variableExport: 'private_ownership',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestOwnership.public_ownership',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestOwnership.public_ownership',
                variableExport: 'public_ownership',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.forestOwnership.other_or_unknown',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.forestOwnership.other_or_unknown',
                variableExport: 'other_or_unknown',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'holderOfManagementRights',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.holderOfManagementRights.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.holderOfManagementRights.public_administration',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.holderOfManagementRights.public_administration',
                variableExport: 'public_administration',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.holderOfManagementRights.individuals',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.holderOfManagementRights.individuals',
                variableExport: 'individuals',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.holderOfManagementRights.private_businesses',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.holderOfManagementRights.private_businesses',
                variableExport: 'private_businesses',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.holderOfManagementRights.communities',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.holderOfManagementRights.communities',
                variableExport: 'communities',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.holderOfManagementRights.other',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.holderOfManagementRights.other',
                variableExport: 'other',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'disturbances',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'contentCheck.disturbances.title',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 'header_1',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2001',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2002',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2003',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2004',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2005',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2006',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2007',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2008',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 9,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2009',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 10,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 11,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2011',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 12,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2012',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 13,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2013',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 14,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2014',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 15,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 16,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 17,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                ],
                type: 'header',
              },
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.disturbances.insects',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                  {
                    idx: 12,
                    type: 'decimal',
                  },
                  {
                    idx: 13,
                    type: 'decimal',
                  },
                  {
                    idx: 14,
                    type: 'decimal',
                  },
                  {
                    idx: 15,
                    type: 'decimal',
                  },
                  {
                    idx: 16,
                    type: 'decimal',
                  },
                  {
                    idx: 17,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.disturbances.insects',
                variableExport: 'insects',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.disturbances.diseases',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                  {
                    idx: 12,
                    type: 'decimal',
                  },
                  {
                    idx: 13,
                    type: 'decimal',
                  },
                  {
                    idx: 14,
                    type: 'decimal',
                  },
                  {
                    idx: 15,
                    type: 'decimal',
                  },
                  {
                    idx: 16,
                    type: 'decimal',
                  },
                  {
                    idx: 17,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.disturbances.diseases',
                variableExport: 'diseases',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.disturbances.severe_weather_events',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                  {
                    idx: 12,
                    type: 'decimal',
                  },
                  {
                    idx: 13,
                    type: 'decimal',
                  },
                  {
                    idx: 14,
                    type: 'decimal',
                  },
                  {
                    idx: 15,
                    type: 'decimal',
                  },
                  {
                    idx: 16,
                    type: 'decimal',
                  },
                  {
                    idx: 17,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.disturbances.severe_weather_events',
                variableExport: 'severe_weather_events',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'contentCheck.disturbances.other',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                  {
                    idx: 1,
                    type: 'decimal',
                  },
                  {
                    idx: 2,
                    type: 'decimal',
                  },
                  {
                    idx: 3,
                    type: 'decimal',
                  },
                  {
                    idx: 4,
                    type: 'decimal',
                  },
                  {
                    idx: 5,
                    type: 'decimal',
                  },
                  {
                    idx: 6,
                    type: 'decimal',
                  },
                  {
                    idx: 7,
                    type: 'decimal',
                  },
                  {
                    idx: 8,
                    type: 'decimal',
                  },
                  {
                    idx: 9,
                    type: 'decimal',
                  },
                  {
                    idx: 10,
                    type: 'decimal',
                  },
                  {
                    idx: 11,
                    type: 'decimal',
                  },
                  {
                    idx: 12,
                    type: 'decimal',
                  },
                  {
                    idx: 13,
                    type: 'decimal',
                  },
                  {
                    idx: 14,
                    type: 'decimal',
                  },
                  {
                    idx: 15,
                    type: 'decimal',
                  },
                  {
                    idx: 16,
                    type: 'decimal',
                  },
                  {
                    idx: 17,
                    type: 'decimal',
                  },
                ],
                labelKey: 'contentCheck.disturbances.other',
                variableExport: 'other',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
        ],
      },
    ],
    showTitle: false,
    descriptions: {
      analysisAndProcessing: false,
      comments: false,
      introductoryText: false,
      nationalData: false,
    },
    dataExport: {
      included: false,
    },
  },
}
