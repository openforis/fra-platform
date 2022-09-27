import './collaboratorAccessModalBody.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { Objects } from '@utils/objects'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorEditPropertyType, CollaboratorProps, User } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessmentSections } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useOnUpdate } from '@client/hooks'
import { ModalBody } from '@client/components/Modal'
import { Breakpoints } from '@client/utils/breakpoints'

type Option = {
  value: string
  label: string
}

type Props = {
  user: User
}

const CollaboratorAccessModalBody: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const assessmentSections = useAssessmentSections()

  const options = assessmentSections
    .reduce((prev, curr) => [...prev, ...curr.subSections], [])
    .filter((subSection: SubSection) => subSection.props.anchor)
    .map(
      (subSection: SubSection): Option => ({
        value: subSection.uuid,
        label: subSection.props.anchor,
      })
    )

  const permissionOptions: Record<CollaboratorEditPropertyType, Array<Option>> = {
    tableData: options,
    descriptions: options,
  }

  const properties = (user.roles[0].props as CollaboratorProps) || undefined
  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const [selectedSections, setSelectedSections] = useState(sections)

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateSectionAuth({
        id: user.roles[0].id,
        sections: selectedSections,
      })
    )
  }, [selectedSections])

  const removeOption = (section: string, permission: string): void => {
    if (section === 'all') setSelectedSections('none')
    else if (section === 'none') setSelectedSections('all')
    else
      setSelectedSections(
        typeof selectedSections !== 'string'
          ? { ...selectedSections, [section]: { ...selectedSections[section], [permission]: false } }
          : { [section]: { [permission]: false } }
      )
  }

  const addOption = (section: string, permission: CollaboratorEditPropertyType): void => {
    if (section === 'all') setSelectedSections('all')
    else if (section === 'none') setSelectedSections('none')
    else
      setSelectedSections(
        typeof selectedSections !== 'string'
          ? { ...selectedSections, [section]: { ...selectedSections[section], [permission]: true } }
          : { [section]: { [permission]: true } }
      )
  }

  const toggleOption = (section: string, permission: CollaboratorEditPropertyType): void => {
    if (typeof selectedSections === 'string' || !selectedSections[section]?.[permission]) addOption(section, permission)
    else if (selectedSections[section]?.[permission]) removeOption(section, permission)
  }

  return (
    <ModalBody>
      <div className="modal-collaborator-access-body">
        <MediaQuery maxWidth={Breakpoints.laptop - 1}>
          {Object.entries(permissionOptions).map(
            ([permission, options]: [CollaboratorEditPropertyType, Array<Option>]) => (
              <div key={permission}>
                <strong>{i18n.t(`userManagement.permissions.${permission}`)}</strong>

                <select
                  multiple
                  value={
                    typeof selectedSections !== 'string'
                      ? Object.entries(selectedSections)
                          .filter(([_, value]) => value[permission] === true)
                          .map(([key, _]) => key)
                      : []
                  }
                  onChange={(event) => {
                    const previousValues =
                      typeof selectedSections !== 'string'
                        ? Object.entries(selectedSections)
                            .filter(([_, value]) => value[permission] === true)
                            .map(([key, _]) => key)
                        : []

                    const currentValues = Array.from(event.target.selectedOptions, (option) => String(option.value))

                    const section = currentValues.filter((x) => !previousValues.includes(x))[0]

                    toggleOption(section, permission)
                  }}
                >
                  {options.map((option: Option) => {
                    const { value: section, label } = option

                    return (
                      <option key={`${section}-${permission}`} value={section}>
                        {label}
                      </option>
                    )
                  })}
                </select>
              </div>
            )
          )}
        </MediaQuery>

        <MediaQuery minWidth={Breakpoints.laptop}>
          {Object.entries(permissionOptions).map(
            ([permission, options]: [CollaboratorEditPropertyType, Array<Option>]) => (
              <div key={permission} className="form-field-container">
                <div className="form-field-container-label">{i18n.t(`userManagement.permissions.${permission}`)}</div>

                <hr />

                {options.map((option: Option) => {
                  const { value: section, label } = option

                  return (
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
                  )
                })}
              </div>
            )
          )}
        </MediaQuery>
      </div>
    </ModalBody>
  )
}

export default CollaboratorAccessModalBody
