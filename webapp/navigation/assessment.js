import React from 'react'
import * as R from 'ramda'
import { isAdministrator, roleForCountry } from '../../common/countryRole'
import { getAllowedStatusTransitions } from '../../common/assessment'

import { PopoverControl } from '../reusableUiComponents/popoverControl'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalClose } from '../reusableUiComponents/modal'
import Icon from '../reusableUiComponents/icon'
import { Link } from '../reusableUiComponents/link'
import { ReviewStatus, getLinkTo } from './navigationComponents'

const AssessmentSection = ({countryIso, item, assessment, i18n, ...props}) => {

  const sectionCollapsedClass = props.navigationGroupCollapseState[assessment][item.sectionNo]
    ? 'nav__section-items--visible'
    : 'nav__section-items--hidden'

  return <div className="nav__section">
    <div className="nav__section-header"
         onClick={() => props.toggleNavigationGroupCollapse(assessment, item.sectionNo)}>
      <div className="nav__section-order">{item.sectionNo}</div>
      <div className="nav__section-label">{i18n.t(item.label)}</div>
    </div>
    <div className={sectionCollapsedClass}>
      {
        R.map(child => {
          const linkTo = getLinkTo(child.pathTemplate, countryIso)

          return <Link
            key={child.tableNo}
            className={`nav__section-item ${R.equals(props.path, linkTo) ? 'selected' : ''}`}
            to={linkTo}>
            <div className='nav__section-order'>{child.tableNo}</div>
            <div className='nav__section-label'>{i18n.t(child.label)}</div>
            <div className="nav__section-status-content">
              <ReviewStatus status={props.getReviewStatus(child.section)}/>
            </div>
          </Link>
        }, item.children)
      }
    </div>
  </div>
}

class AssessmentHeader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {assessment, currentAssessment, countryIso, changeAssessment, userInfo, i18n} = this.props

    const currentAssessmentStatus = currentAssessment.status
    const allowedTransitions = getAllowedStatusTransitions(roleForCountry(countryIso, userInfo), currentAssessmentStatus)
    const possibleAssessmentStatuses = [
      {direction: 'next', transition: allowedTransitions.next},
      {direction: 'previous', transition: allowedTransitions.previous}
    ]

    const deskStudyItems = [{
      divider: true
    }, {
      content: <div className="popover-control__checkbox-container">
        <span
          style={{marginRight: '8px'}}
          className={`fra-checkbox ${currentAssessment.deskStudy ? 'checked' : ''}`}
        >
        </span>
        <span>{i18n.t('assessment.deskStudy')}</span>
      </div>,
      onClick: () => changeAssessment(countryIso, {...currentAssessment, deskStudy: !currentAssessment.deskStudy})
    }]

    const popoverItems = currentAssessmentStatus === 'changing'
      ? []
      : R.pipe(
        R.filter(R.prop('transition')),
        R.map(targetStatus => ({
          content: i18n.t(`assessment.status.${targetStatus.transition}.${targetStatus.direction}`),
          onClick: () => this.setState({assessmentChanging: {targetStatus}})
        })),
        items => isAdministrator(userInfo)
          ? R.flatten(R.append(deskStudyItems, items))
          : items
      )(possibleAssessmentStatuses)

    const closeModal = () => this.setState({assessmentChanging: null})

    return <div className="nav__assessment-header">
      {R.isNil(R.prop('assessmentChanging', this.state))
        ? null
        : <Modal isOpen="true">
          <ModalHeader>
            <div className="modal-header-center">
              {i18n.t(`assessment.status.${R.path(['assessmentChanging', 'targetStatus', 'transition'], this.state)}.${R.path(['assessmentChanging', 'targetStatus', 'direction'], this.state)}`)}
            </div>
            <ModalClose onClose={closeModal}/>
          </ModalHeader>
          <ModalBody>
            <div style={{height: '160px'}}>
              <textarea
                className="assessment__comment"
                placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
                ref="messageTextarea"
                value={R.path(['assessmentChanging', 'message'], this.state)}
                onChange={e => this.setState(R.assocPath(['assessmentChanging', 'message'], e.target.value, this.state))}
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-secondary modal-footer__item"
                    onClick={closeModal}>
              {i18n.t('navigation.cancel')}
            </button>
            <button className="btn btn-primary modal-footer__item"
                    onClick={() => {
                      changeAssessment(countryIso, {
                        ...currentAssessment,
                        status: this.state.assessmentChanging.targetStatus.transition,
                        message: this.state.assessmentChanging.message
                      })
                      closeModal()
                    }}>
              {i18n.t('navigation.submit')}
            </button>
          </ModalFooter>
        </Modal>
      }
      <div className="nav__assessment-label">
        {
          currentAssessment.deskStudy
            ? `${i18n.t('assessment.' + assessment)} (${i18n.t('assessment.deskStudy')})`
            : i18n.t('assessment.' + assessment)
        }
      </div>

      <PopoverControl items={popoverItems}>
        <div
          className={`nav__assessment-status status-${currentAssessmentStatus} actionable-${!R.isEmpty(popoverItems)}`}>
          <span>{i18n.t(`assessment.status.${currentAssessmentStatus}.label`)}</span>
          {
            !R.isEmpty(popoverItems)
              ? <Icon className="icon-white icon-middle" name="small-down"/>
              : null
          }
        </div>
      </PopoverControl>

      <button
        className="btn-s nav__assessment-toggle"
        onClick={() => this.props.toggleAllNavigationGroupsCollapse()}>
        {
          this.props.lastUncollapseState
            ? i18n.t('navigation.hideAll')
            : i18n.t('navigation.showAll')
        }
      </button>
    </div>
  }
}

const Assessment = (props) => {
  const {assessment, countryIso, sections, i18n, status} = props
  const currentAssessment = R.path([assessment], status)

  return <div className="nav__assessment">
    {
      currentAssessment
        ? <AssessmentHeader currentAssessment={currentAssessment} {...props} />
        : null
    }
    {
      R.map(item =>
          <AssessmentSection
            key={item.label}
            countryIso={countryIso}
            item={item}
            assessment={assessment}
            i18n={i18n}
            {...props}
          />
        , sections)
    }
  </div>
}

export default Assessment





