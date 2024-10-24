import { Assessment } from 'meta/assessment'
import { User } from 'meta/user/user'

import { RoleName, UserRole } from './userRole'
import { UserRoles } from './userRoles'

describe('UserRoles - getLastRole', () => {
  const mockUser: User = {
    id: 1,
    name: 'Test User',
    roles: [
      {
        id: 1,
        role: RoleName.COLLABORATOR,
        createdAt: '2024-01-01T00:00:00Z',
        assessmentUuid: '1',
      } as UserRole<RoleName.COLLABORATOR>,
      {
        id: 2,
        role: RoleName.REVIEWER,
        createdAt: '2024-02-01T00:00:00Z',
        assessmentUuid: '1',
      } as UserRole<RoleName.REVIEWER>,
      {
        id: 3,
        role: RoleName.VIEWER,
        createdAt: '2024-03-01T00:00:00Z',
        assessmentUuid: '2',
      } as UserRole<RoleName.VIEWER>,
    ],
  } as unknown as User

  const mockAssessment: Assessment = {
    uuid: '1',
  } as Assessment

  it('returns undefined when user is undefined', () => {
    const result = UserRoles.getLastRole({ user: undefined as unknown as User })
    expect(result).toBeUndefined()
  })

  it('returns undefined when user has no roles', () => {
    const result = UserRoles.getLastRole({ user: { ...mockUser, roles: undefined } })
    expect(result).toBeUndefined()
  })

  it('returns single role when user has only one role', () => {
    const userWithOneRole = { ...mockUser, roles: [mockUser.roles[0]] }
    const result = UserRoles.getLastRole({ user: userWithOneRole })
    expect(result).toEqual(mockUser.roles[0])
  })

  it('returns most recent role when no assessment is specified', () => {
    const result = UserRoles.getLastRole({ user: mockUser })
    expect(result).toEqual(mockUser.roles[2])
  })

  it('returns most recent role for specific assessment', () => {
    const result = UserRoles.getLastRole({ user: mockUser, assessment: mockAssessment })
    expect(result).toEqual(mockUser.roles[1])
  })

  it('handles roles without createdAt dates', () => {
    const userWithMixedDates = {
      ...mockUser,
      roles: [
        { ...mockUser.roles[0], createdAt: undefined },
        { ...mockUser.roles[1], createdAt: '2024-02-01T00:00:00Z' },
      ],
    }
    const result = UserRoles.getLastRole({ user: userWithMixedDates })
    expect(result).toEqual(userWithMixedDates.roles[1])
  })
})
