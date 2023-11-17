import { CountryIso } from 'meta/area'
import { Assessment, Cycle, RecordAssessments, RecordRowCache, VariableCache } from 'meta/assessment'
import { NodeUpdates, RecordAssessmentData, RecordCountryData } from 'meta/data'

import { ContextResult } from './contextResult'

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
    const { assessments, assessment, cycle, countryIso, data, queue, rows, visitedVariables, externalDependants } =
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
