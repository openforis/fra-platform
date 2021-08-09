const regex = {
  yearRange: /\d{4}-\d{4}/,
  yearRangeUnderscore: /\d{4}_\d{4}/,
  yearWithWord: /\d{4}_\w{4}/,
}

export const isYearRange = (range: string): boolean => regex.yearRange.test(range)

export const isYearWithWord = (column: string): boolean => regex.yearWithWord.test(column)

// View specific
// forestPolicy
export const forestPolicy: Record<string, string> = {
  national: 'national_yes_no',
  subnational: 'sub_national_yes_no',
  national_yes_no: 'national',
  sub_national_yes_no: 'subnational',
}

export const isForestPolicySection = (section: string): boolean => section.includes('forestPolicy')
