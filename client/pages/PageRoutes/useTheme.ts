// import { useEffect } from 'react'

// import { FRA, PanEuropean } from '@core/assessment'
// import { useIsAssessment } from '../../../webapp/hooks'
// import { useAssessmentType } from '../../../webapp/store/app'

// const defaultTheme = {
//   '--ui-accent-light': '#c4e7eb',
//   '--ui-bg': '#f5f5f5',
//   '--ui-bg-hover': '#ebebeb',
// }
//
// const themes = {
//   [FRA.type]: defaultTheme,
//   [PanEuropean.type]: {
//     '--ui-accent-light': '#F9E6D6',
//     '--ui-bg': '#FFF7F3',
//     '--ui-bg-hover': '#FFE9DF',
//   },
//   null: defaultTheme,
// }

export const useTheme = () => {
  // const assessmentType = useAssessmentType()
  // const isAssessment = useIsAssessment()
  //
  // useEffect(() => {
  //   const theme = isAssessment ? themes[assessmentType] : defaultTheme
  //   Object.entries(theme).forEach(([key, value]) => {
  //     document.documentElement.style.setProperty(key, value)
  //   })
  // }, [assessmentType, isAssessment])
}
