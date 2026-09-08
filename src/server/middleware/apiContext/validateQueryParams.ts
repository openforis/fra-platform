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
// columns, type, topicKey, query, paths, notifyUsers, notifySelf,
// messageId, mergeOdp, linkedVariable, index, id, force, fileName

const assessmentNames = Object.values(AssessmentNames)
const cycleNames = Object.values(CycleNames)

const validators: Record<string, (value: string | Array<string>) => boolean> = {
  // assessmentName and cycleName
  assessmentName: (value) => assessmentNames.includes(value as AssessmentNames),
  cycleName: (value) => cycleNames.includes(value as CycleNames),
  // countryISOs and regionCode
  countryISOs: (value) => Array.isArray(value) && value.every((countryIso) => Areas.isISOCountry(countryIso)),
  countryIso: (value) => Areas.isAreaCode(value as string),
  regionCode: (value) => Areas.isRegion(value as string),
  // tablePaginated
  limit: (value) => Numbers.isNonNegativeInteger(value as string),
  offset: (value) => Numbers.isNonNegativeInteger(value as string),
}

const _validateParam = (params: Record<string, string | Array<string>>, paramName: string): void => {
  const validate = validators[paramName]
  const value = params[paramName]
  if (value === undefined) return

  if (!validate(value)) {
    throw _getInvalidQueryParamError(paramName, value.toString())
  }
}

export const validateQueryParams = (req: Request, _: Response, next: NextFunction): void => {
  try {
    const params = { ...req.params, ...req.query, ...req.body } as Record<string, string | Array<string>>
    Object.keys(validators).forEach((paramName) => _validateParam(params, paramName))
    next()
  } catch (error) {
    next(error)
  }
}
