import { AreaCode, CountryIso } from 'meta/area'
import { Assessment, Cycle, VariableCache } from 'meta/assessment'

export type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: AreaCode
  countryISOs: Array<CountryIso>
  tableNames: Array<string> // TODO: refactor use TablesCondition instead
  variables?: Array<string>
  columns?: Array<string>
  mergeOdp?: boolean
  /**
   * @deprecated
   * Merge dependencies to tables condition
   * TODO: Handle dependencies differently (currently only used in calculateNode -> part of updateDependencies job)
   */
  dependencies?: Array<VariableCache>
}
