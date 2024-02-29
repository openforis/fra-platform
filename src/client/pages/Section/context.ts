import { createContext, useContext } from 'react'

import { SectionName } from 'meta/assessment'

export type SectionContextValue = {
  sectionName: SectionName
}

export const SectionContext = createContext<SectionContextValue | undefined>(undefined)

export const useSectionContext = () => useContext<SectionContextValue>(SectionContext)
