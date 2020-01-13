import React from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'

export const NewVersionForm = (props) => {
  const { onSubmit, onChange, i18n } = props;
  const { countryIso } = useParams()
  const history = useHistory();
  const goBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  const onFormSubmit = (e) => {   
    // Prevent <form> element doing page refresh on submit
    e.preventDefault();
    onSubmit()
    const url = `/country/${countryIso}/admin/versioning/`;
    history.push(url)
  }

  const minDate = format(new Date(),
    'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });
  const maxDate = format(new Date(new Date().getUTCFullYear() + 2 + ''),
    'yyyy-MM-ddThh:mm', { awareOfUnicodeTokens: true });

  return <div className="new-version__container">
    <form onSubmit={onFormSubmit}>
      <h3 className="new-version__title">{i18n.t('landing.versioning.form.newVersion')}</h3>
      <label className="new-version__label">{i18n.t('landing.versioning.form.version')}</label><br />
      <input className="new-version__input" onChange={onChange} placeholder="Ex. 1.0.0" type="text" name="version" /> <br />
      <label className="new-version__label">{i18n.t('landing.versioning.form.Date')}</label><br />
      <input className="new-version__input" min={minDate} max={maxDate} onChange={onChange} type="datetime-local" name="timestamp" /> <br />
      <div className="new-version__button-container">
        <button className="btn btn-secondary" onClick={goBack}>{i18n.t('landing.versioning.form.cancel')}</button>
        <input className="btn btn-primary" type="submit" />
      </div>

    </form>
  </div>
    ;
};

// <div className="add-user__container">
// {
//   invalidForm &&
//   <div className="add-user__error-container">
//     {i18n.t('userManagement.formErrors')}
//   </div>
// }

// <table className="add-user__table">
//   <thead>
//     <tr>
//       <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
//       <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
//       <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <UserTextFieldCol countryIso={countryIso}
//         i18n={i18n}
//         user={user}
//         field="name" editing={true}
//         updateUser={updateNewUser}
//         validate={adding ? validField(user, 'name') : true} />
//       <UserRoleSelectCol
//         {...props}
//         field="role"
//         editing={true}
//         updateUser={updateNewUser}
//         validate={adding ? validField(user, 'role') : true} />
//       <UserTextFieldCol countryIso={countryIso}
//         i18n={i18n}
//         user={user}
//         field="email" editing={true}
//         updateUser={updateNewUser}
//         validate={adding ? validField(user, 'email') : true} />
//       <td style={{ padding: 0 }}>
//         <button className="btn btn-primary" onClick={() => {
//           setAdding(true)
//           addNewUser(countryIso)
//           setAdding(false)
//         }}>
//           {i18n.t('userManagement.addUser')}
//         </button>
//       </td>
//     </tr>
//   </tbody>
// </table>
// </div>
