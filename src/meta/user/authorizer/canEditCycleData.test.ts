import { Areas, Country, CountryIso, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'

import { User } from '../user'
import { RoleName } from '../userRole'
import { Users } from '../users'
import { canEditCycleData } from './canEditCycleData'

jest.mock('meta/area')
jest.mock('../users')

describe('canEditCycleData', () => {
  let mockUser: User
  let mockCountry: Country
  let mockCycle: Cycle

  beforeEach(() => {
    jest.resetAllMocks()

    mockUser = { id: 1 } as User
    mockCountry = {
      countryIso: 'X01' as CountryIso,
      props: { status: CountryStatus.editing },
    } as Country
    mockCycle = { uuid: '2020' } as Cycle
    ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.editing)
    ;(Users.isViewer as jest.Mock).mockReturnValue(false)
    ;(Users.isAdministrator as jest.Mock).mockReturnValue(false)
    ;(Users.isNationalCorrespondent as jest.Mock).mockReturnValue(false)
    ;(Users.isAlternateNationalCorrespondent as jest.Mock).mockReturnValue(false)
    ;(Users.isCollaborator as jest.Mock).mockReturnValue(false)
    ;(Users.isReviewer as jest.Mock).mockReturnValue(false)
    ;(Users.getRole as jest.Mock).mockReturnValue({ role: RoleName.VIEWER })
  })

  test('should return false when user is null', () => {
    expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: null })).toBe(false)
  })

  test('should return false for viewer', () => {
    ;(Users.isViewer as jest.Mock).mockReturnValue(true)
    expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
  })

  test('should return true for administrator', () => {
    ;(Users.isAdministrator as jest.Mock).mockReturnValue(true)
    expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
  })

  describe('National Correspondent', () => {
    beforeEach(() => {
      ;(Users.isNationalCorrespondent as jest.Mock).mockReturnValue(true)
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [false, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as jest.Mock).mockReturnValue(status)
      expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(expected)
    })
  })

  describe('Alternate National Correspondent', () => {
    beforeEach(() => {
      ;(Users.isAlternateNationalCorrespondent as jest.Mock).mockReturnValue(true)
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [false, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as jest.Mock).mockReturnValue(status)
      expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(expected)
    })
  })

  describe('Collaborator', () => {
    beforeEach(() => {
      ;(Users.isCollaborator as jest.Mock).mockReturnValue(true)
      ;(Users.getRole as jest.Mock).mockReturnValue({
        role: RoleName.COLLABORATOR,
        permissions: {
          tableData: [],
          descriptions: [],
        },
      })
    })

    test('should return false when country status is review', () => {
      ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.review)
      expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
    })

    test('should return false when country status is accepted', () => {
      ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.accepted)
      expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
    })

    describe('with editing status', () => {
      beforeEach(() => {
        ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.editing)
      })

      test('should return true when permissions allow tableData and descriptions', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['section1'],
            descriptions: ['section1'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
      })

      test('should return false when tableData includes none', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['none'],
            descriptions: ['section1'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
      })

      test('should return false when descriptions includes none', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['section1'],
            descriptions: ['none'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
      })

      test('should return false when both tableData and descriptions include none', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['none'],
            descriptions: ['none'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
      })

      test('should return true when permissions are undefined', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: undefined,
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
      })

      test('should return true when tableData is undefined', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            descriptions: ['section1'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
      })

      test('should return true when descriptions is undefined', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['section1'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
      })
    })

    describe('with notStarted status', () => {
      beforeEach(() => {
        ;(Areas.getStatus as jest.Mock).mockReturnValue(CountryStatus.notStarted)
      })

      test('should return true when permissions allow editing', () => {
        ;(Users.getRole as jest.Mock).mockReturnValue({
          role: RoleName.COLLABORATOR,
          permissions: {
            tableData: ['section1'],
            descriptions: ['section1'],
          },
        })

        expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(true)
      })
    })
  })

  describe('Reviewer', () => {
    beforeEach(() => {
      ;(Users.isReviewer as jest.Mock).mockReturnValue(true)
    })

    test.each([
      [true, CountryStatus.notStarted],
      [true, CountryStatus.editing],
      [true, CountryStatus.review],
      [false, CountryStatus.accepted],
    ])('should return %s when country status is %s', (expected, status) => {
      ;(Areas.getStatus as jest.Mock).mockReturnValue(status)
      expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(expected)
    })
  })

  test('should return false for unknown role', () => {
    expect(canEditCycleData({ cycle: mockCycle, country: mockCountry, user: mockUser })).toBe(false)
  })
})
