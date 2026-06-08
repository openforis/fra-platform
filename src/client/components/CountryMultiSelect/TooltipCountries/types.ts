import { TooltipProps } from 'client/components/CountryMultiSelect/hooks/useTooltipProps'
import { Props as CountryMultiSelectProps } from 'client/components/CountryMultiSelect/types'

export type PropsTooltipCountries = Pick<
  CountryMultiSelectProps,
  'allowAtlantis' | 'allowedCountries' | 'error' | 'isMulti' | 'value'
> &
  Pick<TooltipProps, 'canDisplayTooltip'> & {
    tooltipId: string
  }
