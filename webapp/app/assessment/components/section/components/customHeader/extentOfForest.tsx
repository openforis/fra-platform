import React from 'react'
import * as BasePaths from '@webapp/main/basePaths'
import { Link } from 'react-router-dom'
import Icon from '@webapp/components/icon'
import useCountryIso from '@webapp/components/hooks/useCountryIso'
import useUserInfo from '@webapp/components/hooks/useUserInfo'
import useI18n from '@webapp/components/hooks/useI18n'
import FRA from '@common/assessment/fra'

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
  // TODO: check this works
  return (
    <>
      <Link
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        to={BasePaths.getOdpLink(countryIso, FRA.type, sectionName)}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {(i18n as any).t('nationalDataPoint.addNationalDataPoint')}
      </Link>
      <hr className="no-print" />
    </>
  )
}
export default ExtentOfForest
