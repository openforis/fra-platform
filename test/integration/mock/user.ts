import { User } from '@meta/user'

export const userMockTest: Pick<User, 'name' | 'email'> = {
  email: 'test@fra-platform.com',
  name: 'Test User',
}

// password: 'test'
export const userMockTestPassword = '$2b$10$F8FvZYivtznQD.heHv7dcu8WPOY3S/astp4uHwwHFw8woz5INEj/K'

export const userMockUnknown: Pick<User, 'name' | 'email'> = {
  email: 'unknown@fra-platform.com',
  name: 'Unknown User',
}
