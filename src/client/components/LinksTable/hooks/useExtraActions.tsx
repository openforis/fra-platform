import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { LinksActions } from 'client/store/links/actions'
import { useIsVerificationInProgress } from 'client/store/links/hooks/verification'
import Button from 'client/components/Buttons/Button'

type Props = {
  assessmentName: string
  countryIso?: CountryIso
  cycleName: string
}

export const useExtraActions = (props: Props): Array<React.ReactElement> => {
  const { assessmentName, countryIso, cycleName } = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const handleVerifyLinks = useCallback<() => void>(() => {
    dispatch(LinksActions.verifyLinks({ assessmentName, cycleName, countryIso }))
  }, [assessmentName, countryIso, cycleName, dispatch])

  const verifyLinksInProgress = useIsVerificationInProgress(assessmentName, cycleName, countryIso)

  return useMemo<Array<React.ReactElement>>(
    () => [
      <div key="verify-links">
        <Button
          className="verify-links-button"
          disabled={verifyLinksInProgress ?? true}
          label={t('admin.verifyLinks')}
          onClick={handleVerifyLinks}
        />
      </div>,
    ],
    [handleVerifyLinks, t, verifyLinksInProgress]
  )
}
