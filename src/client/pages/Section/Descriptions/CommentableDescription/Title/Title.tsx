import './Title.scss'
import React from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { useCanEditDescription, useIsDescriptionEditable } from 'client/store/user/hooks'
import ButtonHistory from 'client/components/Buttons/ButtonHistory'
import { DataCell, DataRow } from 'client/components/DataGrid'
import ButtonEdit from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonEdit'

import { useDescriptionActions } from './hooks/useDescriptionActions'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { name, sectionName, title } = props
  const canEdit = useCanEditDescription({ sectionName })
  const actions = useDescriptionActions({ sectionName, name, title })
  const descriptionEditable = useIsDescriptionEditable({ sectionName, name })
  const loading = false // TODO: useLoading..()
  const disabled = loading || descriptionEditable
  // Only support data sources for now
  const isDataSources = name === CommentableDescriptionName.dataSources

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        <ButtonEdit name={name} sectionName={sectionName} />
        <ButtonHistory
          canEdit={canEdit && isDataSources}
          disabled={disabled}
          name={name}
          sectionLabelKey="description.dataSourcesPlus"
          sectionName={sectionName}
          subSection="descriptions"
        />
      </DataCell>
    </DataRow>
  )
}

export default Title
