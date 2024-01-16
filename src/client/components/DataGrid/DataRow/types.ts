export enum DataRowActionType {
  EditLink = 'editLink',
  Delete = 'delete',
  Review = 'review',
}

type EditLink = {
  type: DataRowActionType.EditLink
  url?: string
}

type Delete = {
  type: DataRowActionType.Delete
  onDelete?: () => void
}

type Review = {
  type: DataRowActionType.Review
  title?: string
  topicKey?: string
}

export type DataRowAction = EditLink | Delete | Review
