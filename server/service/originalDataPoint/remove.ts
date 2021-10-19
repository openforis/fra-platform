import { OriginalDataPointRepository } from '@server/repository/originalDataPoint'

export const remove = async (props: { id: string }): Promise<string> => {
  const { id } = props
  const odp = await OriginalDataPointRepository.remove({ id })
  return odp
}
