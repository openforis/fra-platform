import { isAfter } from 'date-fns'
import { getRelativeDate } from '@webapp/utils/relativeDate'
import * as FRAVersion from '@common/versioning/fraVersion'

export const formatDate = (_date, i18n) => {
  return getRelativeDate(_date, i18n)
}

export const classNames = {
  table: 'fra-table',
  th: 'fra-table__header-cell',
  td: 'fra-table__cell-left',
  button: 'btn btn-delete',
  icon: 'icon icon-white'
};

// Simple sort function.
export const sortVersions = versions => {
  const pendingVersions = getPendingVersions(versions).sort(
    (a, b) => compareVersion(
      FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a)
    ))
  const nonPendingVersions = getNonPendingVersions(versions).sort(
    (a, b) => compareVersion(
      FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a)
    ))
  return [
    ...pendingVersions,
    ...nonPendingVersions
  ]
}

const getPendingVersions = (versions) => {
  return versions.filter(version => FRAVersion.getStatus(version) === FRAVersion.status.pending)
}

const getNonPendingVersions = (versions) => {
  return versions.filter(version => FRAVersion.getStatus(version) !== 'pending')
}

//https://helloacm.com/the-javascript-function-to-compare-version-number-strings/
export const compareVersion = (v1, v2) => {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('.');
  v2 = v2.split('.');
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++i) {
    v1[i] = parseInt(v1[i], 10);
    v2[i] = parseInt(v2[i], 10);
    if (v1[i] > v2[i]) return 1;
    if (v1[i] < v2[i]) return -1;
  }
  return v1.length == v2.length ? 0 : (v1.length < v2.length ? -1 : 1);
}

const validatorFunctions = {
  // Version number should match major.minor.patch -style
  versionNumber: ({ versionNumber }) => /\d+\.\d+\.\d+/.test(versionNumber),
  // Check given date is after today
  date: ({ publishedAt }) => isAfter(new Date(publishedAt), new Date())
}

export const validField = (newVersionForm, field) =>
  validatorFunctions[field](newVersionForm)

export const versionIsGreater = (versions, versionNumber) => {
  if (typeof versionNumber !== 'string') return false;

  if (!Array.isArray(versions) || !versions.length) {
    return true
  }

  // Sort mutates, make clone
  const _versions = [...versions]
  _versions.sort((a, b) =>
    compareVersion(
      FRAVersion.getVersionNumber(b), FRAVersion.getVersionNumber(a)
    ))
  return compareVersion(versionNumber, FRAVersion.getVersionNumber(_versions[0])) > 0 ? true : false;
}
