export interface Home {
  selectedCountries: string[]
}

export interface Ui {
  home: Home
}

export interface RootObject {
  ui: Ui
}
