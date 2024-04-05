import './Title.scss'
import React from 'react'

import { CommentableDescriptionName, SectionName } from 'meta/assessment'

import { DataCell, DataRow } from 'client/components/DataGrid'
import ButtonEdit from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonEdit'
import ButtonHistory from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonHistory'

import { useDescriptionActions } from './hooks/useDescriptionActions'

type Props = {
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { name, sectionName, title } = props

  const actions = useDescriptionActions({ sectionName, name, title })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        <ButtonHistory name={name} sectionName={sectionName} />
        <ButtonEdit name={name} sectionName={sectionName} />
      </DataCell>
    </DataRow>
  )
}

export default Title
