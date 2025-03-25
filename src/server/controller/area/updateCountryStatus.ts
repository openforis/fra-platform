import { AssessmentStatus, Country, CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { updateCountry } from 'server/controller/area/updateCountry'
import { BaseProtocol, DB } from 'server/db'
import { AreaRedisRepository } from 'server/repository/redis/area'

type Props = {
  assessment: Assessment
  cycle: Cycle
  user: User
} & (
  | {
      country: Country
    }
  | {
      countryIso: CountryIso
    }
)

// TODO: Better name, progressCountryStatus, startCountry, initCountry,..
export const updateCountryStatus = async (props: Props, client: BaseProtocol = DB) => {
  const { assessment, cycle, user } = props
  let country: Country

  if ('country' in props) {
    country = props.country
  }

  if ('countryIso' in props) {
    country = await AreaRedisRepository.getOneCountry({ assessment, cycle, countryIso: props.countryIso })
  }

  if (country.props.status === AssessmentStatus.notStarted) {
    country.props.status = AssessmentStatus.editing
    await updateCountry({ assessment, cycle, countryIso: country.countryIso, country, user }, client)
  }
  // TODO: Websocket
}
