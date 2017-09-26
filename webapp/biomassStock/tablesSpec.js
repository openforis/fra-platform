import React from 'react'
import { header, rows, valueSlice } from './commonTableSpec'

export const avgTableSpec = i18n => ({
  name: 'biomassStockAvg', // used to uniquely identify table
  header: header(i18n, 'avg'),
  rows: rows(i18n, 'avg'),
  valueSlice: valueSlice
})

export const totalTableSpec = i18n => ({
  name: 'biomassStockTotal', // used to uniquely identify table
  header: header(i18n, 'total'),
  rows: rows(i18n, 'total'),
  valueSlice: valueSlice
})

