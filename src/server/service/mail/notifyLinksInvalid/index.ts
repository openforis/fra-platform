import { CountryIso } from 'meta/area/countryIso'
import { Link } from 'meta/cycleData/links/link'
import { UserEmails } from 'meta/user/emails'

import { sendMail } from 'server/service/mail/mail'

import { buildEmail } from './buildEmail'

const INVALID_LINK_THRESHOLD = 3

// TODO
export const notifyLinksInvalid = async (): Promise<void> => {
  const linksByCountry = { X01: [] } as Record<CountryIso, Array<Link>>
  const emailProps = { to: UserEmails.robot, linksByCountry, threshold: INVALID_LINK_THRESHOLD }
  const email = await buildEmail(emailProps)
  await sendMail(email)
}
