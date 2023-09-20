import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle, VariableCache } from 'meta/assessment'
import { NodeUpdate, NodeUpdates, RecordAssessmentData, RecordCountryData } from 'meta/data'

type ConstructorProps = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  data: RecordCountryData
  queue: Array<VariableCache>
}

export class Context {
  readonly #assessment: Assessment
  readonly #cycle: Cycle
  readonly #countryIso: CountryIso
  readonly #data: RecordAssessmentData
  readonly #queue: Array<VariableCache>
  readonly #visitedVariables: Array<VariableCache>
  readonly #nodesUpdate: Array<NodeUpdate>

  constructor(props: ConstructorProps) {
    const { assessment, cycle, countryIso, data, queue } = props

    this.#assessment = assessment
    this.#cycle = cycle
    this.#countryIso = countryIso
    this.#data = data
    this.#nodesUpdate = []
    this.#queue = queue
    this.#visitedVariables = []
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

  get nodeUpdates(): NodeUpdates {
    return { assessment: this.#assessment, cycle: this.#cycle, countryIso: this.#countryIso, nodes: this.#nodesUpdate }
  }

  get queue(): Array<VariableCache> {
    return this.#queue
  }

  get visitedVariables(): Array<VariableCache> {
    return this.#visitedVariables
  }

  pushResult(nodeUpdate: NodeUpdate): void {
    const assessmentName = this.#assessment.props.name
    const cycleName = this.#cycle.name
    const { tableName, colName, variableName } = nodeUpdate
    const path = [assessmentName, cycleName, this.#countryIso, tableName, colName, variableName]
    Objects.setInPath({ obj: this.#data, path, value: nodeUpdate.value })
    this.#nodesUpdate.push(nodeUpdate)
  }
}
