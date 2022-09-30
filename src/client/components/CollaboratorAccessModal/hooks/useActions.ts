import { useState } from 'react'

import { Objects } from '@utils/objects'

import { CollaboratorEditPropertyType } from '@meta/user'

export const useActions = (
  options: Array<{ value: string; label: string }>,
  sections:
    | 'none'
    | 'all'
    | Record<
        string,
        {
          readonly tableData?: boolean
          readonly descriptions?: boolean
        }
      >
) => {
  const [selectedSections, setSelectedSections] = useState(sections)

  const toggleOptions = (permission: CollaboratorEditPropertyType): void => {
    const enabled =
      typeof selectedSections !== 'string'
        ? Object.entries(selectedSections).filter(([_, section]) => section[permission] === true).length <
          options.length
        : true
    const newSelectedSections = typeof selectedSections !== 'string' ? Objects.cloneDeep(selectedSections) : {}
    options.forEach((option) => {
      newSelectedSections[option.value] = { ...newSelectedSections[option.value], [permission]: enabled }
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
