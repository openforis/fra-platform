import { Lang } from 'meta/lang'
import { User } from 'meta/user/user'

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
    surname: 'Unknown Surname',
  },
}

export const userMockKeep: Pick<User, 'email' | 'props'> = {
  email: 'keep@fra-platform.com',
  props: { lang: Lang.en, name: 'Keep User' },
}

export const userMockMerge: Pick<User, 'email' | 'props'> = {
  email: 'merge@fra-platform.com',
  props: { lang: Lang.en, name: 'Merge User' },
}
