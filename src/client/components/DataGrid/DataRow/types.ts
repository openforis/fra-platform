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
  onClick?: () => void
  type: DataRowActionType.Delete
}

type Review = {
  subtitle?: string
  title?: string
  topicKey?: string
  type: DataRowActionType.Review
}

export type DataRowAction = EditLink | Delete | Review
