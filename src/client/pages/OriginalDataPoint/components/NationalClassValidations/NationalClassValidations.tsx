import './NationalClassValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ODPNationalClass } from 'meta/assessment'
import { NationalClassValidation } from 'meta/assessment/originalDataPoint/odps/validateODP'

import Icon from 'client/components/Icon'

type Props = {
  nationalClasses: Array<ODPNationalClass>
  nationalClassValidations: Array<NationalClassValidation>
  variable: keyof NationalClassValidation
}

const NationalClassValidations: React.FC<Props> = (props) => {
  const { nationalClasses, nationalClassValidations, variable } = props

  const hasErrors = nationalClassValidations.some((v) => !v[variable])

  const { t } = useTranslation()

  if (!hasErrors) {
    return null
  }

  return (
    <div className="national-class-validations">
      <Icon name="alert" />
      {nationalClassValidations.map(
        (nationalClassValidation, index) =>
          !nationalClassValidation[variable] && (
            <div className="msg" key={nationalClasses[index].name}>
              {t(
                `generalValidation.${
                  variable === 'validForestCharacteristicsPercentage' ? 'classValuesMustBeEqualTo' : 'classValueNotGreaterThan'
                }`,
                {
                  name: nationalClasses[index].name,
                  value: '100%',
                }
              )}
            </div>
          )
      )}
    </div>
  )
}

export default NationalClassValidations
