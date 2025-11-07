import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

export type Props = { assessment: Assessment; cycle: Cycle; countries: Array<Country> }
