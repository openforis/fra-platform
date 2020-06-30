import './levelSelection.less'

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import useGetRequest from '@webapp/components/hooks/useGetRequest'
import * as CountryState from '@webapp/app/country/countryState'

import List from './list'

const levels = {
  global: 'WO',
  region: ['AF', 'AS', 'EU', 'NA', 'OC', 'SA'],
}

const LevelSelection = () => {
  const i18n = useI18n()
  const { levelIso } = useParams()

  const { data = [], dispatch: fetchLevelIso } = useGetRequest('/api/statisticalFactsheets/levelIso')

  const countrySelectionRef = useRef(null)
  const [open, setOpen] = useState(false)

  const outsideClick = (evt) => {
    if (!countrySelectionRef.current.contains(evt.target)) setOpen(false)
  }

  useEffect(() => {
    fetchLevelIso()
    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  const getLabel = () => {
    if (levelIso === levels.global || levels.region.includes(levelIso)) {
      return i18n.t(`statisticalFactsheets.category.${levelIso}`)
    }
    const country = useSelector(CountryState.getCountryByCountryIso(levelIso))
    return country.listName[i18n.language]
  }

  return (
    // eslint-disable-next-line
    <div className="country-selection level-selection" ref={countrySelectionRef} onClick={() => setOpen(!open)}>
      <div className="country-selection__info">
        <span className="country-selection__country-name">{getLabel()}</span>
      </div>
      <Icon name="small-down" />

      {open && <List countries={data} />}
    </div>
  )
}

export default LevelSelection
