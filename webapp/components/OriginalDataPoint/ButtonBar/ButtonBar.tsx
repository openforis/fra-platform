import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { ODP } from '@core/odp'
import { useCountryIso, useI18n } from '@webapp/hooks'

import { cancelDraft, markAsActual, remove } from '@webapp/sectionSpec/fra/originalDataPoint/actions'
import { useIsAutoSaveSaving } from '@webapp/store/autosave'

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
  const disabled = useIsAutoSaveSaving() || !odp.odpId

  if (!canEditData) {
    return null
  }

  return (
    <>
      {odp.editStatus && odp.editStatus !== 'newDraft' && (
        <button
          type="button"
          className="btn btn-secondary margin-right"
          disabled={disabled}
          onClick={() => dispatch(cancelDraft(countryIso, odp.odpId, tab, history))}
        >
          {i18n.t('nationalDataPoint.discardChanges')}
        </button>
      )}

      <button
        type="button"
        className="btn btn-primary"
        disabled={disabled}
        onClick={() => {
          dispatch(markAsActual(countryIso, odp, history, tab))
        }}
      >
        {i18n.t('nationalDataPoint.doneEditing')}
      </button>

      <div className="odp-v-divider" />

      <button
        type="button"
        className="btn btn-destructive"
        disabled={disabled}
        onClick={() => {
          if (window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
            dispatch(remove(countryIso, odp, tab, history))
          }
        }}
      >
        {i18n.t('nationalDataPoint.delete')}
      </button>
    </>
  )
}

export default ButtonBar
