type EditLink = {
  type: 'editLink'
  url?: string
}

type Delete = {
  type: 'delete'
  onDelete?: () => void
}

type Review = {
  type: 'review'
  title?: string
  topicKey?: string
}

export type Action = EditLink | Delete | Review
