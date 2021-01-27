import './header.less'

import React from 'react'
import { Link } from 'react-router-dom'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import * as Assessment from '@common/assessment/assessment'
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { Area } from '@common/country'
import * as BasePaths from '@webapp/main/basePaths'

import Icon from '@webapp/components/icon'
import { useCountryIso, useUserInfo } from '@webapp/components/hooks'

import Title from './title'
import Status from './status'
import ToggleAllButton from './buttonToggleAll'

type Props = {
  assessment: any
  showSections: boolean
  setShowSections: (...args: any[]) => any
}

const Header = (props: Props) => {
  const { assessment, showSections, setShowSections } = props

  const assessmentType = Assessment.getType(assessment)
  const countryIso = useCountryIso()
  const userInfo = useUserInfo()

  const isCountry = Area.isISOCountry(countryIso)
  const isFRA = Assessment.isTypeFRA(assessmentType)

  return (
    <div className="nav-assessment-header">
      <div className="nav-assessment-header__label">
        <Title assessment={assessment} lockEnabled={Boolean(userInfo && isFRA && isCountry)} />

        {isFRA && isCountry && (
          <div className="links-download">
            <Link
              className="btn-s btn-secondary"
              to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType, true)}
              target="_blank"
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element[]; className: string; to... Remove this comment to see the full error message
              alt=""
            >
              {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; className: string; }' is not... Remove this comment to see the full error message */}
              <Icon name="small-print" className="icon-margin-left" />
              {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; className: string; }' is not... Remove this comment to see the full error message */}
              <Icon name="icon-table2" className="icon-no-margin" />
            </Link>

            <Link
              className="btn-s btn-secondary"
              to={BasePaths.getAssessmentPrintLink(countryIso, assessmentType)}
              target="_blank"
              // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; className: string; to: ... Remove this comment to see the full error message
              alt=""
            >
              {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; className: string; }' is not... Remove this comment to see the full error message */}
              <Icon name="small-print" className="icon-no-margin" />
            </Link>
          </div>
        )}
      </div>

      <div className="nav-assessment-header__status-container">
        {isFRA && isCountry ? <Status assessment={assessment} /> : <div />}
        <ToggleAllButton showSections={showSections} setShowSections={setShowSections} />
      </div>
    </div>
  )
}

export default Header
