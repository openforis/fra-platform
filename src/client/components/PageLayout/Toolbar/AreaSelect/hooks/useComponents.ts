import { useMemo } from 'react'

import { SelectProps } from 'client/components/Inputs/Select'
import GroupHeading from 'client/components/PageLayout/Toolbar/AreaSelect/GroupHeading'

export const useComponents = (): SelectProps['components'] => {
  return useMemo<SelectProps['components']>(() => {
    return {
      GroupHeading,
    }
  }, [])
}
