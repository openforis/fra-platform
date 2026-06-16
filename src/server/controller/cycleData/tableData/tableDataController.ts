import { getLastApproved } from 'server/controller/cycleData/tableData/_lastApproved/getLastApproved'
import { clearData } from 'server/controller/cycleData/tableData/clearData'
import { dropViews } from 'server/controller/cycleData/tableData/dropViews'
import { getAggregatedData } from 'server/controller/cycleData/tableData/getAggregatedData'
import { getData } from 'server/controller/cycleData/tableData/getData'
import { getLastPublishedData } from 'server/controller/cycleData/tableData/getLastPublishedData'
import { getNodeValuesEstimations } from 'server/controller/cycleData/tableData/getNodeValuesEstimations'
import { massiveInsert } from 'server/controller/cycleData/tableData/massiveInsert'
import { persistNodeValues, persistNodeValuesEstimated } from 'server/controller/cycleData/tableData/persistNodeValues'
import { refreshViews } from 'server/controller/cycleData/tableData/refreshViews'
import { updateDependencies } from 'server/controller/cycleData/tableData/updateDependencies/updateDependencies'

export const TableDataController = {
  // create
  massiveInsert,

  // read
  getAggregatedData,
  getData,
  getNodeValuesEstimations,
  getLastApproved,
  getLastPublishedData,

  // update
  persistNodeValues,
  persistNodeValuesEstimated,
  updateDependencies,

  // delete
  clearData,
  // DDL
  dropViews,
  refreshViews,
}
