import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store'
import { ExplorerFilterActions } from 'client/store/explorer/filter/actions'
import { useExplorerDimensions } from 'client/store/explorer/filter/hooks/dimensions'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

import { useOptions } from './hooks/useOptions'

type HandleChange = (value: Array<string>) => void

const Dimension: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const options = useOptions()

  const explorerDimensions = useExplorerDimensions()

  const handleChange = useCallback<HandleChange>(
    (value) => {
      dispatch(
        ExplorerFilterActions.setDimensions({
          assessmentName,
          cycleName,
          dimensions: value,
          sectionName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, sectionName]
  )

  return (
    <MultiSelect
      disabled={Objects.isNil(options)}
      multiLabelSummaryKey="common.column"
      onChange={handleChange}
      options={options ?? []}
      placeholder={t('common.column')}
      toggleAll
      value={explorerDimensions}
    />
  )
}

export default Dimension
