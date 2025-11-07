import { apiPath } from 'meta/api/endpoint/_utils'

export const User = {
  many: (): string => apiPath('users'),
  one: (): string => apiPath('users', 'user'),

  invite: (): string => apiPath('users', 'invite'),
  invitation: (): string => apiPath('users', 'invitation'),

  invitationAccept: (): string => apiPath('users', 'invitation', 'accept'),
  invitationSendEmail: (): string => apiPath('users', 'invitation', 'send-email'),

  resetPassword: (): string => apiPath('users', 'reset-password'),

  profilePicture: (id = ':id'): string => apiPath('users', 'profile-picture', id),
}
