import { useState } from 'react'

import { Objects } from '@utils/objects'

import {
  CollaboratorEditPropertyType,
  CollaboratorProps,
  CollaboratorSectionsProp,
  RoleName,
  UserRole,
} from '@meta/user'

export const useActions = (props: {
  options: Record<string, string>
  userRole: UserRole<RoleName, CollaboratorProps>
}) => {
  const { options, userRole } = props

  const [selectedSections, setSelectedSections] = useState<CollaboratorSectionsProp>(userRole.props?.sections ?? 'none')

  const toggleOptions = (permission: CollaboratorEditPropertyType, checked: boolean): void => {
    const newSelectedSections = typeof selectedSections !== 'string' ? Objects.cloneDeep(selectedSections) : {}
    Object.entries(options).forEach(([section, _]) => {
      newSelectedSections[section] = { ...newSelectedSections[section], [permission]: checked }
    })
    setSelectedSections(newSelectedSections)
  }

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

  return {
    selectedSections,
    setSelectedSections,
    toggleOption,
    toggleOptions,
  }
}
