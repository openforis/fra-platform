import { Numbers } from 'utils/numbers'

export const formatDatum = (datum: string | undefined): string => {
  if (datum === undefined) return null

  const bigNumber = Numbers.toBigNumber(datum)
  const isNumeric = bigNumber.isFinite()

  if (isNumeric) {
    return Numbers.toFixed(datum)
  }

  return datum
}
