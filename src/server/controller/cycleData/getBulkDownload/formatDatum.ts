import { Numbers } from 'utils/numbers'

export const formatDatum = (datum: string | undefined) => {
  if (datum === undefined) return null

  // Only format datum if it doesn't contain a letter
  const containsLetter = /[a-zA-Z]/.test(String(datum))

  if (!containsLetter) {
    return Numbers.toFixed(String(datum))
  }

  return datum
}
