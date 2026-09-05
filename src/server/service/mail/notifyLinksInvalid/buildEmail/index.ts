import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'
import { Users } from 'meta/user/users'

import { MetadataController } from 'server/controller/metadata'
import { MailServiceEmail } from 'server/service/mail/mail'
import { I18n } from 'server/utils/i18n'

import { LinksByCountry } from '../types'
import { _getCountryEntries } from './_getCountryEntries'
import { _getHtmlItems } from './_getHtmlItems'
import { _getTextLines } from './_getTextLines'
import { RenderProps } from './types'

type Props = {
  assessment: Assessment
  cycle: Cycle
  linksByCountry: LinksByCountry
  user: User
}

export const buildEmail = async (props: Props): Promise<MailServiceEmail> => {
  const { assessment, cycle, linksByCountry, user } = props
  const { t } = await I18n.getInstance({ user })
  const to = user.email

  const subject = t('email.invalidLinks.subject')
  const messageHeader = t('email.invalidLinks.messageHeader', { recipientName: Users.getFullName(user) })
  const messageBodyIntro = t('email.invalidLinks.messageBodyIntro')
  const messageFooter = t('email.invalidLinks.messageFooter')

  const { name: assessmentName } = assessment.props
  const { name: cycleName } = cycle

  const sections = await MetadataController.getSections({ assessment, cycle })
  const subSections = sections.flatMap((section) => section.subSections ?? [])

  const countryEntries = _getCountryEntries({ assessmentName, cycleName, linksByCountry, t })
  const renderProps: RenderProps = { assessment, countryEntries, cycle, subSections, t }
  const textLines = _getTextLines(renderProps)
  const htmlItems = _getHtmlItems(renderProps)

  const text = [messageHeader, messageBodyIntro, textLines, messageFooter].join('\n\n')

  const html = [
    `<p>${messageHeader}</p>`,
    `<p>${messageBodyIntro}</p>`,
    `<ul>${htmlItems}</ul>`,
    `<p style="white-space: pre-line">${messageFooter}</p>`,
  ].join('')

  return { to, subject, text, html }
}
