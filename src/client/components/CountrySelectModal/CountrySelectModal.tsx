import './countrySelectModal.scss'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'
import { Strings } from 'utils/strings'

import { Areas, Country } from 'meta/area'

import { Modal, ModalClose, ModalFooter, ModalHeader } from 'client/components/Modal'

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
  showFooter?: boolean
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
    showFooter,
  } = props

  const i18n = useTranslation()
  const [selection, setSelection] = useState<Array<string>>([])
  const [countriesFiltered, setCountriesFiltered] = useState<Array<Country>>(countries)
  const [query, setQuery] = useState<string>('')

  const resetAll = () => {
    setSelection([])
    onClose([])
  }

  const checkMatch = (country: Country, value: string) => {
    const countryLabel = i18n.t(Areas.getTranslationKey(country.countryIso))
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

  const _onChangeMany = (countryISOs: Array<string>, selectAll: boolean): void => {
    if (selectAll) {
      const selectionUpdate = [...countryISOs, ...selection].filter((v) => !unselectableCountries.includes(v))
      setSelection(selectionUpdate)
      onChange('', selectionUpdate)
    } else {
      const selectionUpdate: Array<string> = selection.filter((v) => !countryISOs.includes(v))
      setSelection(selectionUpdate)
      onChange('', selectionUpdate)
    }
  }

  const _onClose = () => {
    onClose(selection)
    setSelection([])
  }

  useEffect(() => {
    if (open) document.body.classList.add('no-scroll')
    else document.body.classList.remove('no-scroll')
  }, [open])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateCountries, [countries, query])

  useEffect(() => {
    setSelection(initialSelection)
  }, [initialSelection, open])

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
        onChangeMany={_onChangeMany}
        selection={selection}
        unselectableCountries={unselectableCountries}
        excludedRegions={excludedRegions}
      />

      {showFooter && (
        <ModalFooter>
          <button className="btn btn-secondary" onClick={resetAll} type="button">
            {i18n.t('common.resetAll')}
          </button>

          <button className="btn btn-primary" disabled={!canSave(selection)} onClick={_onClose} type="button">
            {i18n.t('common.apply')}
          </button>
        </ModalFooter>
      )}
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
  showFooter: true,
}

export default CountrySelectModal
