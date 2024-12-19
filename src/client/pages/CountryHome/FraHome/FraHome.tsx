import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import CountryHeader from 'client/pages/CountryHome/CountryHeader'

import { useSections } from './hooks/useSections'

const FraHome: React.FC = () => {
  const sections = useSections()

  return (
    <>
      <CountryHeader sections={sections} />

      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} element={React.createElement(component, {})} path={`${name}/*`} />
        ))}
        {sections.length >= 1 && <Route element={<Navigate replace to={sections[0].name} />} index />}
      </Routes>
    </>
  )
}
export default FraHome
