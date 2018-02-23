import './editUserForm.less'

import React from 'react'
import { connect } from 'react-redux'

import TextInput from '../../reusableUiComponents/textInput'

class EditUserForm extends React.Component {

  render () {
    const {i18n} = this.props

    return <div className="edit-user__form-container">

      <div className="edit-user__form-item-picture">
        <div className="edit-user__form-label"></div>
        <div className="edit-user__form-field">
          <img src={'/img/avatar.png'} className="edit-user__picture-img"/>
          <button className="btn btn-primary btn-xs">
            {i18n.t('editUser.chooseProfilePicture')}
          </button>
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.name')}
        </div>
        <div className="edit-user__form-field">
          <TextInput

          />
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.email')}
        </div>
        <div className="edit-user__form-field">
          <TextInput

          />
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.loginEmail')}
        </div>
        <div className="edit-user__form-field">
          <TextInput

          />
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.institution')}
        </div>
        <div className="edit-user__form-field">
          <TextInput

          />
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.position')}
        </div>
        <div className="edit-user__form-field">
          <TextInput

          />
        </div>
      </div>

      <div className="edit-user__form-item">
        <div className="edit-user__form-label">
          {i18n.t('editUser.role')}
        </div>
        <div className="edit-user__form-field">
        </div>
      </div>

    </div>

  }
}

const mapStateToProps = (state, props) => ({
  i18n: state.user.i18n,
  sessionUser: state.user.userInfo
})

export default connect(mapStateToProps)(EditUserForm)
