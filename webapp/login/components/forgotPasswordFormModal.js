import React from 'react'
import { connect } from 'react-redux'

import { Modal, ModalBody } from '../../reusableUiComponents/modal'

class ForgotPasswordFormModal extends React.Component {

  render () {

    const {onClose, email = ''} = this.props

    return <Modal isOpen="true">

      <ModalBody>
        <div className="login__box" style={{border: 0, boxShadow: 'none'}}>

          <div className="login__top">
            <h3>Enter your email and submit the form.<br/>
              Your will receive and email with instructions
            </h3>

            <div className="login__form">
              <input type="text" ref="email" value={email} placeholder="Email"/>
            </div>

            <div className="login__buttons">
              <button className="btn"
                      onClick={onClose}>
                Cancel
              </button>
              <button className="btn"
                      onClick={() => {

                      }}>
                Submit
              </button>
            </div>

          </div>
        </div>
      </ModalBody>

    </Modal>
  }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(ForgotPasswordFormModal)
