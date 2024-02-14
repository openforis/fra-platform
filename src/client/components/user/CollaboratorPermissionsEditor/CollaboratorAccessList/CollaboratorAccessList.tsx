import './CollaboratorAccessList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { SubSections } from 'meta/assessment'
import { CollaboratorPermissions } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'

type Props = {
  permissions: CollaboratorPermissions | undefined
}

const CollaboratorAccessList: React.FC<Props> = (props) => {
  const { permissions } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const sections = useSections()

  const options = SubSections.getAnchorsByUuid({ cycle, sections })

  const sectionPermissions = Objects.isEmpty(permissions) ? 'all' : permissions.sections ?? 'none'

  const tableDataPermissions = Object.entries(sectionPermissions)
    .reduce((prev, [k, v]) => (v.tableData ? [...prev, options[k]] : prev), [])
    .sort()
    .join(', ')

  const descriptionsPermissions = Object.entries(sectionPermissions)
    .reduce((prev, [k, v]) => (v.descriptions ? [...prev, options[k]] : prev), [])
    .sort()
    .join(', ')

  return (
    <div className="premission-list__container">
      {typeof sectionPermissions === 'string' ? (
        t(`contactPersons.${sectionPermissions}`)
      ) : (
        <div>
          {tableDataPermissions !== '' && (
            <div>
              {t('userManagement.permissionNames.tableData')}: {tableDataPermissions}
            </div>
          )}
          {descriptionsPermissions !== '' && (
            <div>
              {t('userManagement.permissionNames.descriptions')}: {descriptionsPermissions}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CollaboratorAccessList
