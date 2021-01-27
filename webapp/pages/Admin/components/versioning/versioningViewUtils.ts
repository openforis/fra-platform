import { isAfter } from 'date-fns'
import { getRelativeDate } from '@webapp/utils/relativeDate'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as FRAVersion from '@common/versioning/fraVersion'

export const formatDate = (_date: any, i18n: any) => {
  return getRelativeDate(_date, i18n)
}

export const classNames = {
  table: 'fra-table',
  th: 'fra-table__header-cell',
  td: 'fra-table__cell-left',
  button: 'btn btn-delete',
  icon: 'icon icon-white',
}

// Simple sort function.
export const sortVersions = (versions: any) => {
  const pendingVersions = getPendingVersions(versions).sort((a: any, b: any) =>
    compareVersion(FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a))
  )
  const nonPendingVersions = getNonPendingVersions(versions).sort((a: any, b: any) =>
    compareVersion(FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a))
  )
  return [...pendingVersions, ...nonPendingVersions]
}

const getPendingVersions = (versions: any) => {
  return versions.filter((version: any) => FRAVersion.getStatus(version) === FRAVersion.status.pending)
}

const getNonPendingVersions = (versions: any) => {
  return versions.filter((version: any) => FRAVersion.getStatus(version) !== 'pending')
}

// https://helloacm.com/the-javascript-function-to-compare-version-number-strings/
export const compareVersion = (v1: any, v2: any) => {
  if (typeof v1 !== 'string') return false
  if (typeof v2 !== 'string') return false
  v1 = v1.split('.')
  v2 = v2.split('.')
  const k = Math.min(v1.length, v2.length)
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10)
    v2[i] = parseInt(v2[i], 10)
    if (v1[i] > v2[i]) return 1
    if (v1[i] < v2[i]) return -1
  }
  return v1.length == v2.length ? 0 : v1.length < v2.length ? -1 : 1
}

const validatorFunctions = {
  // Version number should match major.minor.patch -style
  versionNumber: ({ versionNumber }: any) => /\d+\.\d+\.\d+/.test(versionNumber),
  // Check given date is after today
  date: ({ publishedAt }: any) => isAfter(new Date(publishedAt), new Date()),
}

// @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
export const validField = (newVersionForm: any, field: any) => validatorFunctions[field](newVersionForm)

export const versionIsGreater = (versions: any, versionNumber: any) => {
  if (typeof versionNumber !== 'string') return false

  if (!Array.isArray(versions) || !versions.length) {
    return true
  }

  // Sort mutates, make clone
  const _versions = [...versions]
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'number | boolean' is not assignable to type ... Remove this comment to see the full error message
  _versions.sort((a, b) => compareVersion(FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a)))
  return compareVersion(versionNumber, FRAVersion.getVersionNumber(_versions[0])) > 0
}
