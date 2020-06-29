import camelize from 'camelize'
import { tableMappings } from '@webapp/app/dataExport/utils/panEuropeanMappings'

const keys = {
  panEuropean: 'panEuropean',
}

export const isPanEuropean = (object) => {
  if (!object) return false
  if (typeof object === 'string') return camelize(object) === keys.panEuropean
  return !!object[keys.panEuropean]
}

export const getPanEuropeanTableMapping = (section) =>
  tableMappings[section] ? `table_${tableMappings[section]}` : section
