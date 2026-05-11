import { Job } from 'bullmq'

import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'

import { VerifyLinksJobName } from 'server/worker/tasks/verifyLinks/jobNames'

export type VisitDescriptionLinksProps = {
  assessment: Assessment
  countryIso: CountryIso
  cycle: Cycle
  descriptionIds: Array<number>
}

export type VisitDescriptionLinksJob = Job<
  VisitDescriptionLinksProps,
  void,
  typeof VerifyLinksJobName.verifyDescriptionLinks
>
