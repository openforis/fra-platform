import React from 'react'
import * as BasePaths from '@webapp/main/basePaths'
import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRA from '@common/assessment/fra'

type Props = {
  sectionName: string
  disabled: boolean
}
const ExtentOfForest = (props: Props) => {
  const { sectionName, disabled } = props
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()
  const i18n = useI18n()
  if (!userInfo) {
    return null
  }
  return (
    <>
      <Link
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
        to={BasePaths.getOdpLink(countryIso, FRA.type, sectionName)}
        style={{ marginRight: 16 }}
      >
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ className: string; name: string; }' is not... Remove this comment to see the full error message */}
        <Icon className="icon-sub icon-white" name="small-add" />
        {(i18n as any).t('nationalDataPoint.addNationalDataPoint')}
      </Link>
      <hr className="no-print" />
    </>
  )
}
export default ExtentOfForest
