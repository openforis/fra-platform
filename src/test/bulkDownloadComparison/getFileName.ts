// Get csv file name with timestamp
export const getFileName = (name: string): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month =
    (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${(date.getMonth() + 1).toString()}`
  const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate().toString()}`
  const timestamp = `${year}_${month}_${day}`
  return `${name}_${timestamp}.csv`
}
