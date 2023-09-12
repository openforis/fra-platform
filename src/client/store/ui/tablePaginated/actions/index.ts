import { getCount } from 'client/store/ui/tablePaginated/actions/getCount'
import { getData } from 'client/store/ui/tablePaginated/actions/getData'
import { TablePaginatedSlice } from 'client/store/ui/tablePaginated/slice'

export const TablePaginatedActions = {
  ...TablePaginatedSlice.actions,
  getCount,
  getData,
}
