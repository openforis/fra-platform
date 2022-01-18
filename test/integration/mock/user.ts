import { User } from '@core/auth'

export const userMockTest: Pick<User, 'name' | 'email'> = {
  email: 'test@fra-platform.com',
  name: 'Test User',
}

export const userMockUnknown: Pick<User, 'name' | 'email'> = {
  email: 'unknown@fra-platform.com',
  name: 'Unknown User',
}
