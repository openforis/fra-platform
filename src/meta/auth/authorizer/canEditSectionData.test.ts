import { Mock, vi } from 'vitest'

import { Areas } from 'meta/area/areas'
import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { CountryStatus } from 'meta/area/countryStatus'
import { Cycle } from 'meta/assessment/cycle'
import { Section } from 'meta/assessment/section'
import { canEditSectionData } from 'meta/auth/authorizer/canEditSectionData'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

vi.mock('meta/area/areas')
vi.mock('meta/user/users')

describe('canEditSectionData', () => {
  const mockSection: Section = { uuid: 'section1' } as Section

  let mockUser: User
  let mockCountry: Country
  let mockCycle: Cycle

  beforeEach(() => {
    vi.resetAllMocks()

    mockUser = { id: 1 } as User
    mockCountry = {
      countryIso: 'X01' as CountryIso,
      props: { status: CountryStatus.editing },
      lastEdit: '2024-03-12 09:53:02.9951',
    } as Country
    mockCycle = { uuid: '2020' } as Cycle

    // Mock Areas functions
    ;(Areas.isISOCountry as Mock).mockReturnValue(true)
    ;(Areas.getStatus as Mock).mockReturnValue(CountryStatus.editing)

    // Mock Users functions
    ;(Users.isAdministrator as Mock).mockReturnValue(false)
    ;(Users.isViewer as Mock).mockReturnValue(false)
    ;(Users.isNationalCorrespondent as Mock).mockReturnValue(false)
    ;(Users.isAlternateNationalCorrespondent as Mock).mockReturnValue(false)
    ;(Users.isCollaborator as Mock).mockReturnValue(false)
    ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(false)
    ;(Users.isReviewer as Mock).mockReturnValue(false)
    ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.VIEWER })
  })

  describe('Basic validation', () => {
    test('should return false when country is null', () => {
      expect(
        canEditSectionData({
          country: null as any,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(false)
    })

    test('should return false when country is not an ISO country', () => {
      ;(Areas.isISOCountry as Mock).mockReturnValue(false)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(false)
    })
  })

  describe('Administrator permissions', () => {
    beforeEach(() => {
      ;(Users.isAdministrator as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.ADMINISTRATOR })
    })

    test('should return true for administrator regardless of status', () => {
      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(true)
    })

    test('should return true for administrator in accepted status', () => {
      ;(Areas.getStatus as Mock).mockReturnValue(CountryStatus.accepted)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(true)
    })
  })

  describe('Viewer permissions', () => {
    beforeEach(() => {
      ;(Users.isViewer as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.VIEWER })
    })

    test('should return false for viewer', () => {
      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(false)
    })
  })

  describe('National Correspondent permissions', () => {
    beforeEach(() => {
      ;(Users.isNationalCorrespondent as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.NATIONAL_CORRESPONDENT })
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [false, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as Mock).mockReturnValue(status)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(expected)
    })
  })

  describe('Alternate National Correspondent permissions', () => {
    beforeEach(() => {
      ;(Users.isAlternateNationalCorrespondent as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT })
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [false, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as Mock).mockReturnValue(status)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(expected)
    })
  })

  describe('Collaborator permissions', () => {
    beforeEach(() => {
      ;(Users.isCollaborator as Mock).mockReturnValue(true)
    })

    test('should return false when country status is review', () => {
      ;(Areas.getStatus as Mock).mockReturnValue(CountryStatus.review)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(false)
    })

    test('should return false when country status is accepted', () => {
      ;(Areas.getStatus as Mock).mockReturnValue(CountryStatus.accepted)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(false)
    })

    describe('with valid status', () => {
      beforeEach(() => {
        ;(Areas.getStatus as Mock).mockReturnValue(CountryStatus.editing)
      })

      test('should return true when collaborator has permission for specific section', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: [mockSection.uuid],
            descriptions: [mockSection.uuid],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
          })
        ).toBe(true)
      })

      test('should return false when collaborator has no permission for specific section', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['different-section'],
            descriptions: ['different-section'],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
          })
        ).toBe(false)
      })

      test('should return true when collaborator has all permissions', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['all'],
            descriptions: ['all'],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
          })
        ).toBe(true)
      })

      test('should return false when collaborator has none permissions', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['none'],
            descriptions: ['none'],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
          })
        ).toBe(false)
      })

      test('should return false when tableData permission is none', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['none'],
            descriptions: [mockSection.uuid],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
            permission: CollaboratorEditPropertyType.tableData,
          })
        ).toBe(false)
      })

      test('should return false when descriptions permission is none', () => {
        ;(Users.getRole as Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: [mockSection.uuid],
            descriptions: ['none'],
          },
        })

        expect(
          canEditSectionData({
            country: mockCountry,
            cycle: mockCycle,
            section: mockSection,
            user: mockUser,
            permission: CollaboratorEditPropertyType.descriptions,
          })
        ).toBe(false)
      })

      describe('permission types', () => {
        test('should respect tableData permission type', () => {
          ;(Users.getRole as Mock).mockReturnValue({
            role: RoleName.COLLABORATOR,
            permissions: {
              tableData: [mockSection.uuid],
              descriptions: ['none'],
            },
          })

          expect(
            canEditSectionData({
              country: mockCountry,
              cycle: mockCycle,
              section: mockSection,
              user: mockUser,
              permission: CollaboratorEditPropertyType.tableData,
            })
          ).toBe(true)
        })

        test('should respect descriptions permission type', () => {
          ;(Users.getRole as Mock).mockReturnValue({
            role: RoleName.COLLABORATOR,
            permissions: {
              tableData: ['none'],
              descriptions: [mockSection.uuid],
            },
          })

          expect(
            canEditSectionData({
              country: mockCountry,
              cycle: mockCycle,
              section: mockSection,
              user: mockUser,
              permission: CollaboratorEditPropertyType.descriptions,
            })
          ).toBe(true)
        })
      })
    })
  })

  describe('Regional focal point permissions', () => {
    beforeEach(() => {
      ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REGIONAL_FOCAL_POINT })
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [true, CountryStatus.review],
      [false, CountryStatus.accepted],
      [false, CountryStatus.published],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as Mock).mockReturnValue(status)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(expected)
    })
  })

  describe('Regional focal point description permissions', () => {
    beforeEach(() => {
      ;(Users.isRegionalFocalPoint as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REGIONAL_FOCAL_POINT })
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [true, CountryStatus.review],
      [true, CountryStatus.accepted],
      [true, CountryStatus.published],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as Mock).mockReturnValue(status)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
          permission: CollaboratorEditPropertyType.descriptions,
        })
      ).toBe(expected)
    })
  })

  describe('Reviewer permissions', () => {
    beforeEach(() => {
      ;(Users.isReviewer as Mock).mockReturnValue(true)
      ;(Users.getRole as Mock).mockReturnValue({ role: RoleName.REVIEWER })
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [true, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as Mock).mockReturnValue(status)

      expect(
        canEditSectionData({
          country: mockCountry,
          cycle: mockCycle,
          section: mockSection,
          user: mockUser,
        })
      ).toBe(expected)
    })
  })
})
