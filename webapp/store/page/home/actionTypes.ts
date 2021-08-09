import { Action } from 'redux'

export enum HomeActionType {
  countriesFilterUpdate = 'home/countriesFileter/update',
}

export interface HomeCountriesFilterActions extends Action<HomeActionType.countriesFilterUpdate> {
  countries: Array<string>
}
