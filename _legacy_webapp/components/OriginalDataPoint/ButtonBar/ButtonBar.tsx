import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { ODP } from '@core/odp'
import { useCountryIso, useI18n } from '../../../hooks'

import { useIsAutoSaveSaving } from '../../../store/autosave'
import { OriginalDataPointActions } from '../../../store/page/originalDataPoint'
import * as BasePaths from '../../../main/basePaths'
import { FRA } from '@core/assessment'

type Props = {
  canEditData: boolean
  odp: ODP
}

const ButtonBar: React.FC<Props> = (props) => {
  const { odp, canEditData } = props

  const dispatch = useDispatch()
  const history = useHistory()
  const { tab } = useParams<{ tab: string }>()
  const i18n = useI18n()
  const countryIso = useCountryIso()
  const disabled = useIsAutoSaveSaving() || !odp.id
  const assessmentSectionLink = BasePaths.getAssessmentSectionLink(countryIso, FRA.type, tab)

  if (!canEditData) {
    return null
  }

  const handleDelete = () => {
    if (window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
      dispatch(OriginalDataPointActions.deleteODP({ id: odp.id }))
      history.push(assessmentSectionLink)
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          history.push(assessmentSectionLink)
        }}
      >
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>

      <div className="odp-v-divider" />

      <button type="button" className="btn btn-destructive" disabled={disabled} onClick={handleDelete}>
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </>
  )
}

export default ButtonBar
