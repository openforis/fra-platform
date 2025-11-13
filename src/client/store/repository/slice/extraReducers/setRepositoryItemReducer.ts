import { ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'

import { RepositoryItem } from 'meta/cycleData/repository/item'
import { RepositoryItemValidator } from 'meta/cycleData/repository/itemValidator'

import { setRepositoryItem } from 'client/store/repository/actions/setRepositoryItem'
import { setRepositoryItemProps } from 'client/store/repository/actions/setRepositoryItemProps'
import { RepositoryState } from 'client/store/repository/state'

export const setRepositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>): void => {
  builder.addCase(setRepositoryItem, (state, action: PayloadAction<Partial<RepositoryItem>>) => {
    state.repositoryItem = action.payload
    state.repositoryItemValidation = undefined
  })

  builder.addCase(setRepositoryItemProps, (state, action: PayloadAction<Partial<RepositoryItem>>) => {
    const repositoryItem = { ...state.repositoryItem, ...action.payload }
    state.repositoryItem = repositoryItem
    state.repositoryItemValidation = RepositoryItemValidator.validate(repositoryItem)
  })
}
