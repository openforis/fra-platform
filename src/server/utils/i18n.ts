import { createI18nPromise } from 'i18n/i18nFactory'
import { TFunction } from 'i18next'

import { Lang } from 'meta/lang'
import { User } from 'meta/user/user'

type Props = {
  user?: User
  lang?: Lang
}

const get = ({ lang, user }: Props = {}): Promise<{ language: Lang; t: TFunction }> =>
  createI18nPromise(user?.props.lang ?? lang ?? Lang.en)

export const I18nUtils = { get }
