import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { RecordRowCache } from 'meta/assessment/rowCache'
import { TableName } from 'meta/assessment/table'
import { RecordTableValidationsState } from 'meta/assessment/validation/table'
import { RecordAssessmentData } from 'meta/data/recordData'

type ConstructorProps = {
  assessment: Assessment
  assessments: RecordAssessments
  country: Country
  cycle: Cycle
  data: RecordAssessmentData
  queue: Array<VariableCache>
  rows: RecordRowCache
  tableNames: Array<TableName>
  tableValidations: RecordTableValidationsState
}

export class Context {
  readonly #assessment: Assessment
  readonly #assessments: RecordAssessments
  readonly #country: Country
  readonly #cycle: Cycle
  readonly #data: RecordAssessmentData
  readonly #queue: Array<VariableCache>
  readonly #rows: RecordRowCache
  readonly #tableNames: Array<TableName>
  readonly #tableValidations: RecordTableValidationsState

  constructor(props: ConstructorProps) {
    const { assessment, assessments, country, cycle, data, queue, rows, tableNames, tableValidations } = props

    this.#assessment = assessment
    this.#assessments = assessments
    this.#country = country
    this.#cycle = cycle
    this.#data = data
    this.#queue = queue
    this.#rows = rows
    this.#tableNames = tableNames
    this.#tableValidations = tableValidations
  }

  get assessment(): Assessment {
    return this.#assessment
  }

  get assessments(): RecordAssessments {
    return this.#assessments
  }

  get country(): Country {
    return this.#country
  }

  get countryIso(): CountryIso {
    return this.#country.countryIso
  }

  get cycle(): Cycle {
    return this.#cycle
  }

  get data(): RecordAssessmentData {
    return this.#data
  }

  get queue(): Array<VariableCache> {
    return this.#queue
  }

  get rows(): RecordRowCache {
    return this.#rows
  }

  get tableNames(): Array<TableName> {
    return this.#tableNames
  }

  get tableValidations(): RecordTableValidationsState {
    return this.#tableValidations
  }
}
