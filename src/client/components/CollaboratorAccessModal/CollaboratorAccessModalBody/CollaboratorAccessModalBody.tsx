import './collaboratorAccessModalBody.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import MediaQuery from 'react-responsive'

import { Objects } from '@utils/objects'
import classNames from 'classnames'

import { SubSection } from '@meta/assessment'
import { CollaboratorEditPropertyType, CollaboratorProps, User } from '@meta/user'

// import { useAppDispatch } from '@client/store'
import { useAssessmentSections } from '@client/store/assessment'
// import { UserManagementActions } from '@client/store/userManagement'
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
  // const dispatch = useAppDispatch()
  const i18n = useTranslation()
  const assessmentSections = useAssessmentSections()

  const options = assessmentSections
    .reduce((prev, curr) => [...prev, ...curr.subSections], [])
    .filter((subSection: SubSection) => subSection.props.anchor)
    .map((subSection: SubSection): { value: string; label: string } => ({
      value: subSection.uuid,
      label: subSection.props.anchor,
    }))

  const permissionOptions: Record<CollaboratorEditPropertyType, Array<Option>> = {
    tableData: options,
    descriptions: options,
  }

  const properties = (user.roles[0].props as CollaboratorProps) || undefined
  const sections = Objects.isEmpty(properties) ? 'none' : properties.sections

  const [selectedSections, setSelectedSections] = useState(sections)

  useOnUpdate(() => {
    // dispatch(
    //   UserManagementActions.updateSectionAuth({
    //     id: user.roles[0].id,
    //     sections: selectedSections.reduce((prev, curr) => {
    //       return { ...prev, [curr.value]: true }
    //     }, {}),
    //   })
    // )
  }, [selectedSections])

  const removeOption = (permission: string, option: Option): void => {
    const { value } = option
    if (value === 'all') setSelectedSections('none')
    else if (value === 'none') setSelectedSections('all')
    else
      setSelectedSections(
        typeof selectedSections !== 'string'
          ? { ...selectedSections, [value]: { ...selectedSections[value], [permission]: false } }
          : { [value]: { [permission]: false } }
      )
  }

  const addOption = (permission: CollaboratorEditPropertyType, option: Option): void => {
    const { value } = option
    if (value === 'all') setSelectedSections('all')
    else if (value === 'none') setSelectedSections('none')
    else
      setSelectedSections(
        typeof selectedSections !== 'string'
          ? { ...selectedSections, [value]: { ...selectedSections[value], [permission]: true } }
          : { [value]: { [permission]: true } }
      )
  }

  const toggleOption = (permission: CollaboratorEditPropertyType, option: Option): void => {
    const { value } = option
    if (typeof selectedSections === 'string' || !selectedSections[value]?.[permission]) addOption(permission, option)
    else if (selectedSections[value]?.[permission]) removeOption(permission, option)
  }

  return (
    <ModalBody>
      <div className="modal-country-select-body">
        <MediaQuery minWidth={Breakpoints.laptop}>
          {Object.entries(permissionOptions).map(
            ([permission, options]: [CollaboratorEditPropertyType, Array<Option>]) => {
              return (
                <div key={permission} className="form-field-region-container">
                  <div className="form-field-country-selector">
                    <div className="form-field-region-label">{i18n.t(`userManagement.permissions.${permission}`)}</div>
                  </div>

                  <hr />

                  {options.map((option: Option) => {
                    const { value, label } = option

                    return (
                      <div
                        key={value}
                        className="form-field-country-selector"
                        onClick={() => toggleOption(permission, option)}
                        onMouseDown={(e) => e.stopPropagation()}
                        aria-hidden="true"
                      >
                        <div
                          className={classNames('fra-checkbox', {
                            checked:
                              typeof selectedSections !== 'string' &&
                              selectedSections[value] &&
                              selectedSections[value][permission] === true,
                          })}
                        />
                        <div className="form-field-country-label">{label}</div>
                      </div>
                    )
                  })}
                </div>
              )
            }
          )}
        </MediaQuery>
      </div>
    </ModalBody>
  )
}

export default CollaboratorAccessModalBody
