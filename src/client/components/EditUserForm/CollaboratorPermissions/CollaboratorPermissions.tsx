import './CollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps, User } from '@meta/user'

import { useAssessmentSections } from '@client/store/assessment'
import CollaboratorAccessModal from '@client/components/CollaboratorAccessModal'

type Props = {
  user: User
}

const CollaboratorPermissions = (props: Props) => {
  const { user } = props
  const { i18n } = useTranslation()

  const assessmentSections = useAssessmentSections()

  const options = assessmentSections
    .reduce((prev, curr) => [...prev, ...curr.subSections], [])
    .filter((subSection: SubSection) => subSection.props.anchor)
    .reduce((prev, curr) => ({ ...prev, [curr.uuid]: curr.props.anchor }), {})

  const properties = (user.roles[0].props as CollaboratorProps) || undefined
  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const tableDataPermissions = Object.entries(sections)
    .filter(([_, v]) => v.tableData === true)
    .map(([k, _]) => options[k])
    .sort()
    .join(', ')

  const descriptionsPermissions = Object.entries(sections)
    .filter(([_, v]) => v.descriptions === true)
    .map(([k, _]) => options[k])
    .sort()
    .join(', ')

  const [modalOptions, setModalOptions] = useState<{ open: boolean }>({ open: false })

  const _onEditPermissionsClick = () => {
    setModalOptions({ open: true })
  }

  const _onEditPermissionsClose = () => {
    setModalOptions({ open: false })
  }

  return (
    <div className="edit-user__form-item edit-user__form-item-permissions">
      <div className="edit-user__form-label">{i18n.t<string>('Permissions')}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <div className="edit-user__form-field-premission-list">
          {typeof sections === 'string' ? (
            i18n.t<string>(`contactPersons.${sections}`)
          ) : (
            <>
              {tableDataPermissions !== '' && <div>{`TableData: ${tableDataPermissions}`}</div>}
              {descriptionsPermissions !== '' && <div>{`Descriptions: ${descriptionsPermissions}`}</div>}
            </>
          )}
        </div>

        <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
          {i18n.t<string>('userManagement.editPermissions')}
        </button>
      </div>

      <CollaboratorAccessModal
        open={modalOptions.open}
        user={user}
        headerLabel={i18n.t<string>('userManagement.editPermissions')}
        onClose={_onEditPermissionsClose}
      />
    </div>
  )
}

export default CollaboratorPermissions
