// @ts-nocheck
import { SectionSpec } from '../../webapp/sectionSpec'

export const FraSpecs: Record<string, SectionSpec> = {
  contactPersons: {
    sectionName: 'contactPersons',
    sectionAnchor: '',
    tableSections: [],
    showTitle: false,
    descriptions: {
      analysisAndProcessing: false,
      comments: false,
      introductoryText: true,
      nationalData: false,
    },
    dataExport: {
      included: false,
    },
  },
  extentOfForest: {
    sectionName: 'extentOfForest',
    sectionAnchor: '1a',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'extentOfForest',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'extentOfForest.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: null,
                    rowSpan: 1,
                    labelKey: 'extentOfForest.areaUnitLabel',
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
                    labelKey: 'extentOfForest.forestArea',
                    variableNo: 'a',
                    className: 'fra-table__category-cell',
                  },
                ],
                labelKey: 'extentOfForest.forestArea',
                variableNo: 'a',
                variableName: 'forestArea',
                variableExport: 'forest_area',
                chartProps: {
                  labelKey: 'fraClass.forest',
                  color: '#0098a6',
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
                    labelKey: 'fraClass.otherWoodedLand',
                    variableNo: 'a',
                    className: 'fra-table__category-cell',
                  },
                ],
                labelKey: 'fraClass.otherWoodedLand',
                variableNo: 'a',
                variableName: 'otherWoodedLand',
                variableExport: 'other_wooded_land',
                chartProps: {
                  labelKey: 'fraClass.otherWoodedLand',
                  color: '#bf00af',
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
                    labelKey: 'fraClass.otherLand',
                    variableNo: 'c-a-b',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'fraClass.otherLand',
                variableNo: 'c-a-b',
                variableName: 'otherLand',
                variableExport: 'other_land',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'extentOfForest.totalLandArea',
                    variableNo: 'c',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'extentOfForest.totalLandArea',
                variableNo: 'c',
                variableName: 'faoStat',
                variableExport: 'total_land_area',
              },
              {
                idx: 4,
                type: 'noticeMessage',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'extentOfForest.tableNoticeMessage',
                    type: 'noticeMessage',
                  },
                ],
              },
              {
                idx: 5,
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
            columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
            odp: true,
            odpVariables: {
              forestArea: 'forestArea',
              otherWoodedLand: 'otherWoodedLand',
            },
            showOdpChart: true,
            unit: 'haThousand',
          },
          {
            name: 'climaticDomain',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'climaticDomain.climaticDomain',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'climaticDomain.percentOfForestArea2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'climaticDomain.percentOfForestArea2015Override',
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
                    labelKey: 'climaticDomain.boreal',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'calculated',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                ],
                labelKey: 'climaticDomain.boreal',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'climaticDomain.temperate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'calculated',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                ],
                labelKey: 'climaticDomain.temperate',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'climaticDomain.subtropical',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'calculated',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                ],
                labelKey: 'climaticDomain.subtropical',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'climaticDomain.tropical',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'calculated',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                ],
                labelKey: 'climaticDomain.tropical',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: false,
            columnsExportAlways: [],
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      comments: true,
      introductoryText: false,
    },
    dataExport: {
      included: true,
    },
  },
  forestCharacteristics: {
    sectionName: 'forestCharacteristics',
    sectionAnchor: '1b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'forestCharacteristics',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'forestCharacteristics.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: null,
                    rowSpan: 1,
                    labelKey: 'forestCharacteristics.areaUnitLabel',
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
                    labelKey: 'forestCharacteristics.naturalForestArea',
                    variableNo: 'a',
                    className: 'fra-table__category-cell',
                  },
                ],
                labelKey: 'forestCharacteristics.naturalForestArea',
                variableNo: 'a',
                variableName: 'naturalForestArea',
                variableExport: 'natural_forest_area',
                chartProps: {
                  labelKey: 'forestCharacteristics.naturalForestArea',
                  color: '#0098a6',
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
                    labelKey: 'forestCharacteristics.plantedForest',
                    variableNo: 'b',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'forestCharacteristics.plantedForest',
                variableNo: 'b',
                variableName: 'plantedForest',
                variableExport: 'planted_forest',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestCharacteristics.plantationForestArea',
                    className: 'fra-table__category-cell',
                  },
                ],
                labelKey: 'forestCharacteristics.plantationForestArea',
                variableName: 'plantationForestArea',
                variableExport: 'plantation_forest_area',
                chartProps: {
                  labelKey: 'forestCharacteristics.plantationForestArea',
                  color: '#bf00af',
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
                    labelKey: 'forestCharacteristics.plantationForestIntroducedArea',
                    className: 'fra-table__subcategory-cell',
                  },
                ],
                labelKey: 'forestCharacteristics.plantationForestIntroducedArea',
                variableName: 'plantationForestIntroducedArea',
                variableExport: 'plantation_forest_introduced_area',
                subcategory: true,
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestCharacteristics.otherPlantedForestArea',
                    className: 'fra-table__category-cell',
                  },
                ],
                labelKey: 'forestCharacteristics.otherPlantedForestArea',
                variableName: 'otherPlantedForestArea',
                variableExport: 'other_planted_forest_area',
                chartProps: {
                  labelKey: 'forestCharacteristics.otherPlantedForestArea',
                  color: '#f58833',
                },
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestCharacteristics.total',
                    variableNo: 'a+b',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'forestCharacteristics.total',
                variableNo: 'a+b',
                variableName: 'total',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestCharacteristics.totalForestArea',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'forestCharacteristics.totalForestArea',
                linkToSection: 'extentOfForest',
                variableName: 'totalForestArea',
              },
              {
                idx: 7,
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
                idx: 8,
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
            odp: true,
            odpVariables: {
              naturalForestArea: 'naturalForestArea',
              plantationForestArea: 'plantationForestArea',
              plantationForestIntroducedArea: 'plantationForestIntroducedArea',
              otherPlantedForestArea: 'otherPlantedForestArea',
            },
            showOdpChart: true,
          },
        ],
      },
    ],
    showTitle: true,
    descriptions: {
      comments: true,
      introductoryText: false,
    },
    dataExport: {
      included: true,
    },
  },
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
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'specificForestCategories.mangroves',
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
                labelKey: 'specificForestCategories.mangroves',
                variableExport: 'mangroves',
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
  },
  forestAreaChange: {
    sectionName: 'forestAreaChange',
    sectionAnchor: '1d',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'forestAreaChange',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'forestAreaChange.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 4,
                    rowSpan: 1,
                    labelKey: 'forestAreaChange.areaUnitLabel',
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
                    label: '2015-2020',
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
                    labelKey: 'forestAreaChange.forestExpansion',
                    variableNo: 'a',
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
                labelKey: 'forestAreaChange.forestExpansion',
                variableExport: 'forest_expansion',
                variableNo: 'a',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaChange.ofWhichAfforestation',
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
                ],
                labelKey: 'forestAreaChange.ofWhichAfforestation',
                variableExport: 'afforestation',
                subcategory: true,
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaChange.ofWhichNaturalExpansion',
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
                ],
                labelKey: 'forestAreaChange.ofWhichNaturalExpansion',
                variableExport: 'natural_expansion',
                subcategory: true,
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaChange.deforestation',
                    variableNo: 'b',
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
                labelKey: 'forestAreaChange.deforestation',
                variableExport: 'deforestation',
                variableNo: 'b',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestAreaChange.forestAreaNetChange',
                    variableNo: 'a-b',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                ],
                labelKey: 'forestAreaChange.forestAreaNetChange',
                variableNo: 'a-b',
                linkToSection: 'extentOfForest',
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
            columnsExport: ['1990-2000', '2000-2010', '2010-2015', '2015-2020'],
            unit: 'haThousandPerYear',
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
  annualReforestation: {
    sectionName: 'annualReforestation',
    sectionAnchor: '1e',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'annualReforestation',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'annualReforestation.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 4,
                    rowSpan: 1,
                    labelKey: 'annualReforestation.areaUnitLabel',
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
                    label: '2015-2020',
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
                    labelKey: 'annualReforestation.reforestation',
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
                labelKey: 'annualReforestation.reforestation',
                variableExport: 'reforestation',
              },
              {
                idx: 1,
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
                idx: 2,
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
            columnsExport: ['1990-2000', '2000-2010', '2010-2015', '2015-2020'],
            unit: 'haThousandPerYear',
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
  otherLandWithTreeCover: {
    sectionName: 'otherLandWithTreeCover',
    sectionAnchor: '1f',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'otherLandWithTreeCover',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'otherLandWithTreeCover.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 5,
                    rowSpan: 1,
                    labelKey: 'otherLandWithTreeCover.areaUnitLabel',
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
                    labelKey: 'otherLandWithTreeCover.palms',
                    variableNo: 'a',
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
                labelKey: 'otherLandWithTreeCover.palms',
                variableExport: 'palms',
                variableNo: 'a',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.treeorchards',
                    variableNo: 'b',
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
                labelKey: 'otherLandWithTreeCover.treeorchards',
                variableExport: 'tree_orchards',
                variableNo: 'b',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.agroforestry',
                    variableNo: 'c',
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
                labelKey: 'otherLandWithTreeCover.agroforestry',
                variableExport: 'agroforestry',
                variableNo: 'c',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.treesinurbansettings',
                    variableNo: 'd',
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
                labelKey: 'otherLandWithTreeCover.treesinurbansettings',
                variableExport: 'trees_in_urban_settings',
                variableNo: 'd',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.other',
                    variableNo: 'e',
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
                labelKey: 'otherLandWithTreeCover.other',
                variableExport: 'other',
                variableNo: 'e',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.total',
                    variableNo: 'a+b+c+d+e',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                ],
                labelKey: 'otherLandWithTreeCover.total',
                variableNo: 'a+b+c+d+e',
                mainCategory: true,
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'otherLandWithTreeCover.otherLandArea',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                ],
                labelKey: 'otherLandWithTreeCover.otherLandArea',
                linkToSection: 'extentOfForest',
              },
              {
                idx: 7,
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
                idx: 8,
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
            columnsExport: [1990, 2000, 2010, 2015, 2020],
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
  growingStock: {
    sectionName: 'growingStock',
    sectionAnchor: '2a',
    tableSections: [
      {
        descriptionKey: 'growingStock.supportText',
        tableSpecs: [
          {
            name: 'growingStockAvg',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'growingStock.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: null,
                    rowSpan: 1,
                    labelKey: 'growingStock.avgTableHeader',
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
                    labelKey: 'growingStock.naturallyRegeneratingForest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'naturallyRegeneratingForest',
                labelKey: 'growingStock.naturallyRegeneratingForest',
                subcategory: false,
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.plantedForest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'plantedForest',
                labelKey: 'growingStock.plantedForest',
                subcategory: false,
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.plantationForest',
                    className: 'fra-table__subcategory-cell',
                  },
                ],
                variableName: 'plantationForest',
                labelKey: 'growingStock.plantationForest',
                subcategory: true,
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.otherPlantedForest',
                    className: 'fra-table__subcategory-cell',
                  },
                ],
                variableName: 'otherPlantedForest',
                labelKey: 'growingStock.otherPlantedForest',
                subcategory: true,
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.forest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'forest',
                labelKey: 'growingStock.forest',
                subcategory: false,
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.otherWoodedLand',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'otherWoodedLand',
                labelKey: 'growingStock.otherWoodedLand',
                subcategory: false,
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: false,
            columnsExportAlways: [],
            odp: true,
            odpVariables: {
              naturallyRegeneratingForest: 'naturallyRegeneratingForest',
              plantedForest: 'plantedForest',
              plantationForest: 'plantationForest',
              otherPlantedForest: 'otherPlantedForest',
              forest: 'forest',
              otherWoodedLand: 'otherWoodedLand',
            },
          },
        ],
      },
      {
        tableSpecs: [
          {
            name: 'growingStockTotal',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'growingStock.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: null,
                    rowSpan: 1,
                    labelKey: 'growingStock.totalTableHeader',
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
                    labelKey: 'growingStock.naturallyRegeneratingForest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'naturallyRegeneratingForest',
                variableExport: 'naturally_regenerating_forest',
                labelKey: 'growingStock.naturallyRegeneratingForest',
                subcategory: false,
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.plantedForest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'plantedForest',
                variableExport: 'planted_forest',
                labelKey: 'growingStock.plantedForest',
                subcategory: false,
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.plantationForest',
                    className: 'fra-table__subcategory-cell',
                  },
                ],
                variableName: 'plantationForest',
                variableExport: 'plantation_forest',
                labelKey: 'growingStock.plantationForest',
                subcategory: true,
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.otherPlantedForest',
                    className: 'fra-table__subcategory-cell',
                  },
                ],
                variableName: 'otherPlantedForest',
                variableExport: 'other_planted_forest',
                labelKey: 'growingStock.otherPlantedForest',
                subcategory: true,
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.forest',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'forest',
                variableExport: 'forest',
                labelKey: 'growingStock.forest',
                subcategory: false,
                validator: null,
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStock.otherWoodedLand',
                    className: 'fra-table__category-cell',
                  },
                ],
                variableName: 'otherWoodedLand',
                variableExport: 'other_wooded_land',
                labelKey: 'growingStock.otherWoodedLand',
                subcategory: false,
                validator: null,
              },
              {
                idx: 6,
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
                idx: 7,
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
            columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
            unit: 'millionsCubicMeterOverBark',
            odp: true,
            odpVariables: {
              naturallyRegeneratingForest: 'naturallyRegeneratingForest',
              plantedForest: 'plantedForest',
              plantationForest: 'plantationForest',
              otherPlantedForest: 'otherPlantedForest',
              forest: 'forest',
              otherWoodedLand: 'otherWoodedLand',
            },
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
  growingStockComposition: {
    sectionName: 'growingStockComposition',
    sectionAnchor: '2b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'growingStockComposition',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'growingStockComposition.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'growingStockComposition.scientificName',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'growingStockComposition.commonName',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 5,
                    rowSpan: 1,
                    labelKey: 'growingStockComposition.areaUnitLabel',
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
                idx: 'header_2',
                cols: [
                  {
                    idx: 0,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'growingStockComposition.nativeTreeSpecies',
                    className: 'fra-table__header-cell-left',
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
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 1,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank1',
                labelParams: {
                  idx: 1,
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
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 2,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank2',
                labelParams: {
                  idx: 2,
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
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 3,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank3',
                labelParams: {
                  idx: 3,
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
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 4,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank4',
                labelParams: {
                  idx: 4,
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
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 5,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank5',
                labelParams: {
                  idx: 5,
                },
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 6,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank6',
                labelParams: {
                  idx: 6,
                },
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 7,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank7',
                labelParams: {
                  idx: 7,
                },
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 8,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank8',
                labelParams: {
                  idx: 8,
                },
              },
              {
                idx: 8,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 9,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank9',
                labelParams: {
                  idx: 9,
                },
              },
              {
                idx: 9,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 10,
                    },
                    labelPrefixKey: 'growingStockComposition.native',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.native',
                variableExport: 'native_rank10',
                labelParams: {
                  idx: 10,
                },
              },
              {
                idx: 10,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 3,
                    labelKey: 'growingStockComposition.remainingNative',
                    className: 'fra-table__header-cell-left',
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
                ],
                labelKey: 'growingStockComposition.remainingNative',
                variableExport: 'remaining_native',
                colSpan: 3,
                mainCategory: true,
              },
              {
                idx: 11,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 3,
                    labelKey: 'growingStockComposition.totalNative',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                  },
                ],
                labelKey: 'growingStockComposition.totalNative',
                variableExport: 'total_native',
                colSpan: 3,
                mainCategory: true,
              },
              {
                idx: 12,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 8,
                    labelKey: 'growingStockComposition.introducedTreeSpecies',
                    className: 'fra-table__header-cell-left',
                  },
                ],
                labelKey: 'growingStockComposition.introducedTreeSpecies',
                colSpan: 8,
                mainCategory: true,
              },
              {
                idx: 13,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 1,
                    },
                    labelPrefixKey: 'growingStockComposition.introduced',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.introduced',
                variableExport: 'introduced_rank1',
                labelParams: {
                  idx: 1,
                },
              },
              {
                idx: 14,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 2,
                    },
                    labelPrefixKey: 'growingStockComposition.introduced',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.introduced',
                variableExport: 'introduced_rank2',
                labelParams: {
                  idx: 2,
                },
              },
              {
                idx: 15,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 3,
                    },
                    labelPrefixKey: 'growingStockComposition.introduced',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.introduced',
                variableExport: 'introduced_rank3',
                labelParams: {
                  idx: 3,
                },
              },
              {
                idx: 16,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 4,
                    },
                    labelPrefixKey: 'growingStockComposition.introduced',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.introduced',
                variableExport: 'introduced_rank4',
                labelParams: {
                  idx: 4,
                },
              },
              {
                idx: 17,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'growingStockComposition.rank',
                    labelParams: {
                      idx: 5,
                    },
                    labelPrefixKey: 'growingStockComposition.introduced',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
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
                ],
                labelKey: 'growingStockComposition.rank',
                labelPrefixKey: 'growingStockComposition.introduced',
                variableExport: 'introduced_rank5',
                labelParams: {
                  idx: 5,
                },
              },
              {
                idx: 18,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 3,
                    labelKey: 'growingStockComposition.remainingIntroduced',
                    className: 'fra-table__header-cell-left',
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
                ],
                labelKey: 'growingStockComposition.remainingIntroduced',
                variableExport: 'remaining_introduced_placeholder',
                colSpan: 3,
                mainCategory: true,
              },
              {
                idx: 19,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 3,
                    labelKey: 'growingStockComposition.totalIntroduced',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                  },
                ],
                labelKey: 'growingStockComposition.totalIntroduced',
                variableExport: 'total_remaining',
                colSpan: 3,
                mainCategory: true,
              },
              {
                idx: 20,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 3,
                    labelKey: 'growingStockComposition.totalGrowingStock',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                  },
                ],
                labelKey: 'growingStockComposition.totalGrowingStock',
                colSpan: 3,
                mainCategory: true,
              },
              {
                idx: 21,
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
                idx: 22,
                type: 'validationMessages',
                cols: [],
              },
            ],
            tableDataRequired: [
              {
                assessmentType: 'fra2020',
                sectionName: 'growingStock',
                tableName: 'growingStock',
              },
            ],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: ['common_name', 'scientific_name'],
            columnsExport: [1990, 2000, 2010, 2015, 2020],
            unit: 'millionsCubicMeterOverBark',
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
  biomassStock: {
    sectionName: 'biomassStock',
    sectionAnchor: '2c',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'biomassStock',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'biomassStock.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 9,
                    rowSpan: 1,
                    labelKey: 'biomassStock.tableHeader',
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
                    labelKey: 'biomassStock.aboveGround',
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
                labelKey: 'biomassStock.aboveGround',
                variableExport: 'forest_above_ground',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'biomassStock.belowGround',
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
                labelKey: 'biomassStock.belowGround',
                variableExport: 'forest_below_ground',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'biomassStock.deadWood',
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
                labelKey: 'biomassStock.deadWood',
                variableExport: 'forest_deadwood',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            unit: 'tonnesPerHa',
            columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
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
  carbonStock: {
    sectionName: 'carbonStock',
    sectionAnchor: '2d',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'carbonStock',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'carbonStock.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 9,
                    rowSpan: 1,
                    labelKey: 'carbonStock.tableHeader',
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
                    labelKey: 'carbonStock.carbonAboveGroundBiomass',
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
                variableExport: 'carbon_forest_above_ground',
                labelKey: 'carbonStock.carbonAboveGroundBiomass',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'carbonStock.carbonBelowGroundBiomass',
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
                variableExport: 'carbon_forest_below_ground',
                labelKey: 'carbonStock.carbonBelowGroundBiomass',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'carbonStock.carbonDeadwood',
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
                variableExport: 'carbon_forest_deadwood',
                labelKey: 'carbonStock.carbonDeadwood',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'carbonStock.carbonLitter',
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
                variableExport: 'carbon_forest_litter',
                labelKey: 'carbonStock.carbonLitter',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'carbonStock.carbonSoil',
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
                variableExport: 'carbon_forest_soil',
                labelKey: 'carbonStock.carbonSoil',
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            unit: 'tonnesPerHa',
            columnsExport: [1990, 2000, 2010, 2015, 2016, 2017, 2018, 2019, 2020],
          },
          {
            name: 'carbonStockSoilDepth',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'carbonStock.soilDepthHeading',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'decimal',
                  },
                ],
                labelKey: 'carbonStock.soilDepthHeading',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
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
  designatedManagementObjective: {
    sectionName: 'designatedManagementObjective',
    sectionAnchor: '3a',
    tableSections: [
      {
        tableSpecs: [
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
                    labelKey: 'designatedManagementObjective.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 5,
                    rowSpan: 1,
                    labelKey: 'designatedManagementObjective.areaUnitLabel',
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
                    labelKey: 'designatedManagementObjective.production',
                    variableNo: 'a',
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
                labelKey: 'designatedManagementObjective.production',
                variableNo: 'a',
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
                    labelKey: 'designatedManagementObjective.soilWaterProtection',
                    variableNo: 'b',
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
                labelKey: 'designatedManagementObjective.soilWaterProtection',
                variableNo: 'b',
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
                    labelKey: 'designatedManagementObjective.biodiversityConservation',
                    variableNo: 'c',
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
                labelKey: 'designatedManagementObjective.biodiversityConservation',
                variableNo: 'c',
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
                    labelKey: 'designatedManagementObjective.socialServices',
                    variableNo: 'd',
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
                labelKey: 'designatedManagementObjective.socialServices',
                variableNo: 'd',
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
                    labelKey: 'designatedManagementObjective.multipleUse',
                    variableNo: 'e',
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
                labelKey: 'designatedManagementObjective.multipleUse',
                variableNo: 'e',
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
                    labelKey: 'designatedManagementObjective.other',
                    variableNo: 'f',
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
                labelKey: 'designatedManagementObjective.other',
                variableNo: 'f',
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
                    labelKey: 'designatedManagementObjective.unknown',
                    variableNo: 'g',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                ],
                labelKey: 'designatedManagementObjective.unknown',
                variableExport: 'no_unknown',
                variableNo: 'g',
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'designatedManagementObjective.totalForestArea',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                ],
                labelKey: 'designatedManagementObjective.totalForestArea',
                linkToSection: 'extentOfForest',
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
            columnsExport: [1990, 2000, 2010, 2015, 2020],
            unit: 'haThousand',
          },
        ],
        titleKey: 'designatedManagementObjective.primaryDesignatedManagementObjective',
        descriptionKey: 'designatedManagementObjective.primaryDesignatedManagementObjectiveSupport',
      },
      {
        tableSpecs: [
          {
            name: 'totalAreaWithDesignatedManagementObjective',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'designatedManagementObjective.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 5,
                    rowSpan: 1,
                    labelKey: 'designatedManagementObjective.areaUnitLabel',
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
                    labelKey: 'designatedManagementObjective.production',
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
                labelKey: 'designatedManagementObjective.production',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'designatedManagementObjective.soilWaterProtection',
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
                labelKey: 'designatedManagementObjective.soilWaterProtection',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'designatedManagementObjective.biodiversityConservation',
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
                labelKey: 'designatedManagementObjective.biodiversityConservation',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'designatedManagementObjective.socialServices',
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
                labelKey: 'designatedManagementObjective.socialServices',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'designatedManagementObjective.other',
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
                labelKey: 'designatedManagementObjective.other',
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
        titleKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjective',
        descriptionKey: 'designatedManagementObjective.totalAreaWithDesignatedManagementObjectiveSupport',
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
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2017,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2018,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2019,
                    className: 'fra-table__header-cell',
                    type: 'header',
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
                labelKey: 'forestAreaWithinProtectedAreas.header',
                variableExport: 'forest_area_within_protected_areas',
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
                labelKey: 'forestAreaWithinProtectedAreas.forestAreaWithLongTermManagementPlan',
                variableExport: 'forest_area_with_long_term_management_plan',
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
                labelKey: 'forestAreaWithinProtectedAreas.ofWhichInProtectedAreas',
                variableExport: 'of_which_in_protected_areas',
                subcategory: true,
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
  forestOwnership: {
    sectionName: 'forestOwnership',
    sectionAnchor: '4a',
    tableSections: [
      {
        tableSpecs: [
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
                    labelKey: 'forestOwnership.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 4,
                    rowSpan: 1,
                    labelKey: 'forestOwnership.areaUnitLabel',
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
                    labelKey: 'forestOwnership.privateOwnership',
                    variableNo: 'a',
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
                labelKey: 'forestOwnership.privateOwnership',
                variableExport: 'private_ownership',
                variableNo: 'a',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.ofWhichIndividuals',
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
                ],
                labelKey: 'forestOwnership.ofWhichIndividuals',
                variableExport: 'of_which_by_individuals',
                subcategory: true,
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.ofWhichPrivateBusinesses',
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
                ],
                labelKey: 'forestOwnership.ofWhichPrivateBusinesses',
                variableExport: 'of_which_by_private_businesses',
                subcategory: true,
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.ofWhichCommunities',
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
                ],
                labelKey: 'forestOwnership.ofWhichCommunities',
                variableExport: 'of_which_by_communities',
                subcategory: true,
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.publicOwnership',
                    variableNo: 'b',
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
                labelKey: 'forestOwnership.publicOwnership',
                variableExport: 'public_ownership',
                variableNo: 'b',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.otherOrUnknown',
                    variableNo: 'c',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                ],
                labelKey: 'forestOwnership.otherOrUnknown',
                variableExport: 'other_or_unknown',
                variableNo: 'c',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'forestOwnership.totalForestArea',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                ],
                labelKey: 'forestOwnership.totalForestArea',
                linkToSection: 'extentOfForest',
              },
              {
                idx: 7,
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
                idx: 8,
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
            columnsExport: [1990, 2000, 2010, 2015],
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
  holderOfManagementRights: {
    sectionName: 'holderOfManagementRights',
    sectionAnchor: '4b',
    tableSections: [
      {
        tableSpecs: [
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
                    labelKey: 'holderOfManagementRights.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 4,
                    rowSpan: 1,
                    labelKey: 'holderOfManagementRights.areaUnitLabel',
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
                    labelKey: 'holderOfManagementRights.publicAdministration',
                    variableNo: 'a',
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
                labelKey: 'holderOfManagementRights.publicAdministration',
                variableExport: 'public_administration',
                variableNo: 'a',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'holderOfManagementRights.individuals',
                    variableNo: 'b',
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
                labelKey: 'holderOfManagementRights.individuals',
                variableExport: 'individuals',
                variableNo: 'b',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'holderOfManagementRights.privateBusinesses',
                    variableNo: 'c',
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
                labelKey: 'holderOfManagementRights.privateBusinesses',
                variableExport: 'private_businesses',
                variableNo: 'c',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'holderOfManagementRights.communities',
                    variableNo: 'd',
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
                labelKey: 'holderOfManagementRights.communities',
                variableExport: 'communities',
                variableNo: 'd',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'holderOfManagementRights.other',
                    variableNo: 'e',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                ],
                labelKey: 'holderOfManagementRights.other',
                variableExport: 'other_or_unknown',
                variableNo: 'e',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'holderOfManagementRights.totalPublicOwnership',
                    linkToSection: 'forestOwnership',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                ],
                labelKey: 'holderOfManagementRights.totalPublicOwnership',
                linkToSection: 'forestOwnership',
              },
            ],
            tableDataRequired: [
              {
                assessmentType: 'fra2020',
                sectionName: 'forestOwnership',
                tableName: 'forestOwnership',
              },
            ],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            columnsExport: [1990, 2000, 2010, 2015],
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
  disturbances: {
    sectionName: 'disturbances',
    sectionAnchor: '5a',
    tableSections: [
      {
        tableSpecs: [
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
                    labelKey: 'disturbances.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 18,
                    rowSpan: 1,
                    labelKey: 'disturbances.areaUnitLabel',
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
                    label: 2000,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2001,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2002,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2003,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2004,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2005,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2006,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2007,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2008,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 9,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2009,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 10,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2010,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 11,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2011,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 12,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2012,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 13,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2013,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 14,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2014,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 15,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2015,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 16,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2016,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 17,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2017,
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
                    labelKey: 'disturbances.insects',
                    variableNo: 'a',
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
                labelKey: 'disturbances.insects',
                variableNo: 'a',
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
                    labelKey: 'disturbances.diseases',
                    variableNo: 'b',
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
                labelKey: 'disturbances.diseases',
                variableNo: 'b',
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
                    labelKey: 'disturbances.severeWeatherEvents',
                    variableNo: 'c',
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
                labelKey: 'disturbances.severeWeatherEvents',
                variableNo: 'c',
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
                    labelKey: 'disturbances.other',
                    variableNo: 'd',
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
                labelKey: 'disturbances.other',
                variableNo: 'd',
                variableExport: 'other',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'disturbances.total',
                    variableNo: 'a+b+c+d',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                  },
                  {
                    idx: 8,
                    type: 'calculated',
                  },
                  {
                    idx: 9,
                    type: 'calculated',
                  },
                  {
                    idx: 10,
                    type: 'calculated',
                  },
                  {
                    idx: 11,
                    type: 'calculated',
                  },
                  {
                    idx: 12,
                    type: 'calculated',
                  },
                  {
                    idx: 13,
                    type: 'calculated',
                  },
                  {
                    idx: 14,
                    type: 'calculated',
                  },
                  {
                    idx: 15,
                    type: 'calculated',
                  },
                  {
                    idx: 16,
                    type: 'calculated',
                  },
                  {
                    idx: 17,
                    type: 'calculated',
                  },
                ],
                labelKey: 'disturbances.total',
                variableExport: 'total',
                variableNo: 'a+b+c+d',
                mainCategory: true,
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'disturbances.totalForestArea',
                    linkToSection: 'extentOfForest',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                  },
                  {
                    idx: 8,
                    type: 'calculated',
                  },
                  {
                    idx: 9,
                    type: 'calculated',
                  },
                  {
                    idx: 10,
                    type: 'calculated',
                  },
                  {
                    idx: 11,
                    type: 'calculated',
                  },
                  {
                    idx: 12,
                    type: 'calculated',
                  },
                  {
                    idx: 13,
                    type: 'calculated',
                  },
                  {
                    idx: 14,
                    type: 'calculated',
                  },
                  {
                    idx: 15,
                    type: 'calculated',
                  },
                  {
                    idx: 16,
                    type: 'calculated',
                  },
                  {
                    idx: 17,
                    type: 'calculated',
                  },
                ],
                labelKey: 'disturbances.totalForestArea',
                linkToSection: 'extentOfForest',
              },
              {
                idx: 6,
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
                idx: 7,
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
            columnsExport: [
              2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
              2017,
            ],
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
  areaAffectedByFire: {
    sectionName: 'areaAffectedByFire',
    sectionAnchor: '5b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'areaAffectedByFire',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'areaAffectedByFire.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 18,
                    rowSpan: 1,
                    labelKey: 'areaAffectedByFire.areaUnitLabel',
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
                    label: 2000,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2001,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2002,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2003,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2004,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2005,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2006,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2007,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 8,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2008,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 9,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2009,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 10,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2010,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 11,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2011,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 12,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2012,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 13,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2013,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 14,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2014,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 15,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2015,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 16,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2016,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 17,
                    colSpan: 1,
                    rowSpan: 1,
                    label: 2017,
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
                    labelKey: 'areaAffectedByFire.totalLandAreaAffectedByFire',
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
                labelKey: 'areaAffectedByFire.totalLandAreaAffectedByFire',
                variableExport: 'total_land_area_affected_by_fire',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'areaAffectedByFire.ofWhichForest',
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
                labelKey: 'areaAffectedByFire.ofWhichForest',
                variableExport: 'of_which_on_forest',
                subcategory: true,
              },
              {
                idx: 2,
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
                idx: 3,
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
              2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
              2017,
            ],
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
  degradedForest: {
    sectionName: 'degradedForest',
    sectionAnchor: '5c',
    tableSections: [
      {
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
                    labelKey: 'degradedForest.doesYourCountryMonitor',
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
                labelKey: 'degradedForest.doesYourCountryMonitor',
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
                    labelKey: 'degradedForest.ifYes',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: -1,
                    type: 'placeholder',
                    labelKey: 'degradedForest.whatIsDefinition',
                  },
                  {
                    idx: 1,
                    type: 'textarea',
                  },
                ],
                labelKey: 'degradedForest.ifYes',
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
                    labelKey: 'degradedForest.howMonitored',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'textarea',
                  },
                ],
                labelKey: 'degradedForest.howMonitored',
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
  },
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
            columnsExport: ['national', 'subnational'],
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
  areaOfPermanentForestEstate: {
    sectionName: 'areaOfPermanentForestEstate',
    sectionAnchor: '6b',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'areaOfPermanentForestEstate',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'areaOfPermanentForestEstate.categoryHeader',
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 6,
                    rowSpan: 1,
                    labelKey: 'areaOfPermanentForestEstate.areaUnitLabel',
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
                    labelKey: 'areaOfPermanentForestEstate.applicable',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '1990',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
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
                    labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
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
                ],
                labelKey: 'areaOfPermanentForestEstate.areaOfPermanentForestEstate',
                variableExport: 'area_of_permanent_forest_estate',
              },
              {
                idx: 1,
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
                idx: 2,
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
            unit: 'haThousand',
            columnsExport: [1990, 2000, 2010, 2015, 2020],
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
  },
  nonWoodForestProductsRemovals: {
    sectionName: 'nonWoodForestProductsRemovals',
    sectionAnchor: '7c',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'nonWoodForestProductsRemovals',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 1,
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.nameOfProduct',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.keySpecies',
                    className: 'fra-table__header-cell fra-table__nwfp-category-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.quantity',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.unit',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.value',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.category',
                    className: 'fra-table__header-cell fra-table__nwfp-category-cell',
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
                    label: '#1',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#1',
              },
              {
                idx: 1,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#2',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#2',
              },
              {
                idx: 2,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#3',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#3',
              },
              {
                idx: 3,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#4',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#4',
              },
              {
                idx: 4,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#5',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#5',
              },
              {
                idx: 5,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#6',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#6',
              },
              {
                idx: 6,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#7',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#7',
              },
              {
                idx: 7,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#8',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#8',
              },
              {
                idx: 8,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#9',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#9',
              },
              {
                idx: 9,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    label: '#10',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                  {
                    idx: 1,
                    type: 'text',
                  },
                  {
                    idx: 2,
                    type: 'integer',
                  },
                  {
                    idx: 3,
                    type: 'text',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 5,
                    type: 'select',
                    options: [
                      {
                        optionName: 'plantProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'food',
                      },
                      {
                        optionName: 'fodder',
                      },
                      {
                        optionName: 'rawMaterialForMedicine',
                      },
                      {
                        optionName: 'rawMaterialForColorants',
                      },
                      {
                        optionName: 'rawMaterialForUtensils',
                      },
                      {
                        optionName: 'ornamentalPlants',
                      },
                      {
                        optionName: 'exudates',
                      },
                      {
                        optionName: 'otherPlantProducts',
                      },
                      {
                        optionName: 'animalProductsSelectHeading',
                        type: 'header',
                      },
                      {
                        optionName: 'livingAnimals',
                      },
                      {
                        optionName: 'hidesSkins',
                      },
                      {
                        optionName: 'wildHoney',
                      },
                      {
                        optionName: 'wildMeat',
                      },
                      {
                        optionName: 'animalRawMaterialForMedicine',
                      },
                      {
                        optionName: 'animalRawMaterialForColorants',
                      },
                      {
                        optionName: 'otherEdibleAnimalProducts',
                      },
                      {
                        optionName: 'otherNonEdibleAnimalProducts',
                      },
                    ],
                    optionsLabelKeyPrefix: 'nonWoodForestProductsRemovals',
                  },
                ],
                label: '#10',
              },
              {
                idx: 10,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 5,
                    labelKey: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 1,
                    type: 'placeholder',
                  },
                ],
                labelKey: 'nonWoodForestProductsRemovals.allOtherPlantProducts',
                colSpan: 5,
                mainCategory: true,
              },
              {
                idx: 11,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 5,
                    labelKey: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 4,
                    type: 'integer',
                  },
                  {
                    idx: 1,
                    type: 'placeholder',
                  },
                ],
                labelKey: 'nonWoodForestProductsRemovals.allOtherAnimalProducts',
                colSpan: 5,
                mainCategory: true,
              },
              {
                idx: 12,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 5,
                    labelKey: 'nonWoodForestProductsRemovals.total',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                  },
                  {
                    idx: 1,
                    type: 'placeholder',
                  },
                ],
                labelKey: 'nonWoodForestProductsRemovals.total',
                colSpan: 5,
                mainCategory: true,
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
            name: 'nonWoodForestProductsRemovalsCurrency',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'nonWoodForestProductsRemovals.currency',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'nonWoodForestProductsRemovals.currency',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
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
      included: false,
    },
  },
  sustainableDevelopment: {
    sectionName: 'sustainableDevelopment',
    sectionAnchor: '8a',
    tableSections: [
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_1_1',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.indicator',
                    labelParams: {},
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'sustainableDevelopment.percent',
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
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
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
                variableName: 'forestAreaProportionLandArea2015',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.forestAreaProportionLandArea2015',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                    colName: '2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.forestAreaProportionLandArea2015',
              },
            ],
            tableDataRequired: [
              {
                assessmentType: 'fra2020',
                sectionName: 'extentOfForest',
                tableName: 'extentOfForest',
              },
              {
                assessmentType: 'fra2020',
                sectionName: 'biomassStock',
                tableName: 'biomassStock',
              },
              {
                assessmentType: 'fra2020',
                sectionName: 'forestAreaWithinProtectedAreas',
                tableName: 'forestAreaWithinProtectedAreas',
              },
            ],
            print: {
              colBreakPoints: [],
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
          },
          {
            name: 'sustainableDevelopmentAgencyIndicator',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
          },
        ],
        titleKey: 'sustainableDevelopment.sdgIndicator1',
      },
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_2_1_1',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.subIndicator',
                    labelParams: {
                      no: 1,
                    },
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 7,
                    rowSpan: 1,
                    labelKey: 'sustainableDevelopment.percent',
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
                    label: '2000-2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010-2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015-2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016-2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017-2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018-2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
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
                variableName: 'forestAreaAnnualNetChangeRate',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.forestAreaAnnualNetChangeRate',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000-2010',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010-2015',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015-2016',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016-2017',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017-2018',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018-2019',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019-2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.forestAreaAnnualNetChangeRate',
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
            name: 'sustainableDevelopmentAgencySubIndicator1',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
          },
        ],
        titleKey: 'sustainableDevelopment.sdgIndicator2',
      },
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_2_1_2',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.subIndicator',
                    labelParams: {
                      no: 2,
                    },
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'biomassStock.tableHeader',
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
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
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
                variableName: 'aboveGroundBiomassStockForests',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.aboveGroundBiomassStockForests',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                    colName: '2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.aboveGroundBiomassStockForests',
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
            name: 'sustainableDevelopmentAgencySubIndicator2',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              pageBreakAfter: true,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
          },
        ],
      },
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_2_1_3',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.subIndicator',
                    labelParams: {
                      no: 3,
                    },
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'sustainableDevelopment.percent2015ForestAreaBaseline',
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
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
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
                variableName: 'proportionForestAreaLegallyEstablishedProtectedAreas',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                    colName: '2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.proportionForestAreaLegallyEstablishedProtectedAreas',
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
            name: 'sustainableDevelopmentAgencySubIndicator3',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
          },
        ],
      },
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_2_1_4',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.subIndicator',
                    labelParams: {
                      no: 4,
                    },
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'sustainableDevelopment.percent2015ForestAreaBaseline',
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
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
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
                variableName: 'proportionForestAreaLongTermForestManagement',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.proportionForestAreaLongTermForestManagement',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                    colName: '2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.proportionForestAreaLongTermForestManagement',
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
            name: 'sustainableDevelopmentAgencySubIndicator4',
            rows: [
              {
                idx: 0,
                type: 'data',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                    className: 'fra-table__header-cell-left',
                  },
                  {
                    idx: 0,
                    type: 'text',
                  },
                ],
                labelKey: 'sustainableDevelopment.nameOfAgencyResponsible',
                mainCategory: true,
              },
            ],
            tableDataRequired: [],
            print: {
              pageBreakAfter: false,
            },
            dataExport: true,
            columnsExportAlways: [],
            secondary: true,
          },
        ],
      },
      {
        tableSpecs: [
          {
            name: 'sustainableDevelopment15_2_1_5',
            rows: [
              {
                idx: 'header_0',
                cols: [
                  {
                    idx: 0,
                    colSpan: 1,
                    rowSpan: 2,
                    labelKey: 'sustainableDevelopment.subIndicator',
                    labelParams: {
                      no: 5,
                    },
                    className: 'fra-table__header-cell-left',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 8,
                    rowSpan: 1,
                    labelKey: 'sustainableDevelopment.forestArea1000Ha',
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
                    label: '2000',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 1,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2010',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 2,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2015',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 3,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2016',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 4,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2017',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 5,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2018',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 6,
                    colSpan: 1,
                    rowSpan: 1,
                    label: '2019',
                    className: 'fra-table__header-cell',
                    type: 'header',
                  },
                  {
                    idx: 7,
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
                variableName: 'forestAreaVerifiedForestManagement',
                cols: [
                  {
                    idx: 'header_0',
                    type: 'header',
                    colSpan: 1,
                    labelKey: 'sustainableDevelopment.forestAreaVerifiedForestManagement',
                    className: 'fra-table__category-cell',
                  },
                  {
                    idx: 0,
                    type: 'calculated',
                    colName: '2000',
                  },
                  {
                    idx: 1,
                    type: 'calculated',
                    colName: '2010',
                  },
                  {
                    idx: 2,
                    type: 'calculated',
                    colName: '2015',
                  },
                  {
                    idx: 3,
                    type: 'calculated',
                    colName: '2016',
                  },
                  {
                    idx: 4,
                    type: 'calculated',
                    colName: '2017',
                  },
                  {
                    idx: 5,
                    type: 'calculated',
                    colName: '2018',
                  },
                  {
                    idx: 6,
                    type: 'calculated',
                    colName: '2019',
                  },
                  {
                    idx: 7,
                    type: 'calculated',
                    colName: '2020',
                  },
                ],
                labelKey: 'sustainableDevelopment.forestAreaVerifiedForestManagement',
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
    showTitle: true,
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
