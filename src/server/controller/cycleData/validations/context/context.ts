import { CountryIso } from 'meta/area/countryIso'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { TableName } from 'meta/assessment/table'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentData } from 'meta/data/recordData'

type ConstructorProps = {
  assessment: Assessment
  assessments: RecordAssessments
  countryIso: CountryIso
  cycle: Cycle
  data: RecordAssessmentData
  externalNodeUpdates: Array<NodeUpdates>
  tableNames: Array<TableName>
}

export class Context {
  readonly #assessment: Assessment
  readonly #assessments: RecordAssessments
  readonly #countryIso: CountryIso
  readonly #cycle: Cycle
  readonly #data: RecordAssessmentData
  readonly #externalNodeUpdates: Array<NodeUpdates>
  readonly #tableNames: Array<TableName>

  constructor(props: ConstructorProps) {
    const { assessment, assessments, countryIso, cycle, data, externalNodeUpdates, tableNames } = props

    this.#assessment = assessment
    this.#assessments = assessments
    this.#countryIso = countryIso
    this.#cycle = cycle
    this.#data = data
    this.#externalNodeUpdates = externalNodeUpdates
    this.#tableNames = tableNames
  }

  get assessment(): Assessment {
    return this.#assessment
  }

  get assessments(): RecordAssessments {
    return this.#assessments
  }

  get countryIso(): CountryIso {
    return this.#countryIso
  }

  get cycle(): Cycle {
    return this.#cycle
  }

  get data(): RecordAssessmentData {
    return this.#data
  }

  get externalNodeUpdates(): Array<NodeUpdates> {
    return this.#externalNodeUpdates
  }

  get tableNames(): Array<TableName> {
    return this.#tableNames
  }
}
