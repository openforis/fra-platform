import './CollaboratorPermissions.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps, RoleName, UserRole } from '@meta/user'

import { useAssessmentSections } from '@client/store/assessment'
import CollaboratorAccessModal from '@client/components/CollaboratorAccessModal'

type Props = {
  userRole: UserRole<RoleName, CollaboratorProps>
}

const CollaboratorPermissions = (props: Props) => {
  const { userRole } = props
  const { i18n } = useTranslation()

  const assessmentSections = useAssessmentSections()

  const options = assessmentSections
    .reduce((prev, curr): Array<SubSection> => [...prev, ...curr.subSections], [])
    .reduce(
      (prev, curr): Record<string, string> => (curr.props.anchor ? { ...prev, [curr.uuid]: curr.props.anchor } : prev),
      {}
    )

  const properties = (userRole.props as CollaboratorProps) || undefined
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
      <div className="edit-user__form-label">{i18n.t<string>(`userManagement.permissions`)}</div>

      <div className="edit-user__form-field edit-user__form-field-premissions">
        <div className="edit-user__form-field-premission-list">
          {typeof sections === 'string' ? (
            i18n.t<string>(`contactPersons.${sections}`)
          ) : (
            <>
              {tableDataPermissions !== '' && (
                <div>
                  {i18n.t<string>('userManagement.permissionNames.tableData')}: {tableDataPermissions}
                </div>
              )}
              {descriptionsPermissions !== '' && (
                <div>
                  {i18n.t<string>('userManagement.permissionNames.descriptions')}: {descriptionsPermissions}
                </div>
              )}
            </>
          )}
        </div>

        <button className="btn-xs btn-primary" onClick={_onEditPermissionsClick} type="button">
          {i18n.t<string>('userManagement.editPermissions')}
        </button>
      </div>

      <CollaboratorAccessModal open={modalOptions.open} userRole={userRole} onClose={_onEditPermissionsClose} />
    </div>
  )
}

export default CollaboratorPermissions
