import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/contact'
import { NodeExtType } from 'meta/nodeExt'
import { RoleName } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Array<Contact>> => {
  const { assessment, cycle, countryIso } = props

  return client.tx(async (t) => {
    // TODO: Add prefill data from public.users
    const prefill: Array<Contact> = [
      {
        id: 1,
        uuid: 'foo-bar-1',
        countryIso: 'X01',
        props: {
          rowIndex: 1,
          readOnly: true,
        },
        value: {
          role: RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
          appellation: 'mr',
          name: 'Read',
          surname: 'Only',
          institution: 'Ministry of Health',
          contributions: ['1a', '1b'],
        },
      },
      {
        id: 2,
        uuid: 'foo-bar-2',
        countryIso: 'X01',
        props: {
          rowIndex: 0,
          readOnly: true,
        },
        value: {
          role: RoleName.NATIONAL_CORRESPONDENT,
          appellation: 'ms',
          name: 'Read',
          surname: 'Onla',
          institution: 'Ministry of Health',
          contributions: ['2a'],
        },
      },
    ]

    const contacts = await NodeExtRepository.getMany<Contact>(
      { assessment, cycle, countryIso, type: NodeExtType.contact },
      t
    )

    return [...prefill, ...contacts]
  })
}
