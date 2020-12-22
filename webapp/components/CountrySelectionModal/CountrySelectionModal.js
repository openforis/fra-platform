import './style.less'
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { Modal, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'
import { Country } from '@common/country'

import CountrySelectionModalBody from './CountrySelectionModalBody'

const CountrySelectionModal = (props) => {
  const { countries, showCount, canSave, isOpen, onChange, onClose, unselectableCountries, headerLabel } = props
  const [selection, setSelection] = useState([])
  const [countriesFiltered, setCountriesFiltered] = useState(countries)
  const inputRef = useRef(null)

  const i18n = useI18n()

  const resetAll = () => {
    setSelection([])
  }

  const normalizeString = (str) => str.trim().toLowerCase().replace(/\s/g, '')

  const checkMatch = (country, value) => {
    const countryLabel = i18n.t(`area.${Country.getCountryIso(country)}.listName`)
    const searchString = normalizeString(`${countryLabel}`)
    return searchString.includes(value)
  }

  const updateCountries = () => {
    if (!inputRef.current) return
    const value = normalizeString(inputRef.current.value)
    if (value === '') {
      setCountriesFiltered(countries)
    } else {
      setCountriesFiltered(
        countries.filter((country) => {
          return checkMatch(country, value)
        })
      )
    }
  }

  useOnUpdate(updateCountries, [countries])

  const _onChange = (countryIso) => {
    if (selection.includes(countryIso)) {
      const filteredSelection = selection.filter((_countryIso) => _countryIso !== countryIso)
      setSelection(filteredSelection)
      onChange(countryIso, filteredSelection)
    } else {
      setSelection([...selection, countryIso])
      onChange(countryIso, [...selection, countryIso])
    }
  }

  const _onClose = () => {
    onClose(selection)
  }

  return (
    <Modal className="country-selection" isOpen={isOpen}>
      <ModalHeader>
        {headerLabel} {showCount && `(${selection.length})`}
        <input
          className="text-input filter"
          ref={inputRef}
          type="text"
          placeholder={i18n.t('emoji.picker.search')}
          onChange={updateCountries}
        />
        <ModalClose onClose={_onClose} />
      </ModalHeader>

      <CountrySelectionModalBody
        countries={countriesFiltered}
        onChange={_onChange}
        selection={selection}
        unselectableCountries={unselectableCountries}
      />

      <ModalFooter>
        <button className="btn btn-primary" disabled={!canSave(selection)} onClick={_onClose}>
          {i18n.t('common.done')}
        </button>
        <button className="btn btn-secondary" onClick={resetAll}>
          {i18n.t('common.resetAll')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

CountrySelectionModal.defaultProps = {
  unselectableCountries: [],
  canSave: () => true,
  onChange: () => true,
  showCount: true,
}

CountrySelectionModal.propTypes = {
  headerLabel: PropTypes.string.isRequired,

  countries: PropTypes.array.isRequired,
  unselectableCountries: PropTypes.array,

  isOpen: PropTypes.bool.isRequired,
  showCount: PropTypes.bool,

  canSave: PropTypes.func,
  onChange: PropTypes.func,
  onClose: PropTypes.func.isRequired,
}

export default CountrySelectionModal
