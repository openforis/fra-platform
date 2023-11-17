import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import {
  Assessment,
  AssessmentMetaCaches,
  AssessmentName,
  Cycle,
  CycleName,
  RecordAssessments,
  TableName,
  VariableCache,
} from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { getTableData } from 'server/controller/cycleData/getTableData'

import { BaseContextBuilder } from './baseContextBuilder'
import { ContextBuilderProps } from './contextBuilderProps'

type TablesFetch = { assessment: Assessment; cycle: Cycle; tableNames: Set<TableName> }

export class DataContextBuilder extends BaseContextBuilder {
  readonly #assessments: RecordAssessments
  readonly #tables: Record<AssessmentName, Record<CycleName, TablesFetch>>

  constructor(props: ContextBuilderProps) {
    super(props)

    const { assessment, cycle } = this.props

    // init assessments
    this.#assessments = { [assessment.props.name]: assessment }

    // init tables to fetch
    const initialTablesFetch = { assessment, cycle, tableNames: new Set<TableName>() }
    this.#tables = { [assessment.props.name]: { [cycle.name]: initialTablesFetch } }
  }

  async #addDependency(variable: VariableCache): Promise<void> {
    const { tableName } = variable

    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    if (!this.#assessments[assessmentName]) {
      this.#assessments[assessmentName] = await AssessmentController.getOne({ assessmentName, metaCache: true })
    }

    if (!this.#tables[assessmentName]?.[cycleName]) {
      const assessment = this.#assessments[assessmentName]
      const cycle = assessment.cycles.find((c) => c.name === cycleName)
      const value: TablesFetch = { assessment, cycle, tableNames: new Set<TableName>() }

      Objects.setInPath({ obj: this.#tables, path: [assessmentName, cycleName], value })
    }

    this.#tables[assessmentName][cycleName].tableNames.add(tableName)
  }

  async addVariable(variable: VariableCache): Promise<void> {
    const { tableName, variableName } = variable
    const { assessment, cycle } = this.props

    await this.#addDependency(variable)

    const propsDependencies = { assessment, cycle, tableName, variableName }
    const dependencies = AssessmentMetaCaches.getCalculationsDependencies(propsDependencies)
    await Promises.each(dependencies, this.#addDependency.bind(this))
  }

  async getData(): Promise<{ assessments: RecordAssessments; data: RecordAssessmentData }> {
    const { countryIso } = this.props.nodeUpdates
    let data: RecordAssessmentData = {}

    await Promises.each(Object.values(this.#tables), (cycles) =>
      Promises.each(Object.values(cycles), async (tablesFetch) => {
        const { assessment, cycle, tableNames: tableNamesSet } = tablesFetch
        const tableNames = Array.from(tableNamesSet)
        const countryISOs = [countryIso]

        const cycleData = await getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
        data = { ...data, ...cycleData }
      })
    )

    return { assessments: this.#assessments, data }
  }
}
