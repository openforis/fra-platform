import { Objects } from '@core/utils'
import { validEmail } from '@common/userUtils'
import { Request } from 'express'
import { UserProviderRepository, UserRepository } from '@server/repository'
import * as bcrypt from 'bcrypt'

export const localStrategyVerifyCallback = async (_req: Request, email: string, password: string, done: any) => {
  const sendErr = (message: string) => done(null, false, { message })

  try {
    // const { invitationUUID } = req.body

    // accepting invitation
    // if (invitationUUID) {
    //   const invitation = await userRepository.fetchInvitation(invitationUUID);
    //   const password2 = req.body.password2 || "";
    //   // validating invitation
    //   if (!invitation) {
    //     sendResp(null, "login.noInvitation");
    //   } else {
    //     const user = await userRepository.findUserByEmail(email);
    //     if (user) {
    //       // existing user
    //       if (Objects.isEmpty(password.trim())) {
    //         sendResp(null, "login.noEmptyPassword");
    //       } else {
    //         const validatedUser = await userRepository.findUserByEmailAndPassword(email, password);
    //         if (validatedUser) {
    //           const hash = await passwordHash(password);
    //           const acceptedUser = await db.transaction(userRepository.acceptInvitationLocalUser, [
    //             invitationUUID,
    //             hash
    //           ]);
    //           sendResp(acceptedUser);
    //         } else {
    //           sendResp(null, "login.noMatchingUser");
    //         }
    //       }
    //     } else {
    //       // new user
    //       if (Objects.isEmpty(password.trim()) || Objects.isEmpty(password2.trim())) {
    //         sendResp(null, "Passwords cannot be empty");
    //       } else if (password.trim() !== password2.trim()) {
    //         sendResp(null, "Passwords don't match");
    //       } else if (!validPassword(password)) {
    //         sendResp(null, "login.passwordError");
    //       } else {
    //         const hash = await passwordHash(password);
    //         const _user = await db.transaction(userRepository.acceptInvitationLocalUser, [invitationUUID, hash]);
    //         sendResp(_user);
    //       }
    //     }
    //   }
    // login
    if (!validEmail({ email })) {
      sendErr('login.invalidEmail')
    } else if (Objects.isEmpty(password.trim())) {
      sendErr('login.noEmptyPassword')
    } else {
      // const user = await userRepository.findUserByEmailAndPassword(email, password)

      const user = await UserRepository.read({ user: { email } })
      const userProvider = await UserProviderRepository.read({ user, provider: 'local' })

      const passwordMatch = await bcrypt.compare(password, userProvider.props.password)

      if (passwordMatch) {
        done(null, user)
      } else {
        sendErr('login.noMatchingUser')
      }
    }
  } catch (e) {
    console.log('Error occurred while authenticating', e)
    sendErr(`${'login.errorOccurred'}: ${e}`)
  }
}
