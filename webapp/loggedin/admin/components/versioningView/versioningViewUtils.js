import { format } from 'date-fns'

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
  // TODO: If pending, show first

  // Make copy of versions (don't mutate original)
  return [...versions].sort((a, b) => {
    // TODO: Do normal comparasion first ?
    if (a.status == 'pending' && b.status !== 'pending') {
      return 1;
    }
    else if (b.status == 'pending') {
      return -1;
    }
    if (a.version == b.version) {
      return a.timestamp > b.timestamp ? -1 : 1;
    }
    return a.version > b.version ? -1 : 1;
  });
}

//https://helloacm.com/the-javascript-function-to-compare-version-number-strings/
export const compareVersion = (v1, v2) => {
  if (typeof v1 !== 'string') return false;
  if (typeof v2 !== 'string') return false;
  v1 = v1.split('.');
  v2 = v2.split('.');
  const k = Math.min(v1.length, v2.length);
  for (let i = 0; i < k; ++ i) {
      v1[i] = parseInt(v1[i], 10);
      v2[i] = parseInt(v2[i], 10);
      if (v1[i] > v2[i]) return 1;
      if (v1[i] < v2[i]) return -1;        
  }
  return v1.length == v2.length ? 0: (v1.length < v2.length ? -1 : 1);
}
