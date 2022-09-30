import { Assessment } from '../../../src/meta/assessment'

export type CycleName = string
export type CycleUuid = string

type Props = {
  assessment: Assessment
  migration?: { cycles?: Array<CycleName> }
  parentCycleUuids?: Array<CycleUuid>
}

export const getCycleUuids = (props: Props): Array<CycleUuid> => {
  const { assessment, migration, parentCycleUuids } = props
  if (parentCycleUuids && !migration?.cycles) {
    return parentCycleUuids
  }

  return assessment.cycles
    .filter((cycle) => (migration?.cycles ? migration?.cycles.includes(cycle.name) : true))
    .map((c) => c.uuid)
}
