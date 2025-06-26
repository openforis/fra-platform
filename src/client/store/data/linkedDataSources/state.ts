import { CountryIso } from 'meta/area'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { DataSourceLinked } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'

export type LinkedDataSourcesState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<SectionName, Array<DataSourceLinked>>>>
>

export const initialState: LinkedDataSourcesState = {}
