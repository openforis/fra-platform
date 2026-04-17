import { RecordAssessments } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Promises } from 'utils/promises'

import { getTableData } from 'server/controller/cycleData/getTableData'

import { BaseContextBuilder } from './baseContextBuilder'
import { ContextBuilderProps } from './contextBuilderProps'

type Returned = {
  assessments: RecordAssessments
  data: RecordAssessmentData
}

type TablesFetch = {
  cycle: Cycle
  tableNames: Set<TableName>
}

export class DataContextBuilder extends BaseContextBuilder {
  readonly #assessments: RecordAssessments
  readonly #tables: Record<CycleName, TablesFetch>

  constructor(props: ContextBuilderProps) {
    super(props)

    const { assessment, cycle } = this.props

    // init assessments
    this.#assessments = { [assessment.props.name]: assessment }

    // init tables to fetch
    this.#tables = {
      [cycle.name]: {
        cycle,
        tableNames: new Set<TableName>(),
      },
    }
  }

  async #ensureTablesFetch(cycleName: CycleName): Promise<TablesFetch> {
    if (!this.#tables[cycleName]) {
      this.#tables[cycleName] = {
        cycle: Assessments.getCycle({ assessment: this.props.assessment, cycleName }),
        tableNames: new Set<TableName>(),
      }
    }

    return this.#tables[cycleName]
  }

  async #addDependency(variable: Pick<VariableCache, 'assessmentName' | 'cycleName' | 'tableName'>): Promise<void> {
    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    if (assessmentName !== this.props.assessment.props.name) {
      throw new Error(`Cross-assessment validation dependencies are not supported: ${assessmentName}`)
    }

    const tablesFetch = await this.#ensureTablesFetch(cycleName)

    tablesFetch.tableNames.add(variable.tableName)
  }

  async addTable(tableName: TableName): Promise<void> {
    // Add the requested table itself before its validation dependencies
    await this.#addDependency({ tableName })

    const dependencies = AssessmentMetaCaches.getTableValidationsDependencies({
      assessment: this.props.assessment,
      cycle: this.props.cycle,
      tableName,
    })

    await Promises.each(Object.values(dependencies).flat(), async (dependency) => {
      await this.#addDependency(dependency)
    })
  }

  async addVariable(variable: VariableCache): Promise<void> {
    const { assessment, cycle } = this.props
    const { tableName, variableName } = variable

    await this.#addDependency(variable)

    const dependencies = AssessmentMetaCaches.getValidationsDependencies({ assessment, cycle, tableName, variableName })
    await Promises.each(dependencies, async (dependency) => {
      await this.#addDependency(dependency)
    })
  }

  async registerRequestedTables(tableNames: Array<TableName>): Promise<void> {
    await Promises.each(tableNames, async (tableName) => {
      await this.addTable(tableName)
    })
  }

  async getData(): Promise<Returned> {
    const { assessment, country } = this.props
    const { countryIso } = country
    let data: RecordAssessmentData = {}

    await Promises.each(Object.values(this.#tables), async (tablesFetch) => {
      const tableNames = Array.from(tablesFetch.tableNames)

      if (tableNames.length === 0) {
        return
      }

      // Fetch the tables collected for this assessment/cycle
      const cycleData = await getTableData({
        assessment,
        countryISOs: [countryIso],
        cycle: tablesFetch.cycle,
        mergeOdp: true,
        tableNames,
      })

      data = RecordAssessmentDatas.mergeData({ newTableData: cycleData, tableData: data })
    })

    return { assessments: this.#assessments, data }
  }
}
