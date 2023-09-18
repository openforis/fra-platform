import { CountryIso } from 'meta/area'
import { Assessment, Cycle, VariableCache } from 'meta/assessment'
import { NodeUpdate, NodeUpdates } from 'meta/data'

type ConstructorProps = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export class Context {
  private readonly _assessment: Assessment
  private readonly _cycle: Cycle
  private readonly _countryIso: CountryIso
  private readonly _queue: Array<VariableCache>
  private readonly _visitedVariables: Array<VariableCache>
  private readonly _nodesUpdate: Array<NodeUpdate>

  constructor(props: ConstructorProps) {
    const { assessment, cycle, countryIso } = props

    this._assessment = assessment
    this._cycle = cycle
    this._countryIso = countryIso
    this._nodesUpdate = []
    this._queue = []
    this._visitedVariables = []
  }

  get assessment(): Assessment {
    return this._assessment
  }

  get cycle(): Cycle {
    return this._cycle
  }

  get countryIso(): CountryIso {
    return this._countryIso
  }

  get nodeUpdates(): NodeUpdates {
    return { assessment: this._assessment, cycle: this._cycle, countryIso: this._countryIso, nodes: this._nodesUpdate }
  }

  get queue(): Array<VariableCache> {
    return this._queue
  }

  get visitedVariables(): Array<VariableCache> {
    return this._visitedVariables
  }

  pushResult(nodeUpdate: NodeUpdate): void {
    this._nodesUpdate.push(nodeUpdate)
  }
}
