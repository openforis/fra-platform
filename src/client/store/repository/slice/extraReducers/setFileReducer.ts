import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RepositoryItemValidator } from 'meta/cycleData'
import { FileSummary } from 'meta/file'

import { setFile } from 'client/store/repository/actions/setFile'
import { RepositoryState } from 'client/store/repository/state'

export const setFileReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(setFile, (state, action: PayloadAction<FileSummary | undefined>) => {
    const fileSummary = action.payload

    if (fileSummary) {
      state.repositoryItem.fileUuid = fileSummary.uuid
      Objects.setInPath({ obj: state, path: ['fileMeta', 'summary'], value: fileSummary })

      const { repositoryItem } = state
      if (Objects.isEmpty(repositoryItem.props.translation.en)) {
        const name = fileSummary.name.split('.').slice(0, -1).join('.')
        const path = ['repositoryItem', 'props', 'translation', 'en']
        Objects.setInPath({ obj: state, path, value: name })
      }
    } else {
      state.repositoryItem.fileUuid = undefined
      state.fileMeta = undefined
    }
    state.repositoryItemValidation = RepositoryItemValidator.validate(state.repositoryItem)
  })
}
