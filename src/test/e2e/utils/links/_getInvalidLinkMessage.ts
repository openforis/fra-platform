import { enTranslation } from 'i18n/resources/en'

type Props = {
  link: string
  reason: string
}

export const getInvalidLinkMessage = (props: Props): string => {
  const { link, reason } = props

  return enTranslation.generalValidation.invalidLinkWithReason.replace('{{link}}', link).replace('{{reason}}', reason)
}
