import { Request } from 'express'
import { Profile, VerifyFunction } from 'passport-google-oauth'

import { AuthProvider, UserStatus } from '@meta/user'

import { AssessmentController } from '@server/controller/assessment'
import { UserController } from '@server/controller/user'
import { UserProviderController } from '@server/controller/userProvider'

export const googleStrategyVerifyCallback = async (
  req: Request,
  _accessToken: string,
  _refreshToken: string,
  profile: Profile,
  done: VerifyFunction
): Promise<void> => {
  try {
    const email = profile.emails[0].value.toLowerCase()

    let user = null

    const invitationUuid = req.query.state as string
    if (invitationUuid) {
      const { user: invitedUser, userRole } = await UserController.readByInvitation({ invitationUuid })
      if (invitedUser?.status === UserStatus.invitationPending) {
        const provider = { provider: AuthProvider.google, props: { email } }
        await UserProviderController.create({ user: invitedUser, provider })
      }
      const { assessment, cycle } = await AssessmentController.getOneWithCycle({
        id: userRole.assessmentId,
        cycleUuid: userRole.cycleUuid,
      })
      user = await UserController.acceptInvitation({ assessment, cycle, user: invitedUser, userRole })
    } else {
      user = await UserController.getOne({ emailGoogle: email })
      if (user) {
        const userRole = await UserProviderController.read({ provider: AuthProvider.google, user })
        if (!userRole) user = null
      }
    }

    if (user) {
      done(null, user)
    } else {
      done(null, false, { message: 'login.notAuthorized' })
    }
  } catch (e) {
    done(null, false, { message: `${'login.errorOccurred'}: ${e}` })
  }
}
