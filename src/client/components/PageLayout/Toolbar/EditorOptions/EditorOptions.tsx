import './EditorOptions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCanViewHistoryLastApproved } from 'client/store/user/hooks'
import { useUserHasRoleInCountry } from 'client/store/user/hooks/roles'
import { useUser } from 'client/store/user/hooks/user'
import Icon from 'client/components/Icon'
import ButtonHistory from 'client/components/PageLayout/Toolbar/ButtonHistory'
import Lock from 'client/components/PageLayout/Toolbar/Lock'
import Status from 'client/components/PageLayout/Toolbar/Status'

const EditorOptions: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const canViewHistory = useCanViewHistoryLastApproved()
  const userHasRoleInCountry = useUserHasRoleInCountry()

  const reviewer = Users.isAReviewer(user, cycle) || Users.isAdministrator(user)

  return (
    <div className="toolbar-editor">
      <Lock />
      <div className="toolbar__separator" />
      {userHasRoleInCountry && <Status />}

      {canViewHistory && (
        <>
          <div className="toolbar__separator" />
          <ButtonHistory />
        </>
      )}

      {reviewer && (
        <>
          <div className="toolbar__separator" />
          <a
            className="toolbar-editor__github"
            href="https://github.com/openforis/fra-platform/issues"
            rel="noreferrer"
            target="_blank"
          >
            <Icon name="github" />
            {t('common.issues')}
          </a>
        </>
      )}
    </div>
  )
}

export default EditorOptions
