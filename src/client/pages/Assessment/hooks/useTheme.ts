import { useEffect } from 'react'

import { AssessmentNames } from 'meta/assessment'

import { useAssessment } from 'client/store/assessment'

const defaultTheme = {
  '--ui-accent-light': '#d7eef1',
  '--ui-bg': '#f5f5f5',
  '--ui-bg-hover': '#ebebeb',
}

const themes: Record<string, Record<string, string>> = {
  [AssessmentNames.fra]: defaultTheme,
  [AssessmentNames.panEuropean]: {
    '--ui-accent-light': '#F9E6D6',
    '--ui-bg': '#FFF7F3',
    '--ui-bg-hover': '#FFE9DF',
  },
  null: defaultTheme,
}

export const useTheme = () => {
  const assessment = useAssessment()

  useEffect(() => {
    const theme = assessment ? themes[assessment.props?.name] : defaultTheme
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, [assessment])
}
