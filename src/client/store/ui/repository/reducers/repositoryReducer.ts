import { ActionReducerMapBuilder, isAnyOf, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'

import { getFileMeta } from 'client/store/ui/repository/actions/getFileMeta'
import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const repositoryReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(
    isAnyOf(isPending(upsertRepositoryItem), isPending(removeRepositoryItem), isPending(getFileMeta)),
    (state) => {
      state.loading = true
    }
  )

  builder.addMatcher(isAnyOf(isFulfilled(upsertRepositoryItem), isFulfilled(removeRepositoryItem)), (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })

  builder.addMatcher(
    isAnyOf(isRejected(upsertRepositoryItem), isRejected(removeRepositoryItem), isRejected(getFileMeta)),
    (state) => {
      state.loading = false
    }
  )
}
