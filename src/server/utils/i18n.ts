import { createParams } from 'i18n/i18nConfig'
import i18next, { i18n as i18nType } from 'i18next'

import { Lang } from 'meta/lang'
import { User } from 'meta/user/user'

type Props = {
  user?: User
  lang?: Lang
}

const getInstance = async ({ lang, user }: Props = {}): Promise<i18nType> => {
  const instance = i18next.createInstance(createParams(user?.props.lang ?? lang ?? Lang.en))
  await instance.init()
  return instance
}

export const I18n = { getInstance }
