import { getCount } from 'client/store/tablePaginated/actions/getCount'
import { getData } from 'client/store/tablePaginated/actions/getData'
import { refetchData } from 'client/store/tablePaginated/actions/refetchData'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'

export const TablePaginatedActions = {
  ...TablePaginatedSlice.actions,
  getCount,
  getData,
  refetchData,
}
