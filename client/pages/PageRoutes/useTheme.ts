import { useEffect } from 'react'

import { AssessmentName } from '@core/meta/assessment'
import { useIsAssessment } from '@client/hooks'
import { useAssessment } from '@client/store/assessment'

const defaultTheme = {
  '--ui-accent-light': '#c4e7eb',
  '--ui-bg': '#f5f5f5',
  '--ui-bg-hover': '#ebebeb',
}

const themes = {
  [AssessmentName.fra]: defaultTheme,
  [AssessmentName.panEuropean]: {
    '--ui-accent-light': '#F9E6D6',
    '--ui-bg': '#FFF7F3',
    '--ui-bg-hover': '#FFE9DF',
  },
  null: defaultTheme,
}

export const useTheme = () => {
  const isAssessment = useIsAssessment()
  const assessment = useAssessment()

  useEffect(() => {
    const theme = isAssessment ? themes[assessment?.props.name] : defaultTheme
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [assessment?.props.name, isAssessment])
}
