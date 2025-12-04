import { Dates } from 'utils/dates'

type Props = {
  fileName: string
}

export const getFileName = (props: Props): string => {
  const { fileName } = props

  return `${fileName}_${Dates.format(new Date(), 'yyyy-MM-dd')}.csv`
}
