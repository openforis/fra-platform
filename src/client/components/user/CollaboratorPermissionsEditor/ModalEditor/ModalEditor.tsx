import './ModalEditor.scss'
import React, { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { SubSections } from 'meta/assessment'
import { CollaboratorEditPropertyType, CollaboratorPermissions } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { useOnUpdate } from 'client/hooks'
import ButtonCheckBox from 'client/components/ButtonCheckBox'
import { Modal, ModalBody, ModalClose, ModalHeader } from 'client/components/Modal'

import { useActions } from './hooks/useActions'

type Props = {
  onClose: () => void
  onPermissionsChange: (permissions: CollaboratorPermissions) => void
  open: boolean
  permissions: CollaboratorPermissions | undefined
}

const permissionTypes = [CollaboratorEditPropertyType.tableData, CollaboratorEditPropertyType.descriptions]

const ModalEditor: React.FC<Props> = (props) => {
  const { onClose, onPermissionsChange, open, permissions } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const sections = useSections()

  const options = useMemo(() => SubSections.getAnchorsByUuid({ cycle, sections }), [cycle, sections])
  const optionEntries = useMemo(() => Object.entries(options).sort((a, b) => a[1].localeCompare(b[1])), [options])

  const { selectedSections, setSelectedSections, toggleOption, toggleOptions } = useActions({ options, permissions })

  useOnUpdate(() => {
    onPermissionsChange({ sections: selectedSections })
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
              label={t(`contactPersons.${allOrNone}`)}
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
                label={t(`userManagement.permissionNames.${permission}`)}
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
                    label={t(label)}
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

export default ModalEditor
