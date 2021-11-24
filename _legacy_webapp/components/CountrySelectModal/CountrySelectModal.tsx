import './countrySelectModal.scss'
import React, { useEffect, useState } from 'react'

import { Areas, Country } from '@core/country'
import { Objects, Strings } from '@core/utils'
import { useI18n } from '../../hooks'

import { Modal, ModalClose, ModalFooter, ModalHeader } from '../../components/modal'
import CountrySelectModalBody from './CountrySelectModalBody'

type Props = {
  canSave?: (selection: Array<string>) => boolean
  countries: Array<Country>
  excludedRegions?: Array<string>
  headerLabel: string
  initialSelection?: Array<string>
  onChange?: (countryIso: string, filteredSelection: Array<string>) => void
  onClose: (selection: Array<string>) => void
  open: boolean
  showCount?: boolean
  unselectableCountries?: Array<string>
}

const CountrySelectModal: React.FC<Props> = (props) => {
  const {
    canSave,
    countries,
    excludedRegions,
    headerLabel,
    initialSelection,
    onChange,
    onClose,
    open,
    showCount,
    unselectableCountries,
  } = props

  const i18n = useI18n()
  const [selection, setSelection] = useState<Array<string>>([])
  const [countriesFiltered, setCountriesFiltered] = useState<Array<Country>>(countries)
  const [query, setQuery] = useState<string>('')

  const resetAll = () => {
    setSelection([])
    onClose([])
  }

  const checkMatch = (country: Country, value: string) => {
    const countryLabel = Areas.getListName(country.countryIso, i18n)
    const searchString = Strings.normalize(countryLabel)
    return searchString.includes(value)
  }

  const updateCountries = () => {
    const value = Strings.normalize(query)
    if (Objects.isEmpty(value)) setCountriesFiltered(countries)
    else setCountriesFiltered(countries.filter((country) => checkMatch(country, value)))
  }

  const _onChange = (countryIso: string) => {
    const selectionUpdate = [...selection]
    if (selectionUpdate.includes(countryIso)) selectionUpdate.splice(selectionUpdate.indexOf(countryIso), 1)
    else selectionUpdate.push(countryIso)

    setSelection(selectionUpdate)
    onChange(countryIso, selectionUpdate)
  }

  const _onChangeAll = (countryISOs: Array<string>): void => {
    const selectionUpdate = [...countryISOs]
    setSelection(selectionUpdate)
    onChange('', selectionUpdate)
  }

  const _onClose = () => {
    onClose(selection)
    setSelection([])
  }

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [open])

  useEffect(updateCountries, [countries, query])

  useEffect(() => {
    setSelection(initialSelection)
  }, [initialSelection])

  return (
    <Modal className="modal-country-select" isOpen={open}>
      <ModalHeader>
        {headerLabel} {showCount && `(${selection.length})`}
        <input
          className="text-input filter"
          type="text"
          value={query}
          placeholder={i18n.t('emoji.picker.search')}
          onChange={(event) => setQuery(event.target.value)}
        />
        <ModalClose onClose={_onClose} />
      </ModalHeader>

      <CountrySelectModalBody
        countries={countriesFiltered}
        onChange={_onChange}
        onChangeAll={_onChangeAll}
        selection={selection}
        unselectableCountries={unselectableCountries}
        excludedRegions={excludedRegions}
      />

      <ModalFooter>
        <button className="btn btn-secondary" onClick={resetAll} type="button">
          {i18n.t('common.resetAll')}
        </button>

        <button className="btn btn-primary" disabled={!canSave(selection)} onClick={_onClose} type="button">
          {i18n.t('common.apply')}
        </button>
      </ModalFooter>
    </Modal>
  )
}

CountrySelectModal.defaultProps = {
  canSave: () => true,
  excludedRegions: [],
  initialSelection: [],
  onChange: () => ({}),
  showCount: true,
  unselectableCountries: [],
}

export default CountrySelectModal
