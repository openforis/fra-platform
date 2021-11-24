import './contactPersonsPrintView.less'
import React from 'react'
import { useSelector } from 'react-redux'
import * as R from 'ramda'
// @ts-ignore
import * as camelize from 'camelize'
import useI18n from '../../../hooks/useI18n'

const ContactPersonsPrintView = () => {
  const i18n = useI18n()
  const users = useSelector((state) => {
    return (state as any).userManagement.countryUsers.filter((u: any) => u.active)
  })
  return (
    <div className="contact-persons-print">
      <h2 className="headline">{(i18n as any).t('contactPersons.reportPreparationAndContactPersons')}</h2>
      <div className="fra-description__preview">{(i18n as any).t('contactPersons.contactPersonsSupport')}</div>

      {users && (
        <table className="fra-table">
          <thead>
            <tr>
              <th className="fra-table__header-cell">{(i18n as any).t('userManagement.name')}</th>
              <th className="fra-table__header-cell">{(i18n as any).t('editUser.role')}</th>
              <th className="fra-table__header-cell">{(i18n as any).t('userManagement.email')}</th>
              <th className="fra-table__header-cell">{(i18n as any).t('contactPersons.tables')}</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{user.name}</div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">
                    {(i18n as any).t(`user.roles.${camelize(user.role.toLowerCase())}`)}
                  </div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">{user.email}</div>
                </td>
                <td className="fra-table__cell-left">
                  <div className="text-input__readonly-view">
                    {user.tables && !R.isEmpty(user.tables) && user.tables[0].tableNo !== 'all'
                      ? user.tables.map(R.prop('tableNo')).join(', ')
                      : (i18n as any).t('contactPersons.all')}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default ContactPersonsPrintView
