import { ActionReducerMapBuilder, isAnyOf, isFulfilled, isRejected } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { deleteFile } from 'client/store/ui/assessmentFiles/actions'
import { AssessmentFilesState } from 'client/store/ui/assessmentFiles/stateType'

const _updateFile = (state: AssessmentFilesState, fileCountryIso: CountryIso, uuid: string, loading: boolean) => {
  const files = fileCountryIso ? state[fileCountryIso] : state.globals
  const fileIndex = files.findIndex((f) => f.uuid === uuid)

  if (fileIndex !== -1) files[fileIndex] = { ...files[fileIndex], loading }
}

export const setFileLoadingReducer = (builder: ActionReducerMapBuilder<AssessmentFilesState>) => {
  // Set file loading: true when delete pending
  builder.addCase(deleteFile.pending, (state, { meta }) => {
    const { arg } = meta
    const { fileCountryIso, uuid } = arg
    _updateFile(state, fileCountryIso, uuid, true)
  })

  // Set file loading: false when delete fulfilled or rejected
  builder.addMatcher(isAnyOf(isFulfilled(deleteFile), isRejected(deleteFile)), (state, { meta }) => {
    const { arg } = meta
    const { fileCountryIso, uuid } = arg
    _updateFile(state, fileCountryIso, uuid, false)
  })
}
