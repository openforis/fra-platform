import './ContactPersons.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from '@core/utils'

import { SubSection } from '@meta/assessment'
import { CollaboratorProps, User, Users, UserStatus } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useAssessmentSections, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useUsers } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'

const ContactPersons = () => {
  const i18n = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const assessmentSections = useAssessmentSections()

  const assessmentSectionAnchors = assessmentSections
    .reduce((prev, curr) => [...prev, ...curr.subSections], [])
    .filter((subSection: SubSection) => subSection.props.anchor)
    .reduce((previous, subSection) => {
      return {
        ...previous,
        [subSection.uuid]: subSection.props.anchor,
      }
    }, {})

  const users = useUsers().filter(
    (user) =>
      user.status === UserStatus.active &&
      !Users.isReviewer(user, countryIso) &&
      user.roles?.[0]?.props?.sections !== 'none'
  )

  const getUserTableAnchors = (user: User) => {
    if (Users.isCollaborator(user, countryIso)) {
      const collaboratorProps: CollaboratorProps = user.roles?.[0]?.props
      const sections = collaboratorProps?.sections
      // if(sections === 'all')  return i18n.t<string>('contactPersons.all')
      if (!Objects.isEmpty(sections)) {
        return Object.keys(sections)
          .map((sectionUuid) => assessmentSectionAnchors[sectionUuid])
          .join(', ')
      }
    }
    return i18n.t<string>('contactPersons.all')
  }

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch])

  return (
    <div className="contact-persons-print">
      <h2 className="headline">{i18n.t<string>('contactPersons.reportPreparationAndContactPersons')}</h2>
      <div className="fra-description__preview">{i18n.t<string>('contactPersons.contactPersonsSupport')}</div>

      {users && (
        <table className="fra-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell">{i18n.t<string>('userManagement.name')}</th>
              <th className="fra-table__header-cell">{i18n.t<string>('editUser.role')}</th>
              <th className="fra-table__header-cell">{i18n.t<string>('userManagement.email')}</th>
              <th className="fra-table__header-cell">{i18n.t<string>('contactPersons.tables')}</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{user.name}</div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">
                    {i18n.t<string>(Users.getI18nRoleLabelKey(Users.getCountryRole(user, countryIso).role))}
                  </div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{user.email}</div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{getUserTableAnchors(user)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ContactPersons
