import './NationalClassValidations.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { NationalClassValidation } from 'meta/assessment/odps/validateODP'
import { ODPNationalClass } from 'meta/assessment/originalDataPoint'

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
            <div key={nationalClasses[index].name} className="msg">
              {t(
                `generalValidation.${
                  variable === 'validForestCharacteristicsPercentage'
                    ? 'classValuesMustBeEqualTo'
                    : 'classValueNotGreaterThan'
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
