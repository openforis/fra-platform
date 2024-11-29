import './Actions.scss'
import React from 'react'

import Hr from 'client/components/Hr'

import { Props } from '../Props'
import { useActions } from './useActions'

const Actions: React.FC<Props> = (props: Props) => {
  const { user } = props

  const actions = useActions(props)

  return (
    <div className="home-user-actions">
      {actions.map(({ name, Component }, i) => {
        const isLast = i === actions.length - 1

        const base = `home-user-action-button`
        const key = `${base}-${name}`
        const keyHr = `${base}-hr`

        return (
          <React.Fragment key={key}>
            <Component user={user} />
            {!isLast && <Hr className={keyHr} />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default Actions
