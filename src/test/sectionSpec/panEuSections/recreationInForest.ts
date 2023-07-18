// @ts-nocheck

export const accessibilityForRecreation = {
  sectionName: 'accessibilityForRecreation',
  sectionAnchor: '6.10a',
  tableSections: [
    {
      titleKey: 'panEuropean.accessibilityForRecreation.accessibilityForRecreationNumber',
      tableSpecs: [
        {
          name: 'table_6_10a',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.accessibilityForRecreation.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.areaAvailableForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey:
                    'panEuropean.accessibilityForRecreation.areaPrimarilyDesignatedOrManagedForPublicRecreation',
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
                  labelKey: 'panEuropean.accessibilityForRecreation.total1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation._oftotal',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total1000Ha',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation._oftotal',
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
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 2000 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 2000 },
              variableExport: 'total_forest_and_other_wooded_land_2000',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
                  labelParams: { year: 1990 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
                {
                  idx: 2,
                  type: 'decimal',
                },
                { idx: 3, type: 'decimal' },
              ],
              labelKey: 'panEuropean.accessibilityForRecreation.total_forest_and_other_wooded_land',
              labelParams: { year: 1990 },
              variableExport: 'total_forest_and_other_wooded_land_1990',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [
            'area_available_for_public_recreation_total',
            'area_available_for_public_recreation_percent',
            'area_designated_or_managed_for_public_recreation_total',
            'area_designated_or_managed_for_public_recreation_percent',
          ],
        },
      ],
    },
    {
      titleKey: 'panEuropean.accessibilityForRecreation.intensityOfUseNumber',
      tableSpecs: [
        {
          name: 'table_6_10b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.intensityOfUse.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.annualNumberOfVisitsMillion',
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
                  labelKey: 'panEuropean.intensityOfUse.areaAvailableForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.areaPrimarilyDesignatedAndOrManagedForPublicRecreation',
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
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'annualNumberOfVisitsMillion',
          columnsExport: [
            'area_available_for_public_recreation',
            'area_designated_and_or_managed_for_public_recreation',
          ],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.accessibilityForRecreation.recreationFacilitiesNumber',
      tableSpecs: [
        {
          name: 'table_6_10c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.recreationFacilities.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.forestRoadsAndPathsAvailableForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities._ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc',
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
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.facilityLengthIn1000Km',
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
                  labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
              labelParams: { year: 2020 },
              variableExport: 'area_available_for_public_recreation_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
              labelParams: { year: 2015 },
              variableExport: 'area_available_for_public_recreation_2015',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'facilityLengthIn1000Km',
          columnsExport: [
            'forest_roads_and_paths_available_for_public_recreation',
            '_of_which_designated_for_hiking_biking_cross_country_skiing_etc',
          ],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.accessibilityForRecreation.otherRecreationFacilitiesNumber',
      tableSpecs: [
        {
          name: 'table_6_10d',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.measurement_unit',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.extent_multiplicity',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility_category',
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
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no1_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no1_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no1_area_available_for_public_recreation',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no2_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no2_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no2_area_available_for_public_recreation',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no3_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no3_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no3_area_available_for_public_recreation',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no4_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no4_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no4_area_available_for_public_recreation',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no5_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no5_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no5_area_available_for_public_recreation',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no6_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no6_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no6_area_available_for_public_recreation',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no7_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no7_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no7_area_available_for_public_recreation',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no8_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no8_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no8_area_available_for_public_recreation',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no9_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no9_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no9_area_available_for_public_recreation',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no10_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no10_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no10_area_available_for_public_recreation',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no11_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no11_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no11_area_available_for_public_recreation',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no12_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no12_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no12_area_available_for_public_recreation',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no13_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no13_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no13_area_available_for_public_recreation',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no14_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no14_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no14_area_available_for_public_recreation',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no15_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no15_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no15_area_available_for_public_recreation',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no16_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no16_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no16_area_available_for_public_recreation',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no17_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no17_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no17_area_available_for_public_recreation',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no18_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no18_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no18_area_available_for_public_recreation',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no19_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no19_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no19_area_available_for_public_recreation',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no20_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no20_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no20_area_available_for_public_recreation',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: ['facility', 'measurement_unit', 'extent_multiplicity', 'facility_category'],
          migration: {
            cycles: ['2025'],
          },
        },
      ],
    },
    {
      titleKey: 'panEuropean.countryComments.countryComments',
      tableSpecs: [
        {
          name: 'country_comments_6_10_1',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.approachToReportingOnAccessibilityForRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            {
              idx: 0,
              type: 'data',
              variableName: 'criteriaUsedToIncludeAreasInForestsAvailableToThePublicRecreation',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.countryComments.criteriaUsedToIncludeAreasInForestsAvailableToThePublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
              ],
            },
            {
              idx: 1,
              type: 'data',
              variableName: 'criteriaUsedToIncludeAreasInPrimarilyDesignatedOrManagedForPublicRecreation',
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.countryComments.criteriaUsedToIncludeAreasInPrimarilyDesignatedOrManagedForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 'idx', type: 'textarea', colName: 'comment' },
              ],
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: { cycles: ['2025'], columnNames: { '2025': ['comment'] } },
        },
      ],
    },
    {
      tableSpecs: [
        {
          name: 'country_comments_6_10_2',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.category',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsRelatedToDataDefinitions',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.countryComments.commentsOnTrend',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
              ],
              type: 'header',
            },
            ...[
              'areaOfForestsAvailableForPublicRecreation',
              'areaOfForestsPrimarilyDesignatedOrManagedForPublicRecreation',
              'intensityOfUse',
              'recreationFacilities',
            ].map((variableName, idx) => ({
              idx,
              type: 'data',
              variableName,
              cols: [
                {
                  idx: 'header_0',
                  colSpan: 1,
                  labelKey: `panEuropean.countryComments.${variableName}`,
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                { idx: 0, type: 'textarea', colName: 'comment' },
                { idx: 1, type: 'textarea', colName: 'comment_trends' },
              ],
            })),
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: [],
          migration: {
            cycles: ['2025'],
            columnNames: { '2025': ['comment', 'comment_trends'] },
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
  migration: {
    anchors: {
      '2020': '6.10a',
      '2025': '6.10',
    },
  },
}
export const intensityOfUse = {
  sectionName: 'intensityOfUse',
  sectionAnchor: '6.10b',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_10b',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.intensityOfUse.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.annualNumberOfVisitsMillion',
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
                  labelKey: 'panEuropean.intensityOfUse.areaAvailableForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.areaPrimarilyDesignatedAndOrManagedForPublicRecreation',
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
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2020 },
              variableExport: 'total_forest_and_other_wooded_land_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2015 },
              variableExport: 'total_forest_and_other_wooded_land_2015',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2010 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2010 },
              variableExport: 'total_forest_and_other_wooded_land_2010',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
                  labelParams: { year: 2005 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.intensityOfUse.total_forest_and_other_wooded_land',
              labelParams: { year: 2005 },
              variableExport: 'total_forest_and_other_wooded_land_2005',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'annualNumberOfVisitsMillion',
          columnsExport: [
            'area_available_for_public_recreation',
            'area_designated_and_or_managed_for_public_recreation',
          ],
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
    cycles: ['2020'],
  },
}
export const recreationFacilities = {
  sectionName: 'recreationFacilities',
  sectionAnchor: '6.10c',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_10c',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 2,
                  labelKey: 'panEuropean.recreationFacilities.categoryYear',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.forestRoadsAndPathsAvailableForPublicRecreation',
                  className: 'fra-table__header-cell',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities._ofWhichDesignatedForHikingBikingCrossCountrySkiingEtc',
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
                  colSpan: 2,
                  rowSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.facilityLengthIn1000Km',
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
                  labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
                  labelParams: { year: 2020 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              migration: {
                cycles: ['2025'],
              },
              labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
              labelParams: { year: 2020 },
              variableExport: 'area_available_for_public_recreation_2020',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
                  labelParams: { year: 2015 },
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'decimal' },
                { idx: 1, type: 'decimal' },
              ],
              labelKey: 'panEuropean.recreationFacilities.area_available_for_public_recreation',
              labelParams: { year: 2015 },
              variableExport: 'area_available_for_public_recreation_2015',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          unit: 'facilityLengthIn1000Km',
          columnsExport: [
            'forest_roads_and_paths_available_for_public_recreation',
            '_of_which_designated_for_hiking_biking_cross_country_skiing_etc',
          ],
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
    cycles: ['2020'],
  },
}
export const otherRecreationFacilitiesPilotReporting2015 = {
  sectionName: 'otherRecreationFacilitiesPilotReporting2015',
  sectionAnchor: '6.10d',
  tableSections: [
    {
      tableSpecs: [
        {
          name: 'table_6_10d',
          rows: [
            {
              idx: 'header_0',
              cols: [
                {
                  idx: 0,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.category',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 1,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 2,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.measurement_unit',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 3,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.extent_multiplicity',
                  className: 'fra-table__header-cell-left',
                  type: 'header',
                },
                {
                  idx: 4,
                  colSpan: 1,
                  rowSpan: 1,
                  labelKey: 'panEuropean.otherRecreationFacilitiesPilotReporting2015.facility_category',
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
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no1_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no1_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no1_area_available_for_public_recreation',
            },
            {
              idx: 1,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no2_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no2_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no2_area_available_for_public_recreation',
            },
            {
              idx: 2,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no3_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no3_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no3_area_available_for_public_recreation',
            },
            {
              idx: 3,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no4_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no4_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no4_area_available_for_public_recreation',
            },
            {
              idx: 4,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no5_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no5_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no5_area_available_for_public_recreation',
            },
            {
              idx: 5,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no6_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no6_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no6_area_available_for_public_recreation',
            },
            {
              idx: 6,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no7_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no7_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no7_area_available_for_public_recreation',
            },
            {
              idx: 7,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no8_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no8_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no8_area_available_for_public_recreation',
            },
            {
              idx: 8,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no9_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no9_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no9_area_available_for_public_recreation',
            },
            {
              idx: 9,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no10_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no10_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no10_area_available_for_public_recreation',
            },
            {
              idx: 10,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no11_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no11_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no11_area_available_for_public_recreation',
            },
            {
              idx: 11,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no12_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no12_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no12_area_available_for_public_recreation',
            },
            {
              idx: 12,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no13_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no13_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no13_area_available_for_public_recreation',
            },
            {
              idx: 13,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no14_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no14_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no14_area_available_for_public_recreation',
            },
            {
              idx: 14,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no15_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no15_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no15_area_available_for_public_recreation',
            },
            {
              idx: 15,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no16_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no16_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no16_area_available_for_public_recreation',
            },
            {
              idx: 16,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no17_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no17_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no17_area_available_for_public_recreation',
            },
            {
              idx: 17,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no18_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no18_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no18_area_available_for_public_recreation',
            },
            {
              idx: 18,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no19_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no19_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no19_area_available_for_public_recreation',
            },
            {
              idx: 19,
              type: 'data',
              cols: [
                {
                  idx: 'header_0',
                  type: 'header',
                  colSpan: 1,
                  labelKey:
                    'panEuropean.otherRecreationFacilitiesPilotReporting2015.no20_area_available_for_public_recreation',
                  className: 'fra-table__category-cell',
                },
                { idx: 0, type: 'text' },
                { idx: 1, type: 'text' },
                { idx: 2, type: 'decimal' },
                {
                  idx: 3,
                  type: 'text',
                },
              ],
              variableExport: 'no20_area_available_for_public_recreation',
              labelKey:
                'panEuropean.otherRecreationFacilitiesPilotReporting2015.no20_area_available_for_public_recreation',
            },
          ],
          tableDataRequired: [],
          print: { colBreakPoints: [], pageBreakAfter: false },
          dataExport: true,
          columnsExportAlways: [],
          columnsExport: ['facility', 'measurement_unit', 'extent_multiplicity', 'facility_category'],
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
    cycles: ['2020'],
  },
}
