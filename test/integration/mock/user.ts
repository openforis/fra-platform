import { User } from '@core/auth'

export const userMockAdmin: Pick<User, 'name' | 'email'> = {
  email: 'test@fra-platform.com',
  name: 'Admin User',
}

export const userMockNC: Pick<User, 'name' | 'email'> = {
  email: 'test-nc@fra-platform.com',
  name: 'NC User',
}
