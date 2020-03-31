import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { isAdministrator } from '@common/countryRole'

import * as AppState from '@webapp/app/appState'
import * as ExtentOfForestState from '@webapp/app/assessment/fra/sections/extentOfForest/extentOfForestState'

import NationalDataPointsPrintView from '@webapp/app/assessment/fra/sections/originalDataPoint/nationalDataPointsPrintView'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'

import { toggleOdps } from '@webapp/app/assessment/fra/sections/extentOfForest/actions'

const ExtentOfForest = (props) => {
  const { sectionName } = props

  const dispatch = useDispatch()
  const userInfo = useUserInfo()
  const i18n = useI18n()

  const hasOdps = useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const showOdps = useSelector(ExtentOfForestState.showOriginalDataPoints)
  const printView = useSelector(AppState.isPrintView)
  const printOnlyTablesView = useSelector(AppState.isPrintOnlyTablesView)

  return (
    <>
      <h2 className="headline no-print">
        {i18n.t(`${sectionName}.${sectionName}`)}
        {isAdministrator(userInfo) && hasOdps && (
          <button
            type="button"
            className="btn-s btn-secondary"
            style={{ marginLeft: '12px' }}
            onClick={() => dispatch(toggleOdps(!showOdps))}
          >
            {i18n.t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {hasOdps && printView && !printOnlyTablesView && (
        <NationalDataPointsPrintView i18n={i18n} section={sectionName} />
      )}
    </>
  )
}

ExtentOfForest.propTypes = {
  sectionName: PropTypes.string.isRequired,
}

export default ExtentOfForest
