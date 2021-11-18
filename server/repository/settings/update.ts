import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Settings } from '@core/meta/settings'

export const update = async (props: { settings: Settings }, client: BaseProtocol = DB): Promise<Settings> => {
  const { settings } = props

  return client.one<Settings>(
    `
        update public.settings set default_assessment_id = $1 returning *;
    `,
    [settings.defaultAssessmentId],
    Objects.camelize
  )
}
