import './levelSelection.less'

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'

import Icon from '@webapp/components/icon'
import useI18n from '@webapp/components/hooks/useI18n'
import useGetRequest from '@webapp/components/hooks/useGetRequest'

import List from './list'
import { getLabel } from './getLabel'

const LevelSelection = () => {
  const i18n = useI18n()
  const { levelIso } = useParams()

  const { data = [], dispatch: fetchLevelIso } = useGetRequest('/api/statisticalFactsheets/levelISOs')

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

  return (
    // eslint-disable-next-line
    <div className="country-selection level-selection" ref={countrySelectionRef} onClick={() => setOpen(!open)}>
      <div className="country-selection__info">
        <span className="country-selection__country-name">{getLabel(levelIso, i18n)}</span>
      </div>
      <Icon name="small-down" />

      {open && <List countries={data} />}
    </div>
  )
}

export default LevelSelection
