import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { NodeValuesEstimation } from 'meta/assessment/nodeValuesEstimation'

type Uuid = NodeValuesEstimation['uuid']

export type EstimationsState = Record<
  AssessmentName,
  Record<CycleName, Record<CountryIso, Record<Uuid, NodeValuesEstimation>>>
>

export const initialState: EstimationsState = {}
