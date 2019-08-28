import React from 'react'
import { connect } from 'react-redux'

import * as R from 'ramda'
import { isAdministrator } from '../../../common/countryRole'
import { getAllowedStatusTransitions } from '../../../common/assessment'

import { PopoverControl } from '../../reusableUiComponents/popoverControl'
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalClose } from '../../reusableUiComponents/modal'
import Icon from '../../reusableUiComponents/icon'
import { Link } from '../../reusableUiComponents/link'
import { ReviewStatus, getLinkTo } from './navigationComponents'

import { canToggleAssessmentLock, isAssessmentLocked } from '../../utils/assessmentAccess'

import { toggleAssessmentLock } from '../actions'

const AssessmentSection = ({countryIso, item, assessment, i18n, ...props}) => {

  const isSectionExpanded = props.navigationGroupCollapseState[assessment.type][item.sectionNo]

  const getChildStatus = () => R.pipe(
    R.map(child => props.getReviewStatus(child.section)),
    // filtering all opened statuses
    R.reject(status => status.issuesCount === 0 || status.issueStatus !== 'opened'),
    // checking if there's an open status with unread issues
    R.or(R.find(R.propEq('hasUnreadIssues'), true), R.head),
    R.defaultTo({})
  )(item.children)

  return <div className="nav__section">
    <div className="nav__section-header"
         onClick={() => props.toggleNavigationGroupCollapse(assessment.type, item.sectionNo)}>
      <div className="nav__section-order">{item.sectionNo}</div>
      <div className="nav__section-label">{i18n.t(item.label)}</div>
      {isSectionExpanded
        ? null
        : <div className="nav__section-status-content">
          <ReviewStatus status={getChildStatus()}/>
        </div>
      }
    </div>
    <div className={isSectionExpanded ? 'nav__section-items--visible' : 'nav__section-items--hidden'}>
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

class AssessmentChangeStatusConfirmationModal extends React.Component {

  constructor (props) {
    super(props)
    this.state = {notifyUsers: true}
  }

  render () {
    const {countryIso, i18n, userInfo, assessment, targetStatus, changeAssessment, onClose} = this.props

    return <Modal isOpen="true">
      <ModalHeader>
        <div className="modal-header-center">
          {i18n.t(`assessment.status.${R.prop('transition', targetStatus)}.${R.prop('direction', targetStatus)}`)}
        </div>
        <ModalClose onClose={onClose}/>
      </ModalHeader>
      <ModalBody>
        <div style={{height: '160px'}}>
            <textarea
              className="nav__assessment-comment"
              placeholder={i18n.t('navigation.changeStatusTextPlaceholder')}
              ref="messageTextarea"
            />
        </div>
        { //administrator can disable email notification
          isAdministrator(userInfo)
            ? <div className="nav__assessment-notify-users"
                   onClick={() => this.setState({notifyUsers: !this.state.notifyUsers})}>
              <div className={`fra-checkbox${this.state.notifyUsers ? '' : ' checked'}`}></div>
              {i18n.t('navigation.doNotNotifyUsers')}
            </div>
            : null
        }
      </ModalBody>
      <ModalFooter>
        <button className="btn btn-secondary modal-footer__item"
                onClick={onClose}>
          {i18n.t('navigation.cancel')}
        </button>
        <button className="btn btn-primary modal-footer__item"
                onClick={() => {
                  changeAssessment(
                    countryIso,
                    {
                      ...assessment,
                      status: targetStatus.transition,
                      message: this.refs.messageTextarea.value
                    },
                    this.state.notifyUsers
                  )
                  onClose()
                }}>
          {i18n.t('navigation.submit')}
        </button>
      </ModalFooter>
    </Modal>
  }
}

class AssessmentHeader extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {assessment, countryIso, changeAssessment, userInfo, i18n, isLocked, canToggleLock, toggleAssessmentLock} = this.props
    const assessmentStatus = assessment.status

    const allowedTransitions = getAllowedStatusTransitions(countryIso, userInfo, assessmentStatus)
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
          className={`fra-checkbox ${assessment.deskStudy ? 'checked' : ''}`}
        >
        </span>
        <span>{i18n.t('assessment.deskStudy')}</span>
      </div>,
      onClick: () => changeAssessment(countryIso, {...assessment, deskStudy: !assessment.deskStudy})
    }]

    const popoverItems = assessmentStatus === 'changing'
      ? []
      : R.pipe(
        R.filter(R.prop('transition')),
        R.map(targetStatus => ({
          content: i18n.t(`assessment.status.${targetStatus.transition}.${targetStatus.direction}`),
          onClick: () => this.setState({targetStatus})
        })),
        //adding desk study option if user is administrator
        items => isAdministrator(userInfo)
          ? R.flatten(R.append(deskStudyItems, items))
          : items
      )(possibleAssessmentStatuses)

    return <div className="nav__assessment-header">

      { // showing confirmation modal dialog before submitting the status change
        R.isNil(R.prop('targetStatus', this.state))
          ? null
          : <AssessmentChangeStatusConfirmationModal
            countryIso={countryIso}
            i18n={i18n}
            assessment={assessment}
            targetStatus={R.prop('targetStatus', this.state)}
            changeAssessment={changeAssessment}
            userInfo={userInfo}
            onClose={() => this.setState({targetStatus: null})}
          />
      }

      <div className="nav__assessment-label">
        <div className="nav__assessment-lock">
          {
            assessment.deskStudy
              ? `${i18n.t('assessment.' + assessment.type)} (${i18n.t('assessment.deskStudy')})`
              : i18n.t('assessment.' + assessment.type)
          }
          <button className="btn-s btn-secondary nav__assessment-btn-lock"
                  disabled={!canToggleLock}
                  onClick={() => toggleAssessmentLock(assessment.type)}>
            <Icon name={isLocked ? 'lock-circle' : 'lock-circle-open'} className="icon-no-margin"/>
          </button>
        </div>
        <Link className="btn-s btn-secondary" to={`/country/${countryIso}/print/${assessment.type}?onlyTables=true`} target="_blank">
          <Icon name="small-print" className="icon-margin-left" />
          <Icon name="icon-table2" className="icon-no-margin"/>
        </Link>
        <Link className="btn-s btn-secondary" to={`/country/${countryIso}/print/${assessment.type}`} target="_blank">
          <Icon name="small-print" className="icon-no-margin"/>
        </Link>
      </div>

      <PopoverControl items={popoverItems}>
        <div
          className={`nav__assessment-status status-${assessmentStatus} actionable-${!R.isEmpty(popoverItems)}`}>
          <span>{i18n.t(`assessment.status.${assessmentStatus}.label`)}</span>
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
  const {assessment, sections} = props

  return <div className="nav__assessment">
    {
      assessment
        ? <AssessmentHeader {...props} />
        : null
    }
    {
      R.map(item =>
          <AssessmentSection
            key={item.label}
            item={item}
            {...props}
          />
        , sections)
    }
  </div>
}

const mapStateToProps = (state, props) => {
  const {assessment} = props

  return assessment
    ? {
      isLocked: isAssessmentLocked(state, R.prop('type', assessment)),
      canToggleLock: canToggleAssessmentLock(state, R.prop('type', assessment))
    }
    : {}
}

export default connect(mapStateToProps, {toggleAssessmentLock})(Assessment)





