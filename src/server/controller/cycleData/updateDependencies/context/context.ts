import { CountryIso } from 'meta/area'
import { Assessment, Cycle, VariableCache } from 'meta/assessment'
import { RecordAssessmentData, RecordCountryData } from 'meta/data'

import { ContextResult } from './contextResult'

type ConstructorProps = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  data: RecordCountryData
  queue: Array<VariableCache>
  visitedVariables: Array<VariableCache>
}

export class Context {
  readonly #assessment: Assessment
  readonly #cycle: Cycle
  readonly #countryIso: CountryIso
  readonly #data: RecordAssessmentData
  readonly #queue: Array<VariableCache>
  readonly #visitedVariables: Array<VariableCache>
  readonly #result: ContextResult

  constructor(props: ConstructorProps) {
    const { assessment, cycle, countryIso, data, queue, visitedVariables } = props

    this.#assessment = assessment
    this.#cycle = cycle
    this.#countryIso = countryIso
    this.#data = data
    this.#queue = queue
    this.#visitedVariables = visitedVariables
    this.#result = new ContextResult({ context: this })
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

  get visitedVariables(): Array<VariableCache> {
    return this.#visitedVariables
  }

  get result(): ContextResult {
    return this.#result
  }
}
