import { Assessment, AssessmentMetaCache, Cycle } from 'meta/assessment'

import { BaseProtocol, DB } from 'server/db'

type Props = {
  assessment: Assessment
  cycle: Cycle
}

export const getMetaCache = async (props: Props, client: BaseProtocol = DB): Promise<AssessmentMetaCache> => {
  const { assessment, cycle } = props

  return client.one<AssessmentMetaCache>(
    `
        select jsonb_extract_path(a.meta_cache, '${cycle.uuid}') as res
        from public.assessment a
        where a.id = $1;
    `,
    [assessment.id],
    ({ res }) => res
  )
}
