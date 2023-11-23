export interface NotificationMessage {
  duration?: number
  id: string
  message: string
  params?: Record<string, string>
  type: string
}

export interface NotificationState {
  notifications: Array<NotificationMessage>
}
