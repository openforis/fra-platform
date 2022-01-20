import React from 'react'
import { useHistory, useParams } from 'react-router'
import { AssessmentName } from '@meta/assessment'
// import { useAppDispatch } from '@client/store'
import { useCountryIso } from '@client/hooks'
import { useTranslation } from 'react-i18next'
import { BasePaths } from '@client/basePaths'
// import { useOriginalDataPoint } from '@client/store/data/originalDataPoint'

type Props = {
  canEditData: boolean
}

const ButtonBar: React.FC<Props> = (props) => {
  const { canEditData } = props
  // const originalDataPoint = useOriginalDataPoint()

  // const dispatch = useAppDispatch()
  const history = useHistory()
  const { assessmentName, section } = useParams<{ assessmentName: AssessmentName; section: string }>()
  const { i18n } = useTranslation()
  const countryIso = useCountryIso()
  const disabled = true // TODO: useIsAutoSaveSaving() || !originalDataPoint.id
  const assessmentSectionLink = BasePaths.Assessment.section(countryIso, assessmentName, section)

  if (!canEditData) {
    return null
  }

  const handleDelete = () => {
    // if (window.confirm(i18n.t('nationalDataPoint.confirmDelete'))) {
    //   dispatch(OriginalDataPointActions.deleteODP({ id: originalDataPoint.id }))
    //   history.push(assessmentSectionLink)
    // }
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
