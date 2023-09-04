import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Areas } from 'meta/area'
import { User } from 'meta/user'

import { useUser } from 'client/store/user'
import SelectAssessmentCycle from 'client/components/EditUserForm/UserPreferences/components/SelectAssessmentCycle'
import { usePreferredUserAssessmentCycles } from 'client/components/EditUserForm/UserPreferences/hooks/usePreferredUserAssessmentCycles'

type Props = {
  enabled: boolean
  userToEdit: User
  // changeUserProp: (name: string, value: any) => void
}

const UserPreferences: React.FC<Props> = (props) => {
  const { enabled, userToEdit /* changeUserProp */ } = props
  const user = useUser()
  const { t } = useTranslation()

  const userAssessmentCycles = usePreferredUserAssessmentCycles()

  const [selectedAssessment /* setSelectedAssessment */] = useState<string>('')
  const [selectedCycle /* setSelectedCycle */] = useState<string>('')
  const [, /* selectedCountry */ setSelectedCountry] = useState<string>('')

  const onChangeCountry = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value)
  }, [])

  useEffect(() => {
    // if (!selectedAssessment || !selectedCycle || !selectedCountry) return
    // changeUserProp('preferences', {
    //   cycleUuid
    //   assessment
    //   countryIso
    // })
  }, [])

  if (userToEdit.uuid !== user.uuid) return null

  return (
    <>
      <div className="edit-user__form-item">
        <div className="edit-user__form-label">User Preferences</div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t(`editUser.preferredRole`)}</div>
        <div
          className={classNames('edit-user__form-field', 'edit-user__form-contact_method-field', {
            disabled: !enabled,
          })}
        >
          <SelectAssessmentCycle userAssessmentCycles={userAssessmentCycles} />

          <select disabled={!enabled} onChange={onChangeCountry}>
            <option value="">{t('userManagement.placeholder')}</option>
            {userAssessmentCycles
              .find(
                ({ assessment, cycle }) => assessment.props.name === selectedAssessment && cycle.name === selectedCycle
              )
              ?.countries.map(({ countryIso }) => {
                return (
                  <option key={countryIso} value={countryIso}>
                    {t(Areas.getTranslationKey(countryIso))}
                  </option>
                )
              })}
          </select>
        </div>
      </div>
    </>
  )
}

export default UserPreferences
