import { PanEuropean } from '@core/assessment'
import * as SectionSpec from '@webapp/app/assessment/components/section/sectionSpec'

const section = PanEuropean.sections['6'].children['67']
const variables = ['wood_consumption']
const variablesMappings: any = {
  woodConsumption: (SectionSpec.VARIABLES as any).wood_consumption,
}

const years = [...PanEuropean.years92_17]

const tableSpec = SectionSpec.newTableSpec({
  [SectionSpec.KEYS_TABLE.name]: section.tables.table_6_7,
  [SectionSpec.KEYS_TABLE.unit]: SectionSpec.UnitSpec.Unit.thousandCubicMeterRWE,

  [SectionSpec.KEYS_TABLE.columnsExport]: years.map((year) => '_' + year),

  [SectionSpec.KEYS_TABLE.columnsExport]: years.map((year) => `_${year}`),
  [SectionSpec.KEYS_TABLE.rows]: [
    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.woodConsumption.category',
          [SectionSpec.KEYS_COL.rowSpan]: 2,
          [SectionSpec.KEYS_COL.left]: true,
        }),
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: 'panEuropean.woodConsumption.woodConsumption1000M3RWE',
          [SectionSpec.KEYS_COL.colSpan]: years.length,
        }),
      ],
    }),

    SectionSpec.newRowHeader({
      [SectionSpec.KEYS_ROW.cols]: [...years].map((year) =>
        SectionSpec.newColHeader({
          [SectionSpec.KEYS_COL.labelKey]: year,
        })
      ),
    }),

    ...variables.flatMap((variable: any) =>
      SectionSpec.newRowData({
        [SectionSpec.KEYS_ROW.variableExport]: variablesMappings[variable],
        [SectionSpec.KEYS_ROW.labelKey]: `panEuropean.woodConsumption.${variable}`,
        [SectionSpec.KEYS_ROW.cols]: years.map(() => SectionSpec.newColDecimal()),
      }) as any
    ),
  ],
})

const tableSection = SectionSpec.newTableSection({
  [SectionSpec.KEYS_TABLE_SECTION.tableSpecs]: [tableSpec],
})
const woodConsumption = SectionSpec.newSectionSpec({
  [SectionSpec.KEYS_SECTION.sectionName]: section.name,
  [SectionSpec.KEYS_SECTION.sectionAnchor]: section.anchor,
  [SectionSpec.KEYS_SECTION.tableSections]: [tableSection],
})
export default woodConsumption
