import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { RoleName } from 'meta/user/role/name'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { UserRepository } from 'server/db/repository/public/user'
import { sendMail } from 'server/service/mail/mail'
import { LinksByCountry } from 'server/service/mail/notifyLinksInvalid/types'

import { buildEmail } from './buildEmail'
import { groupLinksByCountry } from './groupLinksByCountry'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

const INVALID_LINK_THRESHOLD = 3
const roles = [RoleName.REGIONAL_FOCAL_POINT]

// match linksByCountry to user countries
export const _getUserLinksByCountry = (props: { user: User; linksByCountry: LinksByCountry }): LinksByCountry => {
  const { linksByCountry, user } = props
  return Object.fromEntries(user.roles.map((r) => [r.countryIso, linksByCountry[r.countryIso as CountryIso]]))
}

// Notify RFC's of broken links via email
export const notifyLinksInvalid = async (props: Props): Promise<void> => {
  const { assessment, cycle } = props

  const linksByCountry = await groupLinksByCountry({ assessment, cycle, threshold: INVALID_LINK_THRESHOLD })
  if (Objects.isEmpty(linksByCountry)) return

  const countryISOs = Object.keys(linksByCountry) as Array<CountryIso>
  const users = await UserRepository.readCountryUsersByRole({ cycle, countryISOs, roles })

  const emailPromises = users.map(async (user) => {
    // Note: user.roles only contains REGIONAL_FOCAL_POINT roles for the affected countries
    const email = await buildEmail({
      user,
      assessment,
      cycle,
      linksByCountry: _getUserLinksByCountry({ user, linksByCountry }),
    })
    return sendMail(email)
  })

  await Promise.all(emailPromises)
}
