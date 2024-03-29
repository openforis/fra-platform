import './EditorOptions.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useUser } from 'client/store/user'
import Icon from 'client/components/Icon'
import Lock from 'client/components/PageLayout/Toolbar/Lock'
import Status from 'client/components/PageLayout/Toolbar/Status'

const EditorOptions: React.FC = () => {
  const { t } = useTranslation()
  const cycle = useCycle()
  const user = useUser()
  const reviewer = Users.isAReviewer(user, cycle) || Users.isAdministrator(user)

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
