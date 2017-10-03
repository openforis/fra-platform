import React from 'react'
import { header, rows, valueSlice } from './commonTableSpec'

export const avgTableSpec = i18n => ({
  name: 'carbonStockAvg', // used to uniquely identify table
  section: 'carbonStock',
  header: header(i18n, 'avg'),
  rows: rows(i18n, 'avg'),
  valueSlice: valueSlice
})

export const totalTableSpec = i18n => ({
  name: 'carbonStockTotal', // used to uniquely identify table
  section: 'carbonStock',
  header: header(i18n, 'total'),
  rows: rows(i18n, 'total'),
  valueSlice: valueSlice
})

