import './UnitsSelection.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Measures } from 'meta/measurement/measures'

import Hr from 'client/components/Hr'
import SelectSecondary from 'client/components/Inputs/SelectSecondary'
import { UnitSelectorItem } from 'client/pages/Explorer/Filters/Options/types'

type Props = {
  unitSelectors: Array<UnitSelectorItem>
}

const UnitsSelection: React.FC<Props> = (props: Props) => {
  const { unitSelectors } = props
  const { t } = useTranslation()

  const filteredSelectors = unitSelectors.filter(({ options }) => options.length > 1)

  if (filteredSelectors.length === 0) {
    return null
  }

  return (
    <>
      <h2 className="options-title">{t('common.unit')}</h2>
      <div className="units-selection">
        {unitSelectors.map(({ measureName, onChange, options, selectedUnit }) => (
          <React.Fragment key={measureName}>
            <span>{t(Measures.getTName(measureName))}:</span>
            <SelectSecondary isClearable={false} onChange={onChange} options={options} value={selectedUnit} />
          </React.Fragment>
        ))}
      </div>
      <Hr className="options-hr" />
    </>
  )
}

export default UnitsSelection
