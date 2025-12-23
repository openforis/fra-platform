import { useMemo } from 'react'

import { SelectProps } from 'client/components/Inputs/Select'
import Group from 'client/components/PageLayout/Toolbar/AreaSelect/Group'
import Option from 'client/components/PageLayout/Toolbar/AreaSelect/Option'
import SingleValue from 'client/components/PageLayout/Toolbar/AreaSelect/SingleValue'

export const useComponents = (): SelectProps['components'] => {
  return useMemo<SelectProps['components']>(() => {
    return {
      Group,
      GroupHeading: () => null,
      Option,
      SingleValue,
    }
  }, [])
}
