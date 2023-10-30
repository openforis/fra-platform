import React from 'react'

import Select from 'client/components/Select'
import TextInput from 'client/components/TextInput'

export const Components: Record<string, React.FC<any>> = {
  text: (props) => (
    <TextInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => props.onChange(event.target.value)}
    />
  ),
  select: Select,

  // TODO: Placeholder
  multiselect: (props) => {
    return <div>{props.value.join(',')}</div>
  },
}
