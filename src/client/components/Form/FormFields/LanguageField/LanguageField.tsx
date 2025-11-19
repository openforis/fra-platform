import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageCodes } from 'meta/lang'

import SelectField from 'client/components/Form/FormFields/SelectField'
import { FieldDefinition } from 'client/components/Form/types'
import { Option } from 'client/components/Inputs/Select'

import { FieldProps } from '../types'

const LanguageField: React.FC<FieldProps> = (props) => {
  const { fieldDefinition: _fieldDefinition } = props

  const { t } = useTranslation()

  const options = useMemo<Array<Option>>(() => {
    return LanguageCodes.map((lang) => ({
      label: t(`language.${lang}`),
      value: lang,
    }))
  }, [t])

  const fieldDefinition = useMemo<FieldDefinition>(() => {
    return { ..._fieldDefinition, options }
  }, [_fieldDefinition, options])

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SelectField {...props} fieldDefinition={fieldDefinition} />
  )
}

export default LanguageField
