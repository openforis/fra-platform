import { CountryIso } from 'meta/area/countryIso'
import { NDPValidation } from 'meta/assessment/validation/nationalDataPoint'
import { UUID } from 'meta/uuid/uuid'
import { Objects } from 'utils/objects'

import { ValidationsSelectors } from 'client/store/data/tableData/validations/selectors'
import { useAppSelector } from 'client/store/hooks'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useNationalDataPointValidationsFetched = (): boolean => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) =>
    ValidationsSelectors.nationalDataPointValidationsFetched(state, assessmentName, cycleName, countryIso)
  )
}

type NationalDataPointValidationProps = {
  uuid?: UUID
}

export const useNationalDataPointValidation = (props: NationalDataPointValidationProps): NDPValidation => {
  const { uuid } = props
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()

  return useAppSelector((state) => {
    if (Objects.isEmpty(uuid)) return {}

    return ValidationsSelectors.getNationalDataPointValidation(state, assessmentName, cycleName, countryIso, uuid)
  })
}
