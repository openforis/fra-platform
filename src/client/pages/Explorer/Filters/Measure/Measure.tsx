import './Measure.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store'
import { useCycle } from 'client/store/assessment'
import { ExplorerFilterActions } from 'client/store/explorer/filter/actions'
import { useExplorerMeasures } from 'client/store/explorer/filter/hooks/measures'
import { useSection } from 'client/store/metadata'
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
        ExplorerFilterActions.setMeasures({
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
