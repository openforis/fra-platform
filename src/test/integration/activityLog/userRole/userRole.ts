import { Lang } from 'meta/lang'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'

import removeRole from 'test/integration/activityLog/userRole/removeRole'
import updateRoleName from 'test/integration/activityLog/userRole/updateRoleName'
import updateRolePermissions from 'test/integration/activityLog/userRole/updateRolePermissions'
import updateRoleProps from 'test/integration/activityLog/userRole/updateRoleProps'
import updateRoles from 'test/integration/activityLog/userRole/updateRoles'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockTest, userMockUnknown } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('User role', () => {
    beforeAll(async () => {
      const testUser = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })
      // test user as admin
      const user = { ...testUser, roles: [...testUser.roles, { role: RoleName.ADMINISTRATOR } as UserRole] }

      // target user: collaborator of the country
      const { user: invitedUser, userInvitation } = await UserController.invite({
        assessment,
        countryIso: country.countryIso,
        cycle,
        user,
        userInvitation: {
          email: userMockUnknown.email,
          language: Lang.en,
          name: userMockUnknown.props.name,
          role: RoleName.COLLABORATOR,
          surname: userMockUnknown.props.surname,
        },
      })
      await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userInvitation })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    afterAll(async () => {
      await UserController.remove({ user: testContext.activityLog.user, userToRemove: userMockUnknown })
    })

    updateRolePermissions()
    updateRoleProps()
    updateRoleName()
    updateRoles()
    removeRole()
  })
}
