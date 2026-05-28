import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { InvitationData } from 'meta/user/invitations/invitation'
import { UserRole } from 'meta/user/role/role'
import { User } from 'meta/user/user'

import Form from 'client/components/Form'
import Flex from 'client/components/Layout/Flex'
import { useOnFormAccept } from 'client/pages/Authentication/Invitation/Accept/FormAccept/hooks/useOnFormAccept'
import { EditUserRules } from 'client/pages/User/hooks/useEditUserRules'
import { useFormDefinition } from 'client/pages/User/hooks/useFormDefinition'
import { useValidationSchema } from 'client/pages/User/hooks/useValidationSchema'
import { Urls } from 'client/utils/urls'

type Props = {
  data: InvitationData
}

const FormAccept: React.FC<Props> = (props) => {
  const { data } = props
  const { t } = useTranslation()

  const onSuccess = useOnFormAccept()

  const editUserRules: EditUserRules = {
    emailDisabled: true,
    // allow user to select avatar while accepting invitation
    userDisabled: false,
  }

  const { countryIso, cycleUuid, role } = data.userInvitation

  // Create a "mock" role used for "mock" user
  const partialRole: Partial<UserRole> = { role, cycleUuid, countryIso }
  // Create a "mock" user with roles based on invitation
  const targetUser: User = { ...data.user, roles: [partialRole as UserRole] }

  const labels = { submit: t('login.acceptInvitation') }
  const formDefinition = useFormDefinition({ countryIso, editUserRules, labels, targetUser })
  const validationSchema = useValidationSchema()

  const action = Urls.withSearchParams(ApiEndPoint.User.invitationAccept(), {
    invitationUuid: data.userInvitation.uuid,
  })

  return (
    <Flex alignItems="stretch" className="user-form" flexDirection="column" gap="16">
      <Form
        action={action}
        formDefinition={formDefinition}
        hideCancel
        method="post"
        onSuccess={onSuccess}
        validationSchema={validationSchema}
      />
    </Flex>
  )
}

export default FormAccept
