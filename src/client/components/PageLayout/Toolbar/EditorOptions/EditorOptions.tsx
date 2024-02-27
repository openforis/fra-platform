import './EditorOptions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import Lock from 'client/components/PageLayout/Toolbar/Lock'
import Status from 'client/components/PageLayout/Toolbar/Status'

const EditorOptions: React.FC = () => {
  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const user = useUser()
  const reviewer = Users.isReviewer(user, countryIso, cycle) || Users.isAdministrator(user)

  return (
    <div className={classNames('toolbar-editor', { reviewer })}>
      <Lock />
      <div className="toolbar__separator" />
      <Status />

      {reviewer && (
        <>
          <div className="toolbar__separator" />
          <a
            className="toolbar-editor__github"
            href="https://github.com/openforis/fra-platform/issues"
            target="_blank"
            rel="noreferrer"
          >
            <img alt="GitHub" src="/img/github.png" />
            {t('common.issues')}
          </a>
        </>
      )}
    </div>
  )
}

export default EditorOptions
