import './Measure.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { ExplorerSelectionActions } from 'client/store/explorer/selection/actions'
import { useExplorerMeasures } from 'client/store/explorer/selection/hooks/measures'
import { useAppDispatch } from 'client/store/hooks'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import useOpenDefinition from 'client/components/DefinitionLink/hooks/useOpenDefinition'
import Icon from 'client/components/Icon'
import MultiSelect from 'client/components/Inputs/MultiSelect/MultiSelect'

import { useOptions } from './hooks/useOptions'

type HandleChange = (value: Array<string>) => void

const Measure: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { assessmentName, cycleName, sectionName } = useSectionRouteParams()
  const cycle = useCycle()
  const subSection = useSection(sectionName)
  const anchor = subSection?.props.anchors[cycle.uuid]
  const document = 'tad'
  const openDefinition = useOpenDefinition({ anchor, document })

  const options = useOptions()
  const explorerMeasures = useExplorerMeasures()

  const handleChange = useCallback<HandleChange>(
    (value) => {
      dispatch(
        ExplorerSelectionActions.setMeasures({
          assessmentName,
          cycleName,
          measures: value,
          sectionName,
        })
      )
    },
    [assessmentName, cycleName, dispatch, sectionName]
  )

  return (
    <div className="measure-filter-container">
      <MultiSelect
        classNames={{ container: 'explorer-filters__multiselect' }}
        disabled={Objects.isNil(options)}
        multiLabelSummaryKey="common.variable"
        onChange={handleChange}
        options={options ?? []}
        placeholder={t('common.variable')}
        toggleAll
        value={explorerMeasures}
      />
      <button className="btn-definitions-info" onClick={openDefinition} type="button">
        <Icon name="round-e-info" />
      </button>
    </div>
  )
}

export default Measure
