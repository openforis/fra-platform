import { query } from 'express-validator'

import { ForestSource, precalForestAgreementSources } from '@meta/geo'

const countryIsoQuery = query('countryIso').exists().bail().isLength({ min: 3, max: 3 })

const opacityQuery = query('opacity').default(1).isFloat({ min: 0, max: 1 }).bail().toFloat()

export const forestLayerSchema = [
  countryIsoQuery,
  opacityQuery,

  query('forestSource').exists().bail().isIn(precalForestAgreementSources),

  query('gteHansenTreeCoverPerc')
    .if(query('forestSource').equals(ForestSource.Hansen))
    .exists()
    .bail()
    .isInt({ min: 0, max: 100 })
    .toInt(),

  query('onlyProtected').default(false).toBoolean(),
]

export const forestAgreementLayerSchema = [
  countryIsoQuery,
  opacityQuery,

  query('layer')
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
      return Promise.reject()
    }),

  query('gteAgreementLevel')
    .exists()
    .bail()
    .isInt({ min: 1 })
    .bail()
    .custom((value, { req }) => {
      if (value > req.query.layer.length) {
        return Promise.reject()
      }
      return true
    })
    .toInt(),

  query('gteHansenTreeCoverPerc')
    .customSanitizer((value, { req }) => {
      if (!req.query.layer.includes(ForestSource.Hansen)) {
        return 0
      }
      return value
    })
    .isInt({ min: 0, max: 100 })
    .bail()
    .toInt(),
]

export const GeoSchemes = {
  forestLayerSchema,
  forestAgreementLayerSchema,
}
