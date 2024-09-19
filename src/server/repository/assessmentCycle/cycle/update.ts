import { Cycle, CycleProps } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  cycle: Cycle
}

const validateCycleProps = (cycle: Cycle): void => {
  const { props } = cycle
  const requiredFields: Array<keyof CycleProps> = ['status', 'dateCreated', 'dateDraft', 'dateEditing']
  requiredFields.forEach((field) => {
    if (!props[field as keyof CycleProps]) {
      throw new Error(`Missing required field: ${field}`)
    }
  })
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { cycle } = props

  validateCycleProps(cycle)

  return client.none(
    `
    update public.assessment_cycle
    set props = $2
    where uuid = $1
    `,
    [cycle.uuid, cycle.props]
  )
}
