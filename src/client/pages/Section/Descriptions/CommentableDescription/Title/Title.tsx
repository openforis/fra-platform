import './Title.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { DataCell, DataRow } from 'client/components/DataGrid'
import { PropsDataSources } from 'client/components/DataSources/types'
import ButtonEdit from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonEdit'
import ButtonHistory from 'client/pages/Section/Descriptions/CommentableDescription/Title/ButtonHistory'
import { Breakpoints } from 'client/utils/breakpoints'

import { useDescriptionActions } from './hooks/useDescriptionActions'

type Props = {
  name: CommentableDescriptionName
  title: string
} & Pick<PropsDataSources, 'options'>

const Title: React.FC<Props> = (props) => {
  const { name, options, title } = props
  const { canToggleEdit, canToggleHistory } = options ?? {}

  const actions = useDescriptionActions({ name, title })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        <MediaQuery minWidth={Breakpoints.laptop}>
          {canToggleHistory && <ButtonHistory target={name} />}
          {canToggleEdit && <ButtonEdit name={name} />}
        </MediaQuery>
      </DataCell>
    </DataRow>
  )
}

export default Title
