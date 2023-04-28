import { Assessment, CycleName, CycleUuid, Label } from '../../../src/meta/assessment'

export const getCycleUuids = (props: {
  assessment: Assessment
  migration?: { cycles?: Array<CycleName> }
  parentCycleUuids?: Array<CycleUuid>
}): Array<CycleUuid> => {
  const { assessment, migration, parentCycleUuids } = props
  if (parentCycleUuids && !migration?.cycles) {
    return parentCycleUuids
  }

  return assessment.cycles
    .filter((cycle) => (migration?.cycles ? migration?.cycles.includes(cycle.name) : true))
    .map((c) => c.uuid)
}

export const getLabels = (props: {
  assessment: Assessment
  label?: Label
  migration?: { label?: Record<CycleName, Label> }
}): Record<CycleUuid, Label> => {
  const { assessment, label, migration } = props

  if (migration?.label) {
    return assessment.cycles.reduce<Record<CycleUuid, Label>>((acc, cycle) => {
      const cycleLabel = migration.label[cycle.name]
      if (cycleLabel) {
        return { ...acc, [cycle.uuid]: cycleLabel }
      }
      return acc
    }, {})
  }

  if (label) {
    return assessment.cycles.reduce<Record<CycleUuid, Label>>((acc, cycle) => ({ ...acc, [cycle.uuid]: label }), {})
  }

  throw new Error('label or migration must be specified')
}
