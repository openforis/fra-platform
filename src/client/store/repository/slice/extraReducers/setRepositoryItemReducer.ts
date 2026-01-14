import { ActionReducerMapBuilder, Draft, PayloadAction } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItemValidator } from 'meta/cycleData/repository/itemValidator'

import { setRepositoryItem } from 'client/store/repository/actions/setRepositoryItem'
import { setRepositoryItemProps } from 'client/store/repository/actions/setRepositoryItemProps'
import { RepositoryState } from 'client/store/repository/state'

const _setRepositoryItem = (state: Draft<RepositoryState>, repositoryItem: Partial<RepositoryItem>): void => {
  state.repositoryItem = repositoryItem
  state.repositoryItemValidation = RepositoryItemValidator.validate(repositoryItem)
}

export const setRepositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>): void => {
  builder.addCase(setRepositoryItem, (state, action: PayloadAction<Partial<RepositoryItem>>) => {
    const repositoryItem = action.payload
    _setRepositoryItem(state, repositoryItem)
  })

  builder.addCase(setRepositoryItemProps, (state, action: PayloadAction<Partial<RepositoryItem>>) => {
    const repositoryItem = { ...state.repositoryItem, ...action.payload }
    _setRepositoryItem(state, repositoryItem)
  })
}
