import { Lang } from 'meta/lang'
import { User } from 'meta/user'

export const userMockTest: Pick<User, 'email' | 'props'> = {
  email: 'test@fra-platform.com',
  props: {
    lang: Lang.en,
    name: 'Test User',
  },
}

// password: 'test'
export const userMockTestPassword = '$2b$10$F8FvZYivtznQD.heHv7dcu8WPOY3S/astp4uHwwHFw8woz5INEj/K'

export const userMockUnknown: Pick<User, 'email' | 'props'> = {
  email: 'unknown@fra-platform.com',
  props: {
    lang: Lang.en,
    name: 'Unknown User',
  },
}
