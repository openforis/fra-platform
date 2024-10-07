import { Areas, AssessmentStatus, Country, CountryIso } from 'meta/area'
import { Cycle, Section } from 'meta/assessment'

import { User } from '../user'
import { RoleName } from '../userRole'
import { Users } from '../users'
import { canViewReview } from './canViewReview'

jest.mock('meta/area')
jest.mock('../users')

describe('canViewReview', () => {
  const mockSection: Section = { uuid: 'section1' } as Section

  let mockUser: User
  let mockCountry: Country
  let mockCycle: Cycle

  beforeEach(() => {
    jest.resetAllMocks()

    mockUser = { id: 1 } as User
    mockCountry = {
      countryIso: 'X01' as CountryIso,
      props: { status: AssessmentStatus.review },
    } as Country
    mockCycle = { uuid: '2020' } as Cycle
    ;(Areas.isISOCountry as jest.Mock).mockReturnValue(true)
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({})
    ;(Users.getRole as jest.Mock).mockReturnValue({})
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
    ['reviewer', RoleName.REVIEWER],
    ['national correspondent', RoleName.NATIONAL_CORRESPONDENT],
    ['alternate national correspondent', RoleName.ALTERNATE_NATIONAL_CORRESPONDENT],
  ])('should return true for %s in review status', (_, role) => {
    ;(Users.getRole as jest.Mock).mockReturnValue({ role })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test.each([
    ['all sections', 'all', true],
    ['no sections', 'none', false],
    ['specific section', { [mockSection.uuid]: { tableData: true, descriptions: true } }, true],
    ['different section', { differentSection: { tableData: true, descriptions: true } }, false],
  ])('should return %s for collaborator with %s permission', (_, sections, expected) => {
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({ isCollaborator: true })
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: { sections },
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(
      expected
    )
  })

  test('should return true for national correspondent in review status', () => {
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.NATIONAL_CORRESPONDENT })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test('should return true for alternate national correspondent in review status', () => {
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test('should return true for collaborator with all sections permission', () => {
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({ isCollaborator: true })
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: { sections: 'all' },
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test('should return false for collaborator with no sections permission', () => {
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({ isCollaborator: true })
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: { sections: 'none' },
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test('should return true for collaborator with specific section permission', () => {
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({ isCollaborator: true })
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: { sections: { [mockSection.uuid]: { tableData: true, descriptions: true } } },
    })
    expect(canViewReview({ country: mockCountry, section: mockSection, user: mockUser, cycle: mockCycle })).toBe(true)
  })

  test('should return false for collaborator without specific section permission', () => {
    ;(Users.getUserRoles as jest.Mock).mockReturnValue({ isCollaborator: true })
    ;(Users.getRole as jest.Mock).mockReturnValue({
      role: RoleName.COLLABORATOR,
      permissions: {
        sections: {
          section1: { tableData: true, descriptions: true },
        },
      },
    })

    const testSection = { uuid: 'section2' } as Section

    expect(canViewReview({ country: mockCountry, section: testSection, user: mockUser, cycle: mockCycle })).toBe(false)
  })

  test('should return false for country status not in allowed statuses', () => {
    const mockCountryNotInReview = { ...mockCountry, props: { status: AssessmentStatus.accepted } }
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.ADMINISTRATOR })
    expect(
      canViewReview({
        country: mockCountryNotInReview as Country,
        section: mockSection,
        user: mockUser,
        cycle: mockCycle,
      })
    ).toBe(false)
  })
})
