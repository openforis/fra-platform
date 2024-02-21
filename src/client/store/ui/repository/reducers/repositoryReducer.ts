import { ActionReducerMapBuilder, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { getFileMetadata } from 'client/store/ui/repository/actions/getFileMetadata'
import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const repositoryReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(
    isAnyOf(isPending(upsertRepositoryItem), isPending(removeRepositoryItem), isPending(getFileMetadata)),
    (state) => {
      state.loading = true
    }
  )

  builder.addMatcher(isAnyOf(isFulfilled(upsertRepositoryItem), isFulfilled(removeRepositoryItem)), (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })

  builder.addMatcher(
    isAnyOf(isRejected(upsertRepositoryItem), isRejected(removeRepositoryItem), isRejected(getFileMetadata)),
    (state) => {
      state.loading = false
    }
  )
}
