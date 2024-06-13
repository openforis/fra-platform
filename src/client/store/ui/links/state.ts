import { AssessmentName, CycleName } from 'meta/assessment'

export type LinksState = {
  isVerificationInProgress?: Record<AssessmentName, Record<CycleName, boolean>>
}

export const initialState: LinksState = {}
