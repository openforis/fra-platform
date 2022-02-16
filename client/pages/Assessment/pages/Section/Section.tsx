import './Section.scss'

import React, { useEffect } from 'react'
import { useCountryIso } from '@client/hooks'
import { useAppDispatch } from '@client/store'
import { AssessmentSectionActions } from '@client/store/pages/assessmentSection'
import { useParams } from 'react-router'

import { useCurrentAssessmentSubSection } from '@client/store/assessment/hooks'
import { AssessmentName } from '@meta/assessment'
import { useTranslation } from 'react-i18next'
// import SectionHeader from './SectionHeader'
// import Descriptions from './Descriptions'
import Descriptions, { GeneralComments } from './components/Descriptions'
import Title from './components/Title'
import SectionHeader from './components/SectionHeader'

const Section: React.FC = () => {
  const currentAssessmentSubSection = useCurrentAssessmentSubSection()

  const { assessmentName, cycleName, section } =
    useParams<{ assessmentName: AssessmentName; cycleName: string; section: string }>()

  const { i18n } = useTranslation()

  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  // Update section tables' metadata on countryIso or section (url) change
  useEffect(() => {
    dispatch(AssessmentSectionActions.reset())
    dispatch(
      AssessmentSectionActions.getSectionMetadata({
        assessmentName,
        cycleName,
        section,
        countryIso,
      })
    )
  }, [countryIso, section])

  // // Update section tables' data on (countryIso ->) metadata change
  // useEffect(() => {
  //   dispatch(
  //     AssessmentSectionActions.getSectionData({
  //       assessmentName,
  //       cycleName,
  //       section,
  //       countryIso,
  //       tableNames: metaData?.map((table) => table.props.name),
  //     })
  //   )
  // }, [JSON.stringify(metaData)])

  if (!currentAssessmentSubSection) return null

  const { anchor, showTitle, descriptions, name: sectionName } = currentAssessmentSubSection.props

  const isSectionDisabled = true // TODO: useSelector(FraState.isSectionEditDisabled(sectionName))
  const panEuropean = assessmentName === AssessmentName.panEuropean
  const disabled = panEuropean || isSectionDisabled
  const [printView, printOnlyTablesView] = [false, false] // TODO: usePrintView()

  return (
    <div className={`app-view__content assessment-section__${sectionName}`}>
      {showTitle && printView && (
        <h2 className="title only-print">
          {`${printOnlyTablesView ? '' : `${anchor} `}${i18n.t(`${sectionName}.${sectionName}`)}`}
        </h2>
      )}

      <SectionHeader assessmentName={assessmentName} sectionName={sectionName} disabled={disabled} />

      {!panEuropean && <Descriptions sectionName={sectionName} descriptions={descriptions} disabled={disabled} />}

      {showTitle && <Title assessmentName={assessmentName} sectionName={sectionName} sectionAnchor={anchor} />}

      {/* {tableSections.map((tableSection, idx) => ( */}
      {/*  <div key={String(idx)}> */}
      {/*    {tableSection.titleKey && ( */}
      {/*      <h3 className="subhead assessment-section__table-title">{i18n.t(tableSection.titleKey)}</h3> */}
      {/*    )} */}
      {/*    {tableSection.descriptionKey && ( */}
      {/*      <div className="app-view__section-toolbar no-print"> */}
      {/*        <div className="support-text">{i18n.t(tableSection.descriptionKey)}</div> */}
      {/*      </div> */}
      {/*    )} */}

      {/*    {tableSection.tableSpecs.map((tableSpec) => ( */}
      {/*      <React.Fragment key={tableSpec.name}> */}
      {/*        <DataTable */}
      {/*          assessmentType={assessmentType} */}
      {/*          sectionName={sectionName} */}
      {/*          sectionAnchor={anchor} */}
      {/*          tableSpec={tableSpec} */}
      {/*          disabled={disabled} */}
      {/*        /> */}
      {/*        {tableSpec.print.pageBreakAfter && <div className="page-break" />} */}
      {/*      </React.Fragment> */}
      {/*    ))} */}
      {/*  </div> */}
      {/* ))} */}

      {descriptions.comments && <GeneralComments section={sectionName} disabled={disabled} />}

      <div className="page-break" />
    </div>
  )
}

export default Section
