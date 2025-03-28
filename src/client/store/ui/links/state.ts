import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'

export type LinksState = {
  isVerificationInProgress?: Record<AssessmentName, Record<CycleName, boolean>>
}

export const initialState: LinksState = {}
