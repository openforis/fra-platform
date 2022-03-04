import React from 'react'

import { Users } from '@meta/user'
import { useUser } from '@client/store/user'
import { useTranslation } from 'react-i18next'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { sectionName } = props

  const user = useUser()
  const { i18n } = useTranslation()
  // const [printView, printOnlyTablesView] = [false, false] // TODO usePrintView()
  const hasOdps = true // useSelector(ExtentOfForestState.hasOriginalDataPoints)
  const showOdps = true // TODO useSelector(ExtentOfForestState.showOriginalDataPoints)

  return (
    <>
      <h2 className="headline no-print">
        {i18n.t(`${sectionName}.${sectionName}`)}
        {Users.isAdministrator(user) && hasOdps && (
          <button
            type="button"
            className="btn-s btn-secondary"
            style={{ marginLeft: '12px' }}
            // onClick={() => dispatch(toggleOdps(!showOdps))}
          >
            {i18n.t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
          </button>
        )}
      </h2>

      {/* {hasOdps && printView && !printOnlyTablesView && <OriginalDataPointsPrint section={sectionName} />} */}
    </>
  )
}

export default ExtentOfForest
