import React from 'react'
import { Route, Routes as RouterRoutes } from 'react-router'

import Flex from 'client/components/Layout/Flex'
import Partners from 'client/pages/CycleHome/Partners'

const AcceptPlaceholder: React.FC = () => {
  return (
    <Flex alignItems={'center'} justifyContent={'center'}>
      <button>Accept with Google</button>
      <button>Accept with FRA</button>
    </Flex>
  )
}

const Invitation: React.FC = () => {
  return (
    <div className="login-view">
      <div className="app-view__content">
        <div className="invitation">
          <RouterRoutes>
            <Route element={<AcceptPlaceholder />} index />
          </RouterRoutes>
          {/*<img alt="" className="login__tucan" src="/img/tucan.svg" />*/}
        </div>

        <Partners />
      </div>
    </div>
  )
}

export default Invitation
