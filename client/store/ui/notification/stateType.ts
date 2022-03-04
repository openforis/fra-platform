export interface NotificationMessage {
  duration?: number
  id: string
  message: string
  type: string
}

export interface NotificationState {
  notifications: Array<NotificationMessage>
}
