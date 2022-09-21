const regex = {
  yearWithWord: /\d{4}_\w{4}/,
}

export const isYearWithWord = (column: string): boolean => regex.yearWithWord.test(column)
