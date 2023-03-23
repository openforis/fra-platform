import { body, query } from 'express-validator'

import { ForestSource, LayerSource } from '@meta/geo'

const sourceOptions = Object.values(ForestSource)

const countryIsoQuery = query('countryIso')
  .exists()
  .withMessage('validation.errors.requiredValue')
  .bail()
  .isLength({ min: 3, max: 3 })
  .withMessage('validation.errors.invalidValue')

export const forestLayerSchema = [
  body('countryIso')
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isLength({ min: 3, max: 3 })
    .withMessage('validation.errors.invalidValue'),

  body('layer.key')
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isIn(sourceOptions)
    .withMessage('validation.errors.invalidValue'),

  body('layer.options.gteTreeCoverPercent')
    .if(body('layer.key').equals(ForestSource.Hansen))
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isInt({ min: 0, max: 100 })
    .withMessage('validation.errors.invalidValue')
    .toInt(),
]
export const forestAgreementLayerSchema = [
  body('countryIso')
    .exists()
    .withMessage('validation.errors.requiredValue')
    .bail()
    .isLength({ min: 3, max: 3 })
    .withMessage('validation.errors.invalidValue'),

  body('layers')
    .default([])
    .customSanitizer((layers) => {
      const uniqueSources = layers.filter(
        (ls: LayerSource, index: number) => layers.findIndex((item: LayerSource) => item.key === ls.key) === index
      )
      return uniqueSources
    })
    .custom((layers) => {
      let valid = true
      if (layers.length >= 2 && layers.every((ls: LayerSource) => sourceOptions.includes(ls.key))) {
        const lsHansen = layers.find((ls: LayerSource) => ls.key === ForestSource.Hansen)
        if (
          lsHansen !== undefined &&
          (lsHansen.options?.gteTreeCoverPercent === undefined ||
            lsHansen.options.gteTreeCoverPercent <= 0 ||
            lsHansen.options.gteTreeCoverPercent > 100)
        ) {
          valid = false
        } else {
          const lsCustom = layers.find((ls: LayerSource) => ls.key === ForestSource.CustomFnF)
          if (lsCustom !== undefined && lsCustom.options?.assetId === undefined) {
            valid = false
          }
        }
      } else {
        valid = false
      }
      return valid ? true : Promise.reject(Error('validation.errors.invalidValue'))
    }),

  body('gteAgreementLevel')
    .exists()
    .bail()
    .withMessage('validation.errors.requiredValue')
    .isInt({ min: 1 })
    .withMessage('validation.errors.invalidValue')
    .bail()
    .custom((value, { req }) => {
      if (value > req.body.layers.length) {
        return Promise.reject(Error('validation.errors.invalidValue'))
      }
      return true
    })
    .toInt(),
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

export const forestAgreementEstimationSchema = [
  body('scale').default(100).isFloat({ min: 10, max: 500 }).withMessage('validation.errors.invalidValue').toFloat(),
]

export const GeoSchemes = {
  forestLayerSchema,
  forestAgreementLayerSchema,
  forestEstimationsSchema,
  forestAgreementEstimationSchema,
  countryIsoSchema: [countryIsoQuery],
}
