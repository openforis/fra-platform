import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { RepositoryItem, RepositoryItemProps } from 'meta/cycleData'

import { removeRepositoryItemReducer } from 'client/store/ui/repository/reducers/removeRepositoryItemReducer'
import { upsertRepositoryItemReducer } from 'client/store/ui/repository/reducers/upsertRepositoryItemReducer'
import { initialState, RepositoryState } from 'client/store/ui/repository/state'

type SetRepositoryItemPropPayload = {
  key: keyof RepositoryItem
  value: string | RepositoryItemProps
}

export const RepositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepositoryItem: (state: RepositoryState, action: PayloadAction<Partial<RepositoryItem>>) => {
      state.repositoryItem = action.payload
    },
    setRepositoryItemProp: (state: RepositoryState, action: PayloadAction<SetRepositoryItemPropPayload>) => {
      const { key, value } = action.payload
      if (!state.repositoryItem) return state

      return Objects.setInPath({ obj: state, path: ['repositoryItem', key], value })
    },
  },
  extraReducers: (builder) => {
    upsertRepositoryItemReducer(builder)
    removeRepositoryItemReducer(builder)
  },
})

export default RepositorySlice.reducer as Reducer<RepositoryState>
