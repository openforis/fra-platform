import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useExplorerDimensions } from 'client/store/explorer/selection/hooks/dimensions'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

import { useOnChange } from './hooks/useOnChange'
import { useOptions } from './hooks/useOptions'

const Dimension: React.FC = () => {
  const { t } = useTranslation()

  const options = useOptions()

  const explorerDimensions = useExplorerDimensions()

  const onChange = useOnChange({ options })

  return (
    <MultiSelect
      classNames={{ container: 'explorer-filters__multiselect' }}
      disabled={Objects.isNil(options)}
      multiLabelSummaryKey="common.column"
      onChange={onChange}
      options={options ?? []}
      placeholder={t('common.column')}
      toggleAll
      value={explorerDimensions}
    />
  )
}

export default Dimension
