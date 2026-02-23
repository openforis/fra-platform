import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { UserRepository } from 'server/db/repository/public/user'
import { sendMail } from 'server/service/mail/mail'

import { buildEmail } from './buildEmail'
import { groupLinksByCountry } from './groupLinksByCountry'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

const INVALID_LINK_THRESHOLD = 3

export const notifyLinksInvalid = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const linksByCountry = await groupLinksByCountry({ assessment, cycle, threshold: INVALID_LINK_THRESHOLD })
  // Return if no matches
  if (Object.keys(linksByCountry).length === 0) return

  // TODO: Instead, send to RFC (pt2)
  const admins = await UserRepository.getAdmins()

  await Promise.all(
    admins.map(async (user) => {
      const emailParams = { user, assessment, cycle, linksByCountry, threshold: INVALID_LINK_THRESHOLD }
      const email = await buildEmail(emailParams)
      return sendMail(email)
    })
  )
}
