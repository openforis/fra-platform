import { useSelector } from 'react-redux'

import * as AppState from '@webapp/app/appState'

export const useAssessmentType = () => useSelector(AppState.getAssessmentType)
