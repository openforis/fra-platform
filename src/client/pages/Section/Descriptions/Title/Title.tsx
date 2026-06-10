import './Title.scss'
import React from 'react'
import MediaQuery from 'react-responsive'

import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { Objects } from 'utils/objects'

import { useIsDescriptionEditable } from 'client/store/user/hooks/auth'
import { DataCell, DataRow } from 'client/components/DataGrid'
import ButtonCopy from 'client/pages/Section/Descriptions/Title/ButtonCopy'
import ButtonEdit from 'client/pages/Section/Descriptions/Title/ButtonEdit'
import ButtonHistory from 'client/pages/Section/Descriptions/Title/ButtonHistory'
import { Breakpoints } from 'client/utils/breakpoints'

import { useDescriptionActions } from './hooks/useDescriptionActions'

type Props = {
  canCopy?: { disabled: boolean }
  name: CommentableDescriptionName
  sectionName: SectionName
  title: string
}

const Title: React.FC<Props> = (props) => {
  const { canCopy, name, sectionName, title } = props

  const actions = useDescriptionActions({ name, sectionName, title })
  const editable = useIsDescriptionEditable({ name, sectionName })

  return (
    <DataRow actions={actions}>
      <DataCell className="description-title" editable noBorder>
        <h3 className="subhead">
          <span>{title}</span>
        </h3>

        <MediaQuery minWidth={Breakpoints.laptop}>
          <ButtonEdit name={name} sectionName={sectionName} />
          <ButtonHistory sectionName={sectionName} target={name} />
        </MediaQuery>

        {!Objects.isNil(canCopy) && editable && <ButtonCopy disabled={canCopy.disabled} sectionName={sectionName} />}
      </DataCell>
    </DataRow>
  )
}

export default Title
