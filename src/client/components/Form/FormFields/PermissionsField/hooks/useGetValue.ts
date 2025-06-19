import { ActionMeta } from 'react-select'

import { Option } from 'client/components/Inputs/Select'

interface PermissionsValue {
  tableData: Array<string>
  descriptions: Array<string>
}

type PermissionType = 'tableData' | 'descriptions'

export const useGetValue = () => {
  return (
    currentPermissions: PermissionsValue,
    permissionType: PermissionType,
    selectedValues: Array<string>,
    actionMeta: ActionMeta<Option>
  ): PermissionsValue => {
    const value = actionMeta.option?.value

    if (value === 'none' || value === 'all') {
      return {
        ...currentPermissions,
        [permissionType]: [value],
      }
    }

    const filteredValues = selectedValues.filter((v) => v !== 'all' && v !== 'none')

    return {
      ...currentPermissions,
      [permissionType]: filteredValues,
    }
  }
}
