import { clearTableData } from 'client/store/data/tableData/nodeValues/actions/clearTableData'
import { getTableData } from 'client/store/data/tableData/nodeValues/actions/getTableData'
import { removeOriginalDataPoint } from 'client/store/data/tableData/nodeValues/actions/removeOriginalDataPoint'
import { setNodeValues } from 'client/store/data/tableData/nodeValues/actions/setNodeValues'
import { updateNodeValues } from 'client/store/data/tableData/nodeValues/actions/updateNodeValues'

export const NodeValuesActions = {
  clearTableData,
  getTableData,
  removeOriginalDataPoint,
  setNodeValues,
  updateNodeValues,
}
