import './Title.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { CommentableDescriptionName } from 'meta/assessment'

import { DataCell, DataRow } from 'client/components/DataGrid'
import ButtonEdit from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonEdit'
import ButtonHistory from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonHistory'
import { Breakpoints } from 'client/utils'

import { useDescriptionActions } from './hooks/useDescriptionActions'

type Props = {
  name: CommentableDescriptionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { name, title } = props

  const actions = useDescriptionActions({ name, title })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <ButtonHistory target={name} />
          <ButtonEdit name={name} />
        </MediaQuery>
      </DataCell>
    </DataRow>
  )
}

export default Title
