import { DataSlice } from 'client/store/data/slice'

import { clearTableData } from './clearTableData'
import { copyPreviousDatasources } from './copyPreviousDatasources'
import { createContact } from './createContact'
import { deleteContact } from './deleteContact'
import { deleteDataSource } from './deleteDataSource'
import { getContacts } from './getContacts'
import { getDescription } from './getDescription'
import { getDescriptionsHistory } from './getDescriptionsHistory'
import { getLinkedDataSources } from './getLinkedDataSources'
import { getNodeValuesEstimations } from './getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './getODPLastUpdatedTimestamp'
import { getTableData } from './getTableData'
import { getTableDataHistory } from './getTableDataHistory'
import { postEstimate } from './postEstimate'
import { setNodeValues } from './setNodeValues'
import { updateContact } from './updateContact'
import { updateDescription } from './updateDescription'
import { updateNodeValues } from './updateNodeValues'

export const DataActions = {
  ...DataSlice.actions,
  // Table data
  setNodeValues,
  clearTableData,
  getTableData,
  getTableDataHistory,
  updateNodeValues,
  getNodeValuesEstimations,

  // Original Data Point
  getODPLastUpdatedTimestamp,

  // Estimations
  postEstimate,

  // Descriptions
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  deleteDataSource,
  getLinkedDataSources,
  getDescriptionsHistory,

  // Contacts
  createContact,
  deleteContact,
  getContacts,
  updateContact,
}
