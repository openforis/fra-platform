import './Measure.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

const Measure: React.FC = () => {
  const {
    i18n: { language },
    t,
  } = useTranslation()
  const { assessmentName, cycleName } = useCycleRouteParams()
  const document = 'tad'

  const handleChange = (value: Array<string>) => {
    return value
  }

  return (
    <div className="measure-filter-container">
      <MultiSelect onChange={handleChange} options={[]} placeholder={t('common.variable')} />
      <button
        className="btn-definitions-info"
        onClick={() =>
          window.open(
            ApiEndPoint.definitions(language, document, assessmentName, cycleName),
            document,
            'height=640,width=360'
          )
        }
        type="button"
      >
        <Icon name="round-e-info" />
      </button>
    </div>
  )
}

export default Measure
