import { Numbers } from 'utils/numbers'

const humanReadableSize = (size: number): string => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${Number(Numbers.toFixed(size / 1024 ** i)) * 1} ${['B', 'kB', 'MB', 'GB', 'TB'][i]}`
}

export const Files = {
  humanReadableSize,
}
