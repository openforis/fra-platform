import React from 'react'
import { useTranslation } from 'react-i18next'

import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

const Dimension: React.FC = () => {
  const { t } = useTranslation()

  const handleChange = (value: Array<string>) => {
    return value
  }

  return <MultiSelect onChange={handleChange} options={[]} placeholder={t('common.column')} />
}

export default Dimension
