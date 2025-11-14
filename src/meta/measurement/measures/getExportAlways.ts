import { ExplorerMetadata } from 'meta/explorer/metadata'
import { MeasureName } from 'meta/measurement/measure'

export const getExportAlways = (cellsExportAlways: ExplorerMetadata['cellsExportAlways']): Array<MeasureName> => {
  return (cellsExportAlways ?? []).flatMap((cell) => Object.keys(cell))
}
