import { format, isAfter } from 'date-fns'

export const formatDate = (_date) => {
  const [time, date] = _date.split('T')
  return format(
    new Date(`${date} ${time}`),
    'dd/MM/yyyy\tHH:mm'
  )
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
    (a, b) => compareVersion(b.version, a.version)
  )
  const nonPendingVersions = getNonPendingVersions(versions).sort(
    (a, b) => compareVersion(b.version, a.version)
  )
  return [
    ...pendingVersions,
    ...nonPendingVersions
  ]
}

const getPendingVersions = (versions) => {
  return versions.filter(version => version.status === 'pending')
}

const getNonPendingVersions = (versions) => {
  return versions.filter(version => version.status !== 'pending')
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

const validVersion = {
  // Version should match major.minor.patch -style
  version: ({ version }) => /\d+\.\d+\.\d+/.test(version),
  // Check given date is after today
  date: ({ timestamp }) => isAfter(new Date(timestamp), new Date())
}

export const validField = (newVersionForm, field) =>
  validVersion[field](newVersionForm)

export const versionIsGreater = (versions, version) => {
  if (typeof version !== 'string') return false;
  console.log(version)

  if (!Array.isArray(versions) || !versions.length) {
    return true
  }

  // Sort mutates, make clone
  const _versions = [...versions]
  _versions.sort((a, b) => compareVersion(b.version, a.version))
  return compareVersion(version, _versions[0].version) > 0 ? true : false;
}
