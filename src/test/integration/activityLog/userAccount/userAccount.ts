import { AuthProvider, AuthProviderLocalProps } from 'meta/user/auth'

import { AreaController } from 'server/controller/area'
import { AssessmentController } from 'server/controller/assessment'
import { UserController } from 'server/controller/user'
import { DB } from 'server/db/db'

import changePassword from 'test/integration/activityLog/userAccount/changePassword'
import mergeUsers from 'test/integration/activityLog/userAccount/mergeUsers'
import removeUser from 'test/integration/activityLog/userAccount/removeUser'
import { assessmentCycleName, assessmentParams } from 'test/integration/mock/assessment'
import { nationalDataPointCountryIso } from 'test/integration/mock/nationalDataPoint'
import { userMockKeep, userMockMerge, userMockTest, userMockTestPassword } from 'test/integration/mock/user'
import { testContext } from 'test/integration/testContext'

export default (): void => {
  describe('User account', () => {
    beforeAll(async () => {
      const user = await UserController.getOne({ email: userMockTest.email })
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        assessmentName: assessmentParams.props.name,
        cycleName: assessmentCycleName,
      })
      const country = await AreaController.getCountry({ assessment, countryIso: nationalDataPointCountryIso, cycle })

      const provider = {
        provider: AuthProvider.local,
        props: { password: userMockTestPassword } as AuthProviderLocalProps,
      }
      await UserController.create({ provider, user: userMockKeep })
      await UserController.create({ provider, user: userMockMerge })

      testContext.activityLog = { assessment, country, cycle, user }
    })

    afterAll(async () => {
      // users left over by a failed test
      await DB.none(`delete from public.users where email in ($1:csv)`, [[userMockKeep.email, userMockMerge.email]])
    })

    changePassword()
    mergeUsers()
    removeUser()
  })
}
