import { FieldValues } from 'react-hook-form'

import { FieldProps } from 'client/components/Form/FormFields/types'

export type PropsWatch = Omit<FieldProps, 'watch'> & { values: FieldValues }
