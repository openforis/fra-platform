import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RepositoryItem, RepositoryItemValidator } from 'meta/cycleData'
import { FileSummary } from 'meta/file'

import { repositoryFileReducer } from 'client/store/ui/repository/reducers/repositoryFileBuilder'
import { repositoryReducer } from 'client/store/ui/repository/reducers/repositoryReducer'
import { initialState, RepositoryState } from 'client/store/ui/repository/state'

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    reset: () => initialState,

    setRepositoryItem: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      state.repositoryItem = action.payload
      state.repositoryItemValidation = undefined
    },
    setRepositoryItemProps: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      const repositoryItem = { ...state.repositoryItem, ...action.payload }
      state.repositoryItem = repositoryItem
      state.repositoryItemValidation = RepositoryItemValidator.validate(repositoryItem)
    },
    setFile: (state: RepositoryState, action: PayloadAction<FileSummary | undefined>) => {
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
    },
  },
  extraReducers: (builder) => {
    repositoryFileReducer(builder)
    repositoryReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
