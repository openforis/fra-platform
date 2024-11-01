import './ActionsContainer.scss'
import React from 'react'

type ActionsContainerProps = React.PropsWithChildren

type Props = React.PropsWithChildren<ActionsContainerProps>

/*
  Wrapper component for actions column, used in UserInvitations and Users
 */
const ActionsContainer: React.FC<Props> = (props: Props) => {
  const { children } = props
  return <div className="actions-container">{children}</div>
}

export default ActionsContainer
