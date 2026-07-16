import { CountryIso } from 'meta/area/countryIso'
import { NDPNationalClassValidation, NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { ValidationsSelectors } from 'client/store/data/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useNationalDataPointValidationsFetched = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.nationalDataPointValidationsFetched(state, assessmentName, cycleName, countryIso)
  )
}

type Props = {
  odpId?: number
  uuid?: UUID
}

export const useNationalDataPointValidation = (props: Props): NDPValidation => {
  const { odpId, uuid } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    if (!Objects.isEmpty(uuid)) {
      return ValidationsSelectors.getNationalDataPointValidation(state, assessmentName, cycleName, countryIso, uuid)
    }

    if (Objects.isNil(odpId)) return {}

    return ValidationsSelectors.getNationalDataPointValidationByOdpId(
      state,
      assessmentName,
      cycleName,
      countryIso,
      odpId
    )
  })
}

type NationalClassValidationProps = {
  nationalClassUuid?: UUID
  nationalDataPointUuid?: UUID
}

export const useNationalClassValidation = (props: NationalClassValidationProps): NDPNationalClassValidation => {
  const { nationalClassUuid, nationalDataPointUuid } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    if (Objects.isEmpty(nationalDataPointUuid) || Objects.isEmpty(nationalClassUuid)) return {}

    return ValidationsSelectors.getNationalClassValidation(
      state,
      assessmentName,
      cycleName,
      countryIso,
      nationalDataPointUuid,
      nationalClassUuid
    )
  })
}
