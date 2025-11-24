import './Modal.scss'
import React, { PropsWithChildren } from 'react'

import classNames from 'classnames'

import Icon from 'client/components/Icon'

type PropsChildren = PropsWithChildren<{ className?: string }>

export const ModalClose: React.FC<{ onClose(): void }> = ({ onClose }) => (
  <div className="modal-close" onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
    <Icon name="remove" />
  </div>
)

export const ModalHeader: React.FC<PropsChildren> = ({ children, className }) => (
  <div className={classNames(`modal-header`, className)}>{React.Children.toArray(children)}</div>
)

export const ModalBody: React.FC<PropsChildren> = ({ children, className }) => (
  <div className={classNames(`modal-body`, className)}>{React.Children.toArray(children)}</div>
)

export const ModalFooter: React.FC<PropsChildren> = ({ children, className }) => (
  <div className={classNames(`modal-footer`, className)}>{React.Children.toArray(children)}</div>
)

type Props = PropsChildren & {
  isOpen?: boolean
}

export const Modal: React.FC<Props> = ({ children, className = '', isOpen }: any) => {
  if (!isOpen) return null
  return (
    <div className={classNames(`modal`, className)} role="dialog" tabIndex={-1}>
      <div className="modal-content">{React.Children.toArray(children)}</div>
    </div>
  )
}

export default Modal
