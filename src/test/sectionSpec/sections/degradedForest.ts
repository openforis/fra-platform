// @ts-nocheck
import { SectionSpec } from '../sectionSpec'

export const degradedForest: SectionSpec = {
  sectionName: 'degradedForest',
  sectionAnchor: '5c',
  tableSections: [
    {
      titleKey: 'fra.degradedForest.degradedForestDefinition',
      tableSpecs: [
        {
          name: 'degradedForest',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 2,
                  labelKey: 'fra.degradedForest.doesYourCountryMonitor',
                  className: 'fra-table__header-cell-left',
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
              ],
              labelKey: 'fra.degradedForest.doesYourCountryMonitor',
              variableExport: 'does_country_monitor',
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
                  rowSpan: 2,
                  labelKey: 'fra.degradedForest.ifYes',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'placeholder',
                  labelKey: 'fra.degradedForest.whatIsDefinition',
                },
                {
                  idx: 1,
                  type: 'textarea',
                },
              ],
              labelKey: 'fra.degradedForest.ifYes',
              variableExport: 'national_definition',
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
                  labelKey: 'fra.degradedForest.howMonitored',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'textarea',
                },
              ],
              labelKey: 'fra.degradedForest.howMonitored',
              variableExport: 'how_monitored',
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
      migration: {
        cycles: ['2020'],
      },
    }, // 2020
    {
      titleKey: 'fra.degradedForest.degradedForestDefinition',
      tableSpecs: [
        {
          name: 'degradedForest2025',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 2,
                  labelKey: 'fra.degradedForest.hasNationalDefinitionOfDegradedForest',
                  className: 'fra-table__header-cell-left',
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
                  colName: 'hasNationalDefinitionOfDegradedForest',
                },
              ],
              labelKey: 'fra.degradedForest.hasNationalDefinitionOfDegradedForest',
              variableExport: 'hasNationalDefinitionOfDegradedForest',
              variableName: 'hasNationalDefinitionOfDegradedForest',
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
                  rowSpan: 2,
                  labelKey: 'fra.degradedForest.ifYes',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'placeholder',
                  labelKey: 'fra.degradedForest.whatIsDefinition',
                },
                {
                  idx: 1,
                  type: 'textarea',
                  colName: 'national_definition',
                },
              ],
              labelKey: 'fra.degradedForest.ifYes',
              variableExport: 'national_definition',
              rowSpan: 2,
              variableName: 'national_definition',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'fra.degradedForest.criteriaOfDegradedForest',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'multiselect',
                  options: [
                    { optionName: 'changeInForestStructureDecreaseInForestCanopy' },
                    { optionName: 'forestDisturbances' },
                    { optionName: 'lossOfProductivityAndForestGoods' },
                    { optionName: 'lossOfForestServices' },
                    { optionName: 'lossOfCarbonBiomassAndGrowingStock' },
                    { optionName: 'lossOfBiologicalDiversity' },
                    { optionName: 'soilDamageErosion' },
                    { optionName: 'other' },
                  ],
                  optionsLabelKeyPrefix: 'fra.degradedForest',
                  colName: 'criteriaOfDegradedForest',
                },
              ],
              variableName: 'criteriaOfDegradedForest',
              labelKey: 'fra.degradedForest.criteriaOfDegradedForest',
              variableExport: 'criteriaOfDegradedForest',
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          migration: {
            columnNames: {
              '2025': ['hasNationalDefinitionOfDegradedForest', 'national_definition', 'criteriaOfDegradedForest'],
            },
          },
        },
      ],
      migration: {
        cycles: ['2025'],
      },
    }, // 2025
    {
      titleKey: 'fra.degradedForest.forestDegradationMonitoringAndAssessment',
      tableSpecs: [
        {
          name: 'degradedForestMonitoring2025',
          rows: [
            {
              idx: 0,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 2,
                  labelKey: 'fra.degradedForest.doesYourCountryMonitor',
                  className: 'fra-table__header-cell-left',
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
                  colName: 'doesYourCountryMonitor',
                },
              ],
              labelKey: 'fra.degradedForestMonitoring.doesYourCountryMonitor',
              variableExport: 'doesYourCountryMonitor',
              variableName: 'doesYourCountryMonitor',
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
                  rowSpan: 2,
                  labelKey: 'fra.degradedForest.ifYes',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'placeholder',
                  labelKey: 'fra.degradedForest.mainMethods',
                },
                {
                  idx: 1,
                  type: 'multiselect',
                  options: [
                    { optionName: 'fieldInventoryAndObservations' },
                    { optionName: 'wallToWallRemoteSensingMapping' },
                    { optionName: 'remoteSensingSurvey' },
                    { optionName: 'expertOpinion' },
                    { optionName: 'productionHarvestData' },
                    { optionName: 'forestManagementPlanReport' },
                    { optionName: 'underDevelopment' },
                    { optionName: 'other' },
                  ],
                  optionsLabelKeyPrefix: 'fra.degradedForest',
                  colName: 'mainMethods',
                },
              ],
              labelKey: 'fra.degradedForest.mainMethods',
              variableExport: 'mainMethods',
              rowSpan: 2,
              variableName: 'mainMethods',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'fra.degradedForest.monitoringScale',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'select',
                  options: [
                    { optionName: 'national' },
                    { optionName: 'subnational' },
                    { optionName: 'biome' },
                    { optionName: 'standLocal' },
                  ],
                  optionsLabelKeyPrefix: 'fra.degradedForest',
                  colName: 'monitoringScale',
                },
              ],
              variableName: 'monitoringScale',
              labelKey: 'fra.degradedForest.monitoringScale',
              variableExport: 'monitoringScale',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'fra.degradedForest.hasNationalLevelData',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: -1,
                  type: 'placeholder',
                  labelKey: 'fra.degradedForest.yearOfLatestAssessment',
                },
                {
                  idx: 1,
                  type: 'textarea',
                  colName: 'yearOfLatestAssessment',
                },
              ],
              labelKey: 'fra.degradedForest.yearOfLatestAssessment',
              variableExport: 'yearOfLatestAssessment',
              rowSpan: 2,
              variableName: 'yearOfLatestAssessment',
              migration: {
                validateFns: [
                  `validatorIsYear(degradedForestMonitoring2025.yearOfLatestAssessment)`,
                  `validatorNotGreaterThan(degradedForestMonitoring2025.yearOfLatestAssessment, '2024')`,
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
                  labelKey: 'fra.degradedForest.degradedAreaForThatYear',
                  className: 'fra-table__category-cell',
                },
                {
                  idx: 0,
                  type: 'decimal',
                  colName: 'degradedAreaForThatYear',
                },
              ],
              labelKey: 'fra.degradedForest.degradedAreaForThatYear',
              variableExport: 'degradedAreaForThatYear',
              variableName: 'degradedAreaForThatYear',
            },
          ],
          tableDataRequired: [],
          print: {
            colBreakPoints: [],
            pageBreakAfter: false,
          },
          dataExport: true,
          columnsExportAlways: [],
          migration: {
            columnNames: {
              '2025': ['hasNationalDefinitionOfDegradedForest', 'national_definition', 'criteriaOfDegradedForest'],
            },
          },
        },
      ],
      migration: {
        cycles: ['2025'],
      },
    }, // 2025
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
}
