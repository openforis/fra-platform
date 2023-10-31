import { createSelector } from '@reduxjs/toolkit'

import { SectionName, TableSection } from 'meta/assessment'

import { RootState, useAppSelector } from 'client/store'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  sectionName: string
}

export const useTableSections = (props: Props): Array<TableSection> => {
  const { sectionName } = props

  const { assessmentName, cycleName } = useSectionRouteParams()

  return useAppSelector(
    createSelector(
      (state: RootState) => state,
      (state: RootState) => state.metadata.tableSections?.[assessmentName]?.[cycleName]?.[sectionName] ?? []
    )
  )
}

export const useTableSectionsCycle = (): Array<TableSection> => {
  const { assessmentName, cycleName } = useSectionRouteParams()

  return useAppSelector(
    createSelector(
      (state: RootState) => state.metadata.tableSections?.[assessmentName]?.[cycleName] ?? {},
      (sections: Record<SectionName, Array<TableSection>>) => {
        return Object.values(sections).reduce<Array<TableSection>>((acc, tableSections) => {
          tableSections?.forEach((tableSection) => {
            acc.push(tableSection)
          })
          return acc
        }, [])
      }
    )
  )
}
