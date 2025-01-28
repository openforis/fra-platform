import { DataSlice } from 'client/store/data/slice'

import { clearTableData } from './clearTableData'
import { copyPreviousDatasources } from './copyPreviousDatasources'
import { createContact } from './createContact'
import { deleteContact } from './deleteContact'
import { deleteDataSource } from './deleteDataSource'
import { getContacts } from './getContacts'
import { getDescription } from './getDescription'
import { getLinkedDataSources } from './getLinkedDataSources'
import { getNodeValuesEstimations } from './getNodeValuesEstimations'
import { getODPLastUpdatedTimestamp } from './getODPLastUpdatedTimestamp'
import { getTableData } from './getTableData'
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

  // Contacts
  createContact,
  deleteContact,
  getContacts,
  updateContact,
}
