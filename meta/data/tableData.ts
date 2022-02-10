import { CountryIso } from '@meta/area'
import { NodeValue } from '@meta/assessment'

export type TableData = Record<CountryIso, Record<string, NodeValue>>
