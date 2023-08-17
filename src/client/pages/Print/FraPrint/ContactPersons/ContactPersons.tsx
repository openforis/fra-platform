import './ContactPersons.scss'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { SubSections } from 'meta/assessment'
import { CollaboratorPermissions, User, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useSections } from 'client/store/metadata'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useCountryIso } from 'client/hooks'

import { useContactPersons } from './hooks/useContactPersons'

const ContactPersons: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const sections = useSections()

  const sectionAnchors = SubSections.getAnchorsByUuid({ cycle, sections })

  const users = useContactPersons()

  const getUserTableAnchors = (user: User) => {
    if (Users.isCollaborator(user, countryIso, cycle)) {
      const permissions: CollaboratorPermissions = user.roles?.[0]?.props
      const sections = permissions?.sections
      if (!Objects.isEmpty(sections)) {
        return Object.keys(sections)
          .map((sectionUuid) => sectionAnchors[sectionUuid])
          .sort((a, b) => a.localeCompare(b))
          .join(', ')
      }
    }
    return t('contactPersons.all')
  }

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        print: true,
      })
    )
  }, [assessment.props.name, countryIso, cycle.name, dispatch])

  return (
    <div className="contact-persons-print">
      <h2 className="headline">{t('contactPersons.reportPreparationAndContactPersons')}</h2>
      <div className="fra-description__preview">{t('contactPersons.contactPersonsSupport')}</div>

      {users && (
        <table className="fra-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell">{t('userManagement.name')}</th>
              <th className="fra-table__header-cell">{t('editUser.role')}</th>
              <th className="fra-table__header-cell">{t('userManagement.email')}</th>
              <th className="fra-table__header-cell">{t('contactPersons.tables')}</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{Users.getFullName(user)}</div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">
                    {t(Users.getI18nRoleLabelKey(Users.getRole(user, countryIso, cycle).role))}
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

export default React.memo(ContactPersons)