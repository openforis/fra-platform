import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'

import { MeasureName } from 'meta/measurement/measure'
import { UnitName } from 'meta/measurement/unit'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerUnits } from 'client/store/explorer/selection/hooks/units'
import { useAppDispatch } from 'client/store/hooks'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useAllMeasuresUnitOptions } from 'client/pages/Explorer/Filters/Options/hooks/useAllMeasuresUnitOptions'
import { UnitSelectorItem } from 'client/pages/Explorer/Filters/Options/types'

type UnitPair = {
  measureName: MeasureName
  unitName: UnitName
}

type Returned = {
  applyUnitSelection: () => void
  resetUnitSelection: () => void
  unitSelectors: Array<UnitSelectorItem>
}

export const useMeasuresUnitSelectors = (): Returned => {
  const dispatch = useAppDispatch()
  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const [, startTransition] = useTransition()

  const measuresOptions = useAllMeasuresUnitOptions()
  const storeSelectedUnits = useExplorerUnits()

  const defaults = useMemo(() => {
    const map: Record<MeasureName, UnitName | null> = {}
    measuresOptions.forEach(({ baseUnit, measureName }) => {
      map[measureName] = storeSelectedUnits?.[measureName] ?? baseUnit ?? null
    })
    return map
  }, [measuresOptions, storeSelectedUnits])

  const [unitSelections, setUnitSelections] = useState<Record<MeasureName, UnitName | null>>(defaults)

  useEffect(() => {
    setUnitSelections(defaults)
  }, [defaults])

  const unitSelectors = useMemo<Returned['unitSelectors']>(() => {
    return measuresOptions.map(({ measureName, options }) => ({
      measureName,
      options,
      selectedUnit: unitSelections[measureName] ?? null,
      onChange: (unit: UnitName) =>
        setUnitSelections((prev) => ({
          ...prev,
          [measureName]: unit,
        })),
    }))
  }, [measuresOptions, unitSelections])

  const resetUnitSelection = useCallback(() => {
    setUnitSelections(defaults)
  }, [defaults])

  const applyUnitSelection = useCallback(() => {
    const unitsArray = Object.entries(unitSelections).reduce<Array<UnitPair>>((acc, [measureName, unit]) => {
      if (unit !== null) {
        acc.push({ measureName, unitName: unit })
      }
      return acc
    }, [])

    startTransition(() => {
      dispatch(
        ExplorerSelectionActions.setUnits({
          assessmentName,
          cycleName,
          sectionName,
          units: unitsArray,
        })
      )
    })
  }, [assessmentName, cycleName, dispatch, sectionName, unitSelections])

  return {
    applyUnitSelection,
    resetUnitSelection,
    unitSelectors,
  }
}
