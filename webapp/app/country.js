import React from 'react'
import * as R from 'ramda'
import { alpha3ToAlpha2, getName } from 'i18n-iso-countries'

export const getCountryName = (countryIso, language) =>
  countryIso === 'ATL' // ATL is Atlantis and is for testing/demo purposes only
    ? 'Atlantis'
    : getName(countryIso, language)

export const getCountryAlpha2 = (countryIso) =>
  countryIso === 'ATL' // ATL is Atlantis and is for testing/demo purposes only
    ? 'atlantis'
    : alpha3ToAlpha2(countryIso)
