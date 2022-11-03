import { query } from 'express-validator'

import { ForestSource, precalForestAgreementSources } from '@meta/geo'

export const forestLayerSchema = [
  query('countryIso')
    .exists()
    .withMessage('Country ISO is required')
    .isLength({ min: 3, max: 3 })
    .withMessage('Country ISO must be a 3 char value')
    .bail(),

  query('forestSource')
    .exists()
    .withMessage('Forest source is required')
    .isIn(precalForestAgreementSources)
    .withMessage('Not valid forest source'),

  query('gteHansenTreeCoverPerc')
    .if(query('forestSource').equals(ForestSource.Hansen))
    .exists()
    .withMessage('Hansen tree cover percentage is required')
    .bail()
    .isInt({ min: 0, max: 100 })
    .withMessage('Not valid Hansen tree cover percentage 0-100')
    .toInt(),

  query('opacity').isFloat({ min: 0, max: 1 }).withMessage('Not valid opacity level 0-1').bail().toFloat().optional(),

  query('onlyProtected').toBoolean().optional(),
]

export const GeoSchemes = {
  forestLayerSchema,
}
