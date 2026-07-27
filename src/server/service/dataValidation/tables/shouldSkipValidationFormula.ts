import { Areas } from 'meta/area/areas'
import { CountryIso } from 'meta/area/countryIso'
import { validatorEqualToPreviousCycleForestArea } from 'meta/expressionEvaluator/functions/validatorEqualToPreviousCycleForestArea'

type Props = {
  countryIso: CountryIso
  formula: string
}

export const shouldSkipValidationFormula = (props: Props): boolean => {
  const { countryIso, formula } = props

  return Areas.isAtlantis(countryIso) && formula.includes(validatorEqualToPreviousCycleForestArea.name)
}
