import { CountryIso } from 'meta/area'
import { Assessment, VariableCache } from 'meta/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type PropsGetTableData = {
  assessment: Assessment
  cycle: Cycle
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
