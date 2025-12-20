import './CountryHome.scss'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router'

import MessageCenter from 'client/components/MessageCenter'
import CountryHeader from 'client/pages/CountryHome/CountryHeader'

import { useSections } from './hooks/useSections'

const CountryHome: React.FC = () => {
  const sections = useSections()

  return (
    <>
      <MessageCenter />
      <div className="app-view__content">
        <CountryHeader sections={sections} />

        <Routes>
          {sections.map(({ component, route }) => {
            const path = route.path.relative
            return <Route key={path} element={React.createElement(component, {})} path={`${path}/*`} />
          })}

          {sections.length > 0 && (
            <Route element={<Navigate replace to={sections.at(0).route.path.relative} />} index />
          )}
        </Routes>
      </div>
    </>
  )
}

export default CountryHome
