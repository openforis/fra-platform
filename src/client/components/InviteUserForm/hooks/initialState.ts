import { useMemo } from 'react'

import { useLanguage } from 'client/hooks/useLanguage'
import { UserToInvite } from 'client/components/InviteUserForm/userToInvite'

export const useInitialState = (): UserToInvite => {
  const language = useLanguage()
  return useMemo(() => ({ name: '', surname: '', email: '', role: '', lang: language }), [language])
}
