import { useEffect } from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'
import { useIsAssessment } from '@webapp/components/hooks'
import { useAssessmentType } from '@webapp/store/app'

const defaultTheme = {
  '--ui-accent-light': '#c4e7eb',
  '--ui-bg': '#f5f5f5',
  '--ui-bg-hover': '#ebebeb',
}

const themes = {
  [Fra.type]: defaultTheme,
  [PanEuropean.type]: {
    '--ui-accent-light': '#F9E6D6',
    '--ui-bg': '#FFF7F3',
    '--ui-bg-hover': '#FFE9DF',
  },
  null: defaultTheme,
}

export const useTheme = () => {
  const assessmentType = useAssessmentType()
  const isAssessment = useIsAssessment()

  useEffect(() => {
    // @ts-expect-error ts-migrate(2538) FIXME: Type 'unknown' cannot be used as an index type.
    const theme = isAssessment ? themes[assessmentType] : defaultTheme
    Object.entries(theme).forEach(([key, value]) => {
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'unknown' is not assignable to pa... Remove this comment to see the full error message
      document.documentElement.style.setProperty(key, value)
    })
  }, [assessmentType, isAssessment])
}
