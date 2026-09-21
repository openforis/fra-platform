import { Assessment, AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { getData } from 'server/controller/cycleData/tableData/getData'
import { BaseContextBuilder } from 'server/controller/cycleData/tableData/updateDependencies/context/baseContextBuilder'
import { ContextBuilderProps } from 'server/controller/cycleData/tableData/updateDependencies/context/contextBuilderProps'

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
    const { client } = this.props

    const assessmentName = variable.assessmentName ?? this.props.assessment.props.name
    const cycleName = variable.cycleName ?? this.props.cycle.name

    // External dependents update might reference an assessment different to the context one
    if (!this.#assessments[assessmentName]) {
      this.#assessments[assessmentName] = await AssessmentController.getOne({ assessmentName, metaCache: true }, client)
    }

    if (!this.#tables[assessmentName]?.[cycleName]) {
      const assessment = this.#assessments[assessmentName]
      const cycle = Assessments.getCycle({ assessment, cycleName })
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
    const { client } = this.props
    const { countryIso } = this.props.nodeUpdates
    let data: RecordAssessmentData = {}

    await Promises.each(Object.values(this.#tables), (cycles) =>
      Promises.each(Object.values(cycles), async (tablesFetch) => {
        const { assessment, cycle, tableNames: tableNamesSet } = tablesFetch
        const tableNames = Array.from(tableNamesSet)
        const countryISOs = [countryIso]

        const cycleData = await getData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true }, client)
        data = { ...data, ...cycleData }
      })
    )

    return { assessments: this.#assessments, data }
  }
}
