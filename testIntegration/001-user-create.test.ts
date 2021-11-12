import { UserStatus } from '../core/meta/user'
import { UserService } from '../server/service/user'

test('ExpectedUser === User', async () => {
  const userParams = {
    email: 'test@fra-platform.com',
    name: 'Test User',
  }

  const user = await UserService.create({
    user: userParams,
  })

  expect(user).toHaveProperty('id')
  expect(user.id).toBeTruthy()

  expect(user).toHaveProperty('name')
  expect(user.name).toBe(userParams.name)

  expect(user).toHaveProperty('email')
  expect(user.email).toBe(userParams.email)

  expect(user.status).toBe(UserStatus.invitationPending)
})
