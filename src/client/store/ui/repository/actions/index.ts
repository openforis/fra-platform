import { save } from 'client/store/ui/repository/actions/save'
import { RepositorySlice } from 'client/store/ui/repository/slice'

export const RepositoryActions = {
  save,
  ...RepositorySlice.actions,
}
