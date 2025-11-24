import React, { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user/users'

import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useOriginalDataPointYears } from 'client/store/data/tableData/nodeValues/hooks/originalDataPointData'
import { useAppDispatch } from 'client/store/hooks'
import { CountryReportActions } from 'client/store/ui/countryReport/actions'
import { useShowOriginalDatapoints } from 'client/store/ui/countryReport/hooks/originalDataPoints'
import { useUser } from 'client/store/user/hooks/user'
import { useIsPrintRoute } from 'client/hooks/routes'
import Button from 'client/components/Buttons/Button'
import Flex from 'client/components/Layout/Flex'
import OriginalDataPointsPrint from 'client/pages/Print/OriginalDataPointsPrint'
import { TitleDefault } from 'client/pages/Section/Title/Components'

import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { subSection } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const user = useUser()
  const { onlyTables, print } = useIsPrintRoute()
  const odpYears = useOriginalDataPointYears()
  const showOdps = useShowOriginalDatapoints()

  const sectionName = subSection.props.name
  const hasOdps = Array.isArray(odpYears)
  const withToggleODPs = Users.isAdministrator(user) && hasOdps

  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  useEffect(() => {
    if (historyLastApprovedIsActive && !showOdps) {
      dispatch(CountryReportActions.toggleShowOriginalDataPoint())
    }
  }, [dispatch, historyLastApprovedIsActive, showOdps])

  const onClick = useCallback(() => {
    dispatch(CountryReportActions.toggleShowOriginalDataPoint())
  }, [dispatch])

  return (
    <>
      <Flex gap="16">
        <TitleDefault subSection={subSection} />

        {withToggleODPs && (
          <Button
            disabled={historyLastApprovedIsActive}
            inverse={showOdps}
            label={t(`extentOfForest.${showOdps ? 'hideNDPs' : 'showNDPs'}`)}
            onClick={onClick}
          />
        )}
      </Flex>

      {hasOdps && print && !onlyTables && <OriginalDataPointsPrint sectionName={sectionName} />}
    </>
  )
}

export default ExtentOfForest
