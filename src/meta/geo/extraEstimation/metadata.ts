import { ExtraEstimation } from 'meta/geo/extraEstimation/extraEstimation'

export type ExtraEstimationMetadata = {
  palette?: Array<string>
  titleKey: string
}

export const extraEstimationsMetadata: Record<ExtraEstimation, ExtraEstimationMetadata> = {
  [ExtraEstimation.CustomRecipe]: {
    palette: ['#FF00FF'], // fuchsia
    titleKey: 'geo.customAgreementArea',
  },
  [ExtraEstimation.PrecalculatedRecipe]: {
    palette: ['#FF00FF'], // fuchsia
    titleKey: 'geo.treeCoverAgreementSelected',
  },
  [ExtraEstimation.ReportedToFRA]: {
    palette: ['#000000'], // black
    titleKey: 'geo.reportedToFra',
  },
}
