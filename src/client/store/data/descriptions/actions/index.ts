import { copyPreviousDatasources } from 'client/store/data/descriptions/actions/copyPreviousDatasources'
import { deleteDataSource } from 'client/store/data/descriptions/actions/deleteDataSource'
import { getDescription } from 'client/store/data/descriptions/actions/getDescription'
import { updateDescription } from 'client/store/data/descriptions/actions/updateDescription'

export const DescriptionsActions = {
  getDescription,
  updateDescription,
  copyPreviousDatasources,
  deleteDataSource,
}
