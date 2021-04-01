import './style.less'
import React, { useRef, useState } from 'react'
import { Modal, ModalClose, ModalFooter, ModalHeader } from '@webapp/components/modal'
import { useI18n, useOnUpdate } from '@webapp/components/hooks'
import { Country } from '@common/country'
import CountrySelectionModalBody from './CountrySelectionModalBody'

type Props = {
  headerLabel: string
  countries: any[]
  initialSelection?: any[]
  unselectableCountries?: any[]
  excludedRegions?: any[]
  isOpen: boolean
  showCount?: boolean
  canSave?: (selection: string[]) => any
  onChange?: (countryIso: string, filteredSelection: string[]) => any
  onClose: (selection: string[]) => any
}

const CountrySelectionModal: React.FC<Props> = (props) => {
  const {
    countries,
    showCount,
    canSave,
    isOpen,
    initialSelection,
    onChange,
    onClose,
    unselectableCountries,
    headerLabel,
    excludedRegions,
  } = props
  const [selection, setSelection] = useState(initialSelection)
  const [countriesFiltered, setCountriesFiltered] = useState(countries)
  const inputRef = useRef(null)
  const i18n = useI18n()
  const resetAll = () => {
    setSelection([])
  }

  const normalizeString = (str: string) => str.trim().toLowerCase().replace(/\s/g, '')
  const checkMatch = (country: any, value: string) => {
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
  const _onChange = (countryIso: string) => {
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
        excludedRegions={excludedRegions}
      />

      <ModalFooter>
        <button className="btn btn-secondary" onClick={resetAll}>
          {i18n.t('common.resetAll')}
        </button>

        <button className="btn btn-primary" disabled={!canSave(selection)} onClick={_onClose}>
          {i18n.t('common.apply')}
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
  excludedRegions: [],
}
export default CountrySelectionModal
