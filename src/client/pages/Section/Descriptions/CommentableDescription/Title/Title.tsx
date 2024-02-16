import './Title.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'
import { TooltipId } from 'meta/tooltip'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import { DataCell, DataRow } from 'client/components/DataGrid'
import Icon from 'client/components/Icon'

import { useDescriptionActions } from './hooks/useDescriptionActions'
import { useToggleEdit } from './hooks/useToggleEdit'

type Props = {
  error?: boolean
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { error, name, sectionName, title } = props

  const { t } = useTranslation()
  const canEdit = useCanEditDescription({ sectionName })
  const editable = useIsDescriptionEditable({ sectionName, name })
  const toggleEdit = useToggleEdit({ name, sectionName })
  const actions = useDescriptionActions({ sectionName, name, title })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" noBorder>
        <h3
          className={classNames('subhead', 'description-title__label', { 'icon-red': error })}
          data-tooltip-id={TooltipId.error}
          data-tooltip-content={error ? t('generalValidation.notEmpty') : null}
        >
          <span>{title}</span>
        </h3>

        {error && <Icon key="icon-error" className="icon-red" name="alert" />}

        {canEdit && (
          <button className="btn-s description-title__btn-edit no-print" onClick={toggleEdit} type="button">
            {editable ? t('description.done') : t('description.edit')}
          </button>
        )}
      </DataCell>
    </DataRow>
  )
}

Title.defaultProps = {
  error: false,
}

export default Title
