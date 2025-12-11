import { vi } from 'vitest'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'
import { canViewReview } from 'meta/auth/authorizer/canViewReview'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

vi.mock('meta/area/areas')
vi.mock('meta/user/users')

describe('canViewReview', () => {
  const mockSection: Section = { uuid: 'section1' } as Section

  let mockUser: User
  let mockCountry: Country
  let mockCycle: Cycle

  beforeEach(() => {
    vi.resetAllMocks()

    mockUser = { id: 1 } as User
    mockCountry = {
      countryIso: 'X01' as CountryIso,
      props: { status: CountryStatus.review },
      lastEdit: '2024-03-12 09:53:02.9951',
    } as Country
    mockCycle = { uuid: '2020' } as Cycle
    ;(Areas.isISOCountry as jest.Mock).mockReturnValue(true)
    ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.review)
    ;(Users.isAdministrator as jest.Mock).mockReturnValue(false)
    ;(Users.isReviewer as jest.Mock).mockReturnValue(false)
    ;(Users.isNationalCorrespondent as jest.Mock).mockReturnValue(false)
    ;(Users.isAlternateNationalCorrespondent as jest.Mock).mockReturnValue(false)
    ;(Users.isCollaborator as jest.Mock).mockReturnValue(false)
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.VIEWER })
  })

  test('should return false when country is null', () => {
    expect(canViewReview({ country: null, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test('should return false when section is null', () => {
    expect(canViewReview({ country: mockCountry, section: null, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test('should return false when user is null', () => {
    expect(canViewReview({ country: mockCountry, section: mockSection, user: null, cycle: mockCycle })).toBe(false)
  })

  test('should return false when country is not an ISO country', () => {
    ;(Areas.isISOCountry as jest.Mock).mockReturnValue(false)
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test.each([
    ['administrator', 'isAdministrator', RoleName.ADMINISTRATOR],
    ['reviewer', 'isReviewer', RoleName.REVIEWER],
    ['national correspondent', 'isNationalCorrespondent', RoleName.NATIONAL_CORRESPONDENT],
    ['alternate national correspondent', 'isAlternateNationalCorrespondent', RoleName.ALTERNATE_NATIONAL_CORRESPONDENT],
  ])('should return true for %s in review status', (_, roleFn, roleName) => {
    ;(Users[roleFn as keyof typeof Users] as jest.Mock).mockReturnValue(true)
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: roleName })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test('should return true for collaborator in review status with proper permissions', () => {
    ;(Users.isCollaborator as jest.Mock).mockReturnValue(true)
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: {
        tableData: ['all'],
        descriptions: ['all'],
      },
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test.each([
    ['all sections', { tableData: ['all'], descriptions: ['all'] }, true],
    ['no sections', { tableData: ['none'], descriptions: ['none'] }, false],
    ['specific section', { tableData: [mockSection.uuid], descriptions: [mockSection.uuid] }, true],
    ['different section', { tableData: ['differentSection'], descriptions: ['differentSection'] }, false],
  ])('should return %s for collaborator with %s permission', (_, permissions, expected) => {
    ;(Users.isCollaborator as jest.Mock).mockReturnValue(true)
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions,
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(
      expected
    )
  })

  test('should return false for collaborator without specific section permission', () => {
    ;(Users.isCollaborator as jest.Mock).mockReturnValue(true)
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: {
        tableData: ['section1'],
        descriptions: ['section1'],
      },
    })

    const testSection = { uuid: 'section2' } as Section

    expect(canViewReview({ country: mockCountry, section: testSection, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test('should return true for admin when country status is accepted', () => {
    const mockCountryNotInReview = { ...mockCountry, props: { status: CountryStatus.accepted } }
    ;(Users.isAdministrator as jest.Mock).mockReturnValue(true)
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.ADMINISTRATOR })
    expect(
      canViewReview({
        country: mockCountryNotInReview as Country,
        section: mockSection,
        user: mockUser,
        cycle: mockCycle,
      })
    ).toBe(true)
  })
})
