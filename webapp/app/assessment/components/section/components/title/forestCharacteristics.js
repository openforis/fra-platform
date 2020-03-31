import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import * as AppState from '@webapp/app/appState'
import * as ForestCharacteristicsState from '@webapp/app/assessment/fra/sections/forestCharacteristics/forestCharacteristicsState'

import NationalDataPointsPrintView from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import useI18n from '@webapp/components/hooks/useI18n'

const ForestCharacteristics = (props) => {
  const { sectionName } = props

  const i18n = useI18n()

  const hasOdps = useSelector(ForestCharacteristicsState.hasOriginalDataPoints)
  const printView = useSelector(AppState.isPrintView)
  const printOnlyTablesView = useSelector(AppState.isPrintOnlyTablesView)

  return (
    <>
      <h2 className="headline no-print">{i18n.t(`${sectionName}.${sectionName}`)}</h2>

      {hasOdps && printView && !printOnlyTablesView && (
        <NationalDataPointsPrintView i18n={i18n} section={sectionName} />
      )}
    </>
  )
}

ForestCharacteristics.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

export default ForestCharacteristics
