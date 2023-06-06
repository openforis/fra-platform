import './Modal.scss'
import React from 'react'

import Icon from 'client/components/Icon'

type PropsChildren = {
  children: React.ReactNode | React.ReactNode[]
}

export const ModalClose: React.FC<{ onClose(): void }> = ({ onClose }) => (
  <div className="modal-close" onClick={onClose} onKeyDown={onClose} role="button" tabIndex={0}>
    <Icon name="remove" />
  </div>
)

export const ModalHeader: React.FC<PropsChildren> = ({ children }) => (
  <div className="modal-header">{React.Children.toArray(children)}</div>
)

export const ModalBody: React.FC<PropsChildren> = ({ children }) => (
  <div className="modal-body">{React.Children.toArray(children)}</div>
)

export const ModalFooter: React.FC<PropsChildren> = ({ children }) => (
  <div className="modal-footer">{React.Children.toArray(children)}</div>
)

type Props = {
  className?: string
  isOpen?: boolean
  children: React.ReactNode | React.ReactNode[]
}

export const Modal: React.FC<Props> = ({ children, isOpen, className = '' }: any) => {
  if (!isOpen) return null
  return (
    <div className={`modal ${className}`} tabIndex={-1} role="dialog">
      <div className="modal-content">{React.Children.toArray(children)}</div>
    </div>
  )
}

export default Modal
