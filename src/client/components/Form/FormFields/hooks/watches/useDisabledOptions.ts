import { useRef, useState } from 'react'

import { Arrays } from 'utils/arrays'

import { useOnUpdate } from 'client/hooks/onUpdate'

import { PropsWatch } from './types'

// getDisabledOptions: Returns options to disabled
export const useDisabledOptions = (props: PropsWatch): Array<string> => {
  const { fieldDefinition, values } = props
  const { watches = {} } = fieldDefinition
  const { getDisabledOptions } = watches

  const [disabledOptions, setDisabledOptions] = useState<Array<string>>([])
  const disabledOptionsRef = useRef<Array<string>>(disabledOptions)

  useOnUpdate(() => {
    disabledOptionsRef.current = disabledOptions
  }, [disabledOptions])

  useOnUpdate(() => {
    if (!getDisabledOptions) return

    const disabledOptionsUpdate = getDisabledOptions({ values })
    const difference = Arrays.difference(disabledOptionsUpdate, disabledOptionsRef.current)
    const difference1 = Arrays.difference(disabledOptionsRef.current, disabledOptionsUpdate)

    if (difference.length > 0 || difference1.length > 0) {
      setDisabledOptions(disabledOptionsUpdate)
    }
  }, [getDisabledOptions, values])

  return disabledOptions
}
