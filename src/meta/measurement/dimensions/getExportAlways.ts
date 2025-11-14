import { ExplorerMetadata } from 'meta/explorer/metadata'
import { DimensionName } from 'meta/measurement/dimension'

export const getExportAlways = (cellsExportAlways: ExplorerMetadata['cellsExportAlways']): Array<DimensionName> => {
  return (cellsExportAlways ?? []).flatMap((cell) => Object.values(cell))
}
