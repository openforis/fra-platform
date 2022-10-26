import './collaboratorAccessModal.scss'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { SubSections } from '@meta/assessment'
import { CollaboratorEditPropertyType, CollaboratorProps, RoleName, UserRole } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSections, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useOnUpdate } from '@client/hooks'
import ButtonCheckBox from '@client/components/ButtonCheckBox'
import { Modal, ModalBody, ModalClose, ModalHeader } from '@client/components/Modal'

import { useActions } from './hooks/useActions'

type Props = {
  onClose: () => void
  open: boolean
  userRole: UserRole<RoleName, CollaboratorProps>
}

const permissionTypes = [CollaboratorEditPropertyType.tableData, CollaboratorEditPropertyType.descriptions]

const CollaboratorAccessModal: React.FC<Props> = (props) => {
  const { onClose, open, userRole } = props

  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const cycle = useCycle()
  const sections = useAssessmentSections()

  const options = useMemo(() => SubSections.getAnchorsByUuid({ cycle, sections }), [cycle, sections])
  const optionEntries = useMemo(() => Object.entries(options).sort((a, b) => a[1].localeCompare(b[1])), [options])

  const { selectedSections, setSelectedSections, toggleOption, toggleOptions } = useActions({ options, userRole })

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateSectionAuth({
        id: userRole.id,
        sections: selectedSections,
      })
    )
  }, [selectedSections])

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [open])

  return (
    <Modal className="modal-collaborator-access" isOpen={open}>
      <ModalHeader>
        {t('userManagement.editPermissions')}
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <div className="form-container">
          {['all', 'none'].map((allOrNone) => (
            <ButtonCheckBox
              key={allOrNone}
              checked={selectedSections === allOrNone}
              className="label-bold"
              label={`contactPersons.${allOrNone}`}
              onClick={() => setSelectedSections(allOrNone === 'all' ? 'all' : 'none')}
            />
          ))}
        </div>

        <div className="form-container permissions-header-container permissions-container">
          {permissionTypes.map((permission) => {
            const checked =
              selectedSections &&
              typeof selectedSections !== 'string' &&
              Object.values(selectedSections).filter((p) => p[permission]).length === Object.keys(options).length
            return (
              <ButtonCheckBox
                key={permission}
                checked={checked}
                className="label-bold"
                label={`userManagement.permissionNames.${permission}`}
                onClick={() => toggleOptions(permission, !checked)}
              />
            )
          })}
        </div>

        <div className="form-container permissions-container permissions-options-container">
          {permissionTypes.map((permission) => (
            <div key={permission}>
              {optionEntries.map(([section, label]) => {
                const checked =
                  selectedSections &&
                  typeof selectedSections !== 'string' &&
                  selectedSections[section] &&
                  selectedSections[section][permission] === true
                return (
                  <ButtonCheckBox
                    key={`${section}-${permission}`}
                    checked={checked}
                    label={label}
                    onClick={() => toggleOption(section, permission)}
                  />
                )
              })}
            </div>
          ))}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default CollaboratorAccessModal
