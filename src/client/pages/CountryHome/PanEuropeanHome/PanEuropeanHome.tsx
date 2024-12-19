import './PanEuropeanHome.scss'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { SectionNames } from 'meta/routes'

import CountryHeader from 'client/pages/CountryHome/CountryHeader'

import { useSections } from './hooks/useSections'

const PanEuropeanHome: React.FC = () => {
  const sections = useSections()

  return (
    <>
      <CountryHeader sections={sections} showRegionLabel={false} />

      <Routes>
        {sections.map(({ name, component }) => (
          <Route key={name} element={React.createElement(component, {})} path={`${name}/*`} />
        ))}

        <Route element={<Navigate replace to={SectionNames.Country.Home.overview} />} index />
      </Routes>
    </>
  )
}

export default PanEuropeanHome
