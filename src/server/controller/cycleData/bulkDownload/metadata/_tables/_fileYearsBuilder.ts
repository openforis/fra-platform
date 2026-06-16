import { Labels } from 'meta/assessment/labels'
import { Dates } from 'utils/dates'
import { Objects } from 'utils/objects'

import {
  BulkDownloadColNode,
  BulkDownloadFile,
  BulkDownloadRow,
  CSVPostProcessor,
  PropsBulkDownloadFileBuilder,
} from 'server/controller/cycleData/bulkDownload/types'

type ConstructorArgs = {
  file: BulkDownloadFile
  props: PropsBulkDownloadFileBuilder
}

export type ColNodeYearsFactory = Omit<BulkDownloadColNode, 'colName'> & {
  colName?: string // colName is optional and by default it will be derived from the year
  singleFileColumns?: Array<{ colName: string; csvColumn: string }>
}

export interface BulkDownloadFileYearsBuilderConstructor {
  new (args: ConstructorArgs): BulkDownloadFileYearsBuilder
}

export abstract class BulkDownloadFileYearsBuilder {
  protected readonly file: BulkDownloadFile // parent main file (e.g. FRAYears)
  protected readonly props: PropsBulkDownloadFileBuilder
  protected readonly baseColNodes: Array<ColNodeYearsFactory>

  public constructor(args: ConstructorArgs) {
    const { file, props } = args

    this.file = file
    this.props = props
    this.baseColNodes = this.getBaseColNodes()
  }

  abstract getBaseColNodes(): Array<ColNodeYearsFactory>

  get unitLabelPath(): Array<string> {
    return ['0', 'cols', '1', 'props', 'labels']
  }

  // in single files generation, climatic domain is included if includeClimaticDomain is in this.props || if this method returns true (e.g. 1a)
  get includeClimaticDomainSingleFiles(): boolean {
    return false
  }

  /**
   * Build the Array of CSV Column Nodes for the single file generation (e.g. FRAYears.csv)
   */
  public buildRowColNodes(props: { year: string }): Array<BulkDownloadColNode> {
    const { year } = props

    return this.baseColNodes.map<BulkDownloadColNode>((colNode) => {
      const { colName = year } = colNode
      return { ...colNode, colName }
    })
  }

  /**
   * Build the Array of Files per variable (e.g.FRAYears_variables/1a_forestArea_2025_12_05.csv)
   */
  public buildSingleFiles(props: { years: Array<string> }): Array<BulkDownloadFile> {
    const { years } = props
    const includeClimaticDomain = this.includeClimaticDomainSingleFiles || this.props.includeClimaticDomain
    const includeForestArea = true
    const includeDeskStudy = true

    return this.baseColNodes.map<BulkDownloadFile>((colNode) => {
      const { csvColumn, datumType, tableName, variableName } = colNode

      const columns = colNode.singleFileColumns ?? years.map((year) => ({ colName: year, csvColumn: year }))
      const colNodes = columns.map<BulkDownloadColNode>((column) => {
        return { colName: column.colName, csvColumn: column.csvColumn, datumType, tableName, variableName }
      })
      const fileName = `${this.file.fileName}_variables/${csvColumn}`
      const row: BulkDownloadRow = { colNodes }

      const csvPostProcessor: CSVPostProcessor = (props) => {
        const { rows } = props
        const { cycle, i18n, tables } = this.props
        const table = tables[tableName]
        const { unit } = table.props

        const path = [...this.unitLabelPath, cycle.uuid]
        const label = Objects.getInPath(table.rows, path)
        const unitLabel = label ? i18n.t(Labels.getLabel({ label, t: i18n.t })) : i18n.t(`unit.${unit}`)

        rows[0].push(`"${csvColumn}"`)
        rows[1].push(`"${Dates.format(new Date(), 'dd/MM/yyyy')} (${i18n.t('bulkDownload.dateOfExport')})"`)
        rows[2].push(unitLabel)
      }

      return { csvPostProcessor, fileName, includeClimaticDomain, includeDeskStudy, includeForestArea, rows: [row] }
    })
  }
}
