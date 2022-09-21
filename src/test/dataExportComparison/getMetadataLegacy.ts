import { MetadataLegacy, VariableLegacy } from '@test/dataExportComparison/types'
import { FraSpecs } from '@test/sectionSpec/fraSpecs'

export const getMetadataLegacy = (): MetadataLegacy => {
  return Object.values(FraSpecs).reduce<MetadataLegacy>((acc, spec) => {
    if (spec.dataExport.included) {
      const tableSpec = spec.tableSections.flatMap((ts) => ts.tableSpecs).find((t) => t.dataExport)
      const columns = [...tableSpec.columnsExportAlways, ...tableSpec.columnsExport].map((c) => String(c))
      const variables = tableSpec.rows.reduce<Array<VariableLegacy>>((acc, row) => {
        if (row.variableName || row.variableExport)
          acc.push({
            name: row.variableName ?? row.variableExport,
            exportName: row.variableExport ?? row.variableName,
          })
        return acc
      }, [])
      return {
        ...acc,
        [tableSpec.name]: { columns, variables },
      }
    }
    return acc
  }, {})
}
