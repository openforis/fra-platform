import './collaboratorAccessModal.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@utils/objects'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorEditPropertyType, CollaboratorProps, RoleName, UserRole } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSections } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useOnUpdate } from '@client/hooks'
import { Modal, ModalBody, ModalClose, ModalHeader } from '@client/components/Modal'

import { useActions } from './hooks/useActions'

type Props = {
  userRole: UserRole<RoleName, CollaboratorProps>
  headerLabel: string
  onClose: () => void
  open: boolean
}

const CollaboratorAccessModal: React.FC<Props> = (props) => {
  const { headerLabel, onClose, open, userRole } = props

  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const assessmentSections = useAssessmentSections()

  const options = assessmentSections
    .reduce((prev, curr): Array<SubSection> => [...prev, ...curr.subSections], [])
    .reduce(
      (prev, curr): Record<string, string> => (curr.props.anchor ? { ...prev, [curr.uuid]: curr.props.anchor } : prev),
      {}
    )

  const permissionOptions: Record<CollaboratorEditPropertyType, Record<string, string>> = {
    tableData: options,
    descriptions: options,
  }

  const properties = (userRole.props as CollaboratorProps) || undefined
  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const { selectedSections, setSelectedSections, toggleOption, toggleOptions } = useActions(options, sections)

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
        {headerLabel}
        <ModalClose onClose={onClose} />
      </ModalHeader>

      <ModalBody>
        <>
          <div className="form-container inline">
            <div
              className="form-field-selector"
              onClick={() => setSelectedSections('all')}
              onMouseDown={(e) => e.stopPropagation()}
              aria-hidden="true"
            >
              <div
                className={classNames('fra-checkbox', {
                  checked: selectedSections === 'all',
                })}
              />
              <div className="form-field-container-label">{i18n.t(`contactPersons.all`)}</div>
            </div>
            <div
              className="form-field-selector"
              onClick={() => setSelectedSections('none')}
              onMouseDown={(e) => e.stopPropagation()}
              aria-hidden="true"
            >
              <div
                className={classNames('fra-checkbox', {
                  checked: selectedSections === 'none',
                })}
              />
              <div className="form-field-container-label">{i18n.t(`contactPersons.none`)}</div>
            </div>
          </div>
          <div className="form-container">
            {Object.entries(permissionOptions).map(
              ([permission, options]: [CollaboratorEditPropertyType, Record<string, string>]) => (
                <div key={permission} className="form-field-container">
                  <div
                    className="form-field-selector"
                    onClick={() => toggleOptions(permission)}
                    onMouseDown={(e) => e.stopPropagation()}
                    aria-hidden="true"
                  >
                    <div
                      className={classNames('fra-checkbox', {
                        checked:
                          typeof selectedSections !== 'string' &&
                          Object.entries(selectedSections).filter(([_, section]) => section[permission] === true)
                            .length >= Object.keys(options).length,
                      })}
                    />
                    <div className="form-field-container-label">
                      {i18n.t(`userManagement.permissionNames.${permission}`)}
                    </div>
                  </div>

                  <hr />

                  {Object.entries(options).map(([section, label]) => (
                    <div
                      key={`${section}-${permission}`}
                      className="form-field-selector"
                      onClick={() => toggleOption(section, permission)}
                      onMouseDown={(e) => e.stopPropagation()}
                      aria-hidden="true"
                    >
                      <div
                        className={classNames('fra-checkbox', {
                          checked:
                            typeof selectedSections !== 'string' &&
                            selectedSections[section] &&
                            selectedSections[section][permission] === true,
                        })}
                      />
                      <div className="form-field-label">{label}</div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </>
      </ModalBody>
    </Modal>
  )
}

export default CollaboratorAccessModal
