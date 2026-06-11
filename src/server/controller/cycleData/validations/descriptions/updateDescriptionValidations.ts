import { Country } from 'meta/area/country'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { DescriptionLinkSource } from 'server/worker/tasks/verifyLinks/visitDescriptionLinks/types'

import { updateDataSourceFieldValidations } from './updateDataSourceFieldValidations'
import { updateDescriptionLinkValidations } from './updateDescriptionLinkValidations'

type Props = {
  assessment: Assessment
  country: Country
  cycle: Cycle
  descriptions: Array<DescriptionLinkSource>
  notifyClients?: boolean
}

export const updateDescriptionValidations = async (props: Props): Promise<void> => {
  const { assessment, country, cycle, descriptions, notifyClients } = props

  await Promise.all([
    updateDescriptionLinkValidations({ assessment, country, cycle, descriptions, notifyClients }),
    updateDataSourceFieldValidations({ assessment, country, cycle, descriptions, notifyClients }),
  ])
}
