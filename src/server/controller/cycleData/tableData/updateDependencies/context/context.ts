import { CountryIso } from 'meta/area/countryIso'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { VariableCache } from 'meta/assessment/metaCache'
import { RecordRowCache } from 'meta/assessment/rowCache'
import { NodeUpdates } from 'meta/data/nodeUpdates'
import { RecordAssessmentData, RecordCountryData } from 'meta/data/recordData'

import { ContextResult } from 'server/controller/cycleData/tableData/updateDependencies/context/contextResult'

type ConstructorProps = {
  assessments: RecordAssessments
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  data: RecordCountryData
  queue: Array<VariableCache>
  rows: RecordRowCache
  visitedVariables: Array<VariableCache>
  externalDependants: Array<NodeUpdates>
}

export class Context {
  readonly #assessments: RecordAssessments
  readonly #assessment: Assessment
  readonly #cycle: Cycle
  readonly #countryIso: CountryIso
  readonly #data: RecordAssessmentData
  readonly #queue: Array<VariableCache>
  readonly #rows: RecordRowCache
  readonly #visitedVariables: Array<VariableCache>
  readonly #result: ContextResult
  readonly #externalDependants: Array<NodeUpdates>

  constructor(props: ConstructorProps) {
    const { assessment, assessments, countryIso, cycle, data, externalDependants, queue, rows, visitedVariables } =
      props

    this.#assessments = assessments
    this.#assessment = assessment
    this.#cycle = cycle
    this.#countryIso = countryIso
    this.#data = data
    this.#queue = queue
    this.#rows = rows
    this.#visitedVariables = visitedVariables
    this.#externalDependants = externalDependants
    this.#result = new ContextResult({ context: this })
  }

  get assessments(): RecordAssessments {
    return this.#assessments
  }

  get assessment(): Assessment {
    return this.#assessment
  }

  get cycle(): Cycle {
    return this.#cycle
  }

  get countryIso(): CountryIso {
    return this.#countryIso
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

  get visitedVariables(): Array<VariableCache> {
    return this.#visitedVariables
  }

  get externalDependants(): Array<NodeUpdates> {
    return this.#externalDependants
  }

  get result(): ContextResult {
    return this.#result
  }
}
