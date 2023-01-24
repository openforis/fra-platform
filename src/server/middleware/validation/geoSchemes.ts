import { query } from 'express-validator'

import { ForestSource, precalForestAgreementSources } from '@meta/geo'

const countryIsoQuery = query('countryIso')
  .exists()
  .withMessage('validation.errors.requiredValue')
  .bail()
  .isLength({ min: 3, max: 3 })
  .withMessage('validation.errors.invalidValue')

const opacityQuery = query('opacity')
  .default(1)
  .isFloat({ min: 0, max: 1 })
  .withMessage('validation.errors.invalidValue')
  .toFloat()

const layerQuery = query('layer')
  .default([])
  .customSanitizer((layer) => {
    if (Array.isArray(layer)) return Array.from(new Set<ForestSource>(layer))

    return [layer]
  })
  .custom((layer) => {
    const sourceOptions = Object.values(ForestSource)
    if (layer.length >= 2 && layer.every((layerId: any) => sourceOptions.includes(layerId))) {
      return true
    }
    return Promise.reject(Error('validation.errors.invalidValue'))
  })

const agreementLevelQuery = query('gteAgreementLevel')
  .exists()
  .bail()
  .withMessage('validation.errors.requiredValue')
  .isInt({ min: 1 })
  .withMessage('validation.errors.invalidValue')
  .bail()
  .custom((value, { req }) => {
    if (value > req.query.layer.length) {
      return Promise.reject(Error('validation.errors.invalidValue'))
    }
    return true
  })
  .toInt()

const hansenTreeCoverPercQuery = query('gteHansenTreeCoverPerc')
  .customSanitizer((value, { req }) => {
    if (!req.query.layer.includes(ForestSource.Hansen)) {
      return 0
    }
    return value
  })
  .exists()
  .bail()
  .withMessage('validation.errors.requiredValue')
  .isInt({ min: 0, max: 100 })
  .withMessage('validation.errors.invalidValue')
  .toInt()

export const forestLayerSchema = [
  countryIsoQuery,
  opacityQuery,

  query('forestSource')
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isIn(precalForestAgreementSources)
    .withMessage('validation.errors.invalidValue'),

  query('gteHansenTreeCoverPerc')
    .if(query('forestSource').equals(ForestSource.Hansen))
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isInt({ min: 0, max: 100 })
    .withMessage('validation.errors.invalidValue')
    .toInt(),

  query('onlyProtected').default(false).toBoolean(),
]

export const forestAgreementLayerSchema = [
  countryIsoQuery,
  opacityQuery,
  layerQuery,
  agreementLevelQuery,
  hansenTreeCoverPercQuery,
]
export const forestAgreementEstimationSchema = [
  countryIsoQuery,
  query('scale').default(100).isFloat({ min: 10, max: 500 }).withMessage('validation.errors.invalidValue').toFloat(),
  layerQuery,
  agreementLevelQuery,
  hansenTreeCoverPercQuery,
]
export const forestEstimationsSchema = [
  countryIsoQuery,
  query('year')
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isInt()
    .withMessage('validation.errors.invalidValue')
    .toInt(),
]

export const GeoSchemes = {
  forestLayerSchema,
  forestAgreementLayerSchema,
  forestEstimationsSchema,
  forestAgreementEstimationSchema,
}
