import React from 'react'

import { useIsAdmin, useIsHome } from '@client/hooks'
import Icon from '@client/components/Icon'

// import { NavigationActions } from '@webapp/store/navigation'

const ToggleNavigationControl: React.FC = () => {
  // const dispatch = useAppDispatch()
  const isHome = useIsHome()
  const isAdmin = useIsAdmin()

  return (
    <button
      type="button"
      className="btn app-header__toggle-navigation-visible"
      disabled={isHome || isAdmin}
      onClick={() => {
        // dispatch(NavigationActions.toggleNavigationVisibility())
        console.info('Navigation toggle not implemented')
      }}
    >
      <Icon className="icon-sub" name="menu-left" />
    </button>
  )
}

export default ToggleNavigationControl
