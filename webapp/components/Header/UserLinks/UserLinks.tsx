import React from 'react'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Fra from '@common/assessment/fra'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as PanEuropean from '@common/assessment/panEuropean'

import AssessmentComponent from '@webapp/components/AssessmentComponent'

import LinksFRA from './LinksFRA'

const LinksPlaceholder = () => <div />

const Components = {
  [Fra.type]: LinksFRA,
  [PanEuropean.type]: LinksPlaceholder,
  null: LinksPlaceholder,
}

const UserLinks = () => <AssessmentComponent components={Components} />

export default UserLinks
