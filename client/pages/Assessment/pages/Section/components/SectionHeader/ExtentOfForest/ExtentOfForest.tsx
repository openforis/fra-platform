import React from 'react'
import { useTranslation } from 'react-i18next'

import Icon from '@client/components/Icon'
import { useUser } from '@client/store/user'
import { Props } from '../props'

const ExtentOfForest: React.FC<Props> = (props) => {
  const { /* sectionName, */ disabled } = props

  // const history = useHistory()

  // const countryIso = useCountryIso()
  const user = useUser()
  const { i18n } = useTranslation()

  if (!user) {
    return null
  }

  const handleClick = async () => {
    // TODO: Handle odp creation:
    // dispatch(OriginalDataPointActions create new odp) or usePostRequest -hook
    // history.push(BasePaths.goToOdpPage)
  }

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary no-print${disabled ? ' disabled' : ''}`}
        onClick={handleClick}
        style={{ marginRight: 16 }}
      >
        <Icon className="icon-sub icon-white" name="small-add" />
        {i18n.t('nationalDataPoint.addNationalDataPoint')}
      </button>
      <hr className="no-print" />
    </>
  )
}

export default ExtentOfForest
