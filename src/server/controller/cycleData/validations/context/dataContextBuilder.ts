import { Assessment, AssessmentName, RecordAssessments } from 'meta/assessment/assessment'
import { Assessments } from 'meta/assessment/assessments'
import { Cycle, CycleName } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { AssessmentMetaCaches } from 'meta/assessment/metaCaches'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'
import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { getTableData } from 'server/controller/cycleData/getTableData'

import { BaseContextBuilder } from './baseContextBuilder'
import { ContextBuilderProps } from './contextBuilderProps'

type Returned = {
  assessments: RecordAssessments
  data: RecordAssessmentData
}

type TablesFetch = {
  assessment: Assessment
  cycle: Cycle
  tableNames: Set<TableName>
}

export class DataContextBuilder extends BaseContextBuilder {
  readonly #assessments: RecordAssessments
  readonly #tables: Record<AssessmentName, Record<CycleName, TablesFetch>>

  constructor(props: ContextBuilderProps) {
    super(props)

    const { assessment, cycle } = this.props

    // init assessments
    this.#assessments = { [assessment.props.name]: assessment }

    // init tables to fetch
    this.#tables = {
      [assessment.props.name]: {
        [cycle.name]: {
          assessment,
          cycle,
          tableNames: new Set<TableName>(),
        },
      },
    }
  }

  async #ensureAssessment(assessmentName: AssessmentName): Promise<Assessment> {
    if (!this.#assessments[assessmentName]) {
      this.#assessments[assessmentName] = await AssessmentController.getOne({ assessmentName, metaCache: true })
    }

    return this.#assessments[assessmentName]
  }

  async #ensureTablesFetch(assessmentName: AssessmentName, cycleName: CycleName): Promise<TablesFetch> {
    if (!this.#tables[assessmentName]?.[cycleName]) {
      // Validation dependencies may point to another assessment/cycle
      const assessment = await this.#ensureAssessment(assessmentName)
      const cycle = Assessments.getCycle({ assessment, cycleName })

      Objects.setInPath({
        obj: this.#tables,
        path: [assessmentName, cycleName],
        value: { assessment, cycle, tableNames: new Set<TableName>() },
      })
    }

    return this.#tables[assessmentName][cycleName]
  }

  async #addDependency(props: Pick<VariableCache, 'assessmentName' | 'cycleName' | 'tableName'>): Promise<void> {
    const assessmentName = props.assessmentName ?? this.props.assessment.props.name
    const cycleName = props.cycleName ?? this.props.cycle.name
    const tablesFetch = await this.#ensureTablesFetch(assessmentName, cycleName)

    tablesFetch.tableNames.add(props.tableName)
  }

  async addTable(tableName: TableName): Promise<void> {
    // Add the requested table itself before its validation dependencies
    await this.#addDependency({ tableName })

    const dependencies = AssessmentMetaCaches.getTableValidationsDependencies({
      assessment: this.props.assessment,
      cycle: this.props.cycle,
      tableName,
    })

    // Validation formulas can read from other local or external tables
    await Promises.each(Object.values(dependencies).flat(), async (dependency) => {
      await this.#addDependency(dependency)
    })
  }

  async registerRequestedTables(tableNames: Array<TableName>): Promise<void> {
    await Promises.each(tableNames, async (tableName) => {
      await this.addTable(tableName)
    })
  }

  async getData(): Promise<Returned> {
    const { countryIso } = this.props
    let data: RecordAssessmentData = {}

    await Promises.each(Object.values(this.#tables), async (cycles) => {
      await Promises.each(Object.values(cycles), async (tablesFetch) => {
        const tableNames = Array.from(tablesFetch.tableNames)

        if (tableNames.length === 0) {
          return
        }

        const cycleData = await getTableData({
          assessment: tablesFetch.assessment,
          countryISOs: [countryIso],
          cycle: tablesFetch.cycle,
          mergeOdp: true,
          tableNames,
        })

        data = RecordAssessmentDatas.mergeData({ newTableData: cycleData, tableData: data })
      })
    })

    return { assessments: this.#assessments, data }
  }
}
