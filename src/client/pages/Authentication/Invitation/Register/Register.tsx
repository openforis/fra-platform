import React from 'react'
import { useParams } from 'react-router'

// Todo - new user accepting invitation
const Register: React.FC = () => {
  const { invitationUuid } = useParams<{ invitationUuid: string }>()

  return (
    <div className="login-form">
      <p>{invitationUuid}</p>
      <button>With FRA</button>
      <button>With Google</button>
    </div>
  )
}

export default Register
