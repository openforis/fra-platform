import { apiPath } from 'meta/api/endpoint/_utils'

export const Admin = {
  countries: (): string => apiPath('admin', 'countries'),
  countriesCount: (): string => apiPath('admin', 'countries', 'count'),
  invitations: (): string => apiPath('admin', 'invitations'),
  invitationsCount: (): string => apiPath('admin', 'invitations', 'count'),
  users: (): string => apiPath('admin', 'users'),
  usersCount: (): string => apiPath('admin', 'users', 'count'),
  usersExport: (): string => apiPath('admin', 'users', 'export'),
}
