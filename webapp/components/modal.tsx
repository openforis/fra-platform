import './modal.less'

import React from 'react'

import Icon from '@webapp/components/icon'

export const ModalClose = ({ children, onClose }: any) => (
  <div className="modal-close" onClick={() => onClose()}>
    <Icon name="remove" />
  </div>
)

export const ModalHeader = ({ children }: any) => <div className="modal-header">{children}</div>

export const ModalBody = ({ children }: any) => <div className="modal-body">{children}</div>

export const ModalFooter = ({ children }: any) => <div className="modal-footer">{children}</div>

export const Modal = ({ children, isOpen }: any) => (
  // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number'.
  <div className="modal" tabIndex="-1" role="dialog" style={{ display: isOpen ? 'block' : 'none' }}>
    <div className="modal-content">{children}</div>
  </div>
)
