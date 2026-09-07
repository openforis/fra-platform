import { NextFunction, Request, Response } from 'express'

import { Areas } from 'meta/area/areas'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleNames } from 'meta/assessment/cycle/names'
import { Numbers } from 'utils/numbers'

export type InvalidQueryParamError = Error & { statusCode: number }

const _getInvalidQueryParamError = (paramName: string, value: string): InvalidQueryParamError => {
  const error = new Error(`Invalid ${paramName}: ${value}`) as InvalidQueryParamError
  error.name = 'InvalidQueryParamError'
  error.statusCode = 400
  return error
}

// TODO:
// sectionName, filters, lang, year
// uuid, invitationUuid, userUuid, resetPasswordUuid, (odpId?)
// orderBy, orderByDirection, key
// OTHER:
// variables, tableNames, tableName, sectionNames, onlyTables, name, global,
// columns, type, topicKey, regionCode, query, paths, notifyUsers, notifySelf,
// messageId, mergeOdp, linkedVariable, index, id, force, fileName

const validators: Record<string, (value: string | Array<string>) => boolean> = {
  // assessmentName and cycleName
  assessmentName: (value) => Object.values(AssessmentNames).includes(value as AssessmentNames),
  cycleName: (value) => Object.values(CycleNames).includes(value as CycleNames),
  // countryIso
  // Note: Platform used mixed convention "countryISOs" to mean also a list of area codes
  countryISOs: (value) => Array.isArray(value) && value.every((countryIso) => Areas.isAreaCode(countryIso)),
  countryIso: (value) => Areas.isAreaCode(value as string),
  // tablePaginated
  limit: (value) => Numbers.isNonNegativeInteger(value as string),
  offset: (value) => Numbers.isNonNegativeInteger(value as string),
}

const _getParam = (req: Request, paramName: string): string | Array<string> | undefined => {
  const params = { ...req.params, ...req.query, ...req.body } as Record<string, string | Array<string>>
  return params[paramName]
}

const _validateParam = (req: Request, paramName: string): void => {
  const validate = validators[paramName]
  const value = _getParam(req, paramName)
  if (value === undefined) return

  if (!validate(value)) {
    throw _getInvalidQueryParamError(paramName, value.toString())
  }
}

export const validateQueryParams = (req: Request, _: Response, next: NextFunction): void => {
  try {
    Object.keys(validators).forEach((paramName) => _validateParam(req, paramName))
    next()
  } catch (error) {
    next(error)
  }
}
