import { nightable } from './colors';

export interface IAppTheme {
  pBackground: string,
  pText: string,
}

const night: IAppTheme = {
  pBackground: nightable.background.night,
  pText: nightable.text.night,
}

const day: IAppTheme = {
  pBackground: nightable.background.day,
  pText: nightable.text.day,
}

const party: IAppTheme = {
  pBackground: '#bada55',
  pText: 'tomato',
}

interface IThemePicker {
  [key:string]: IAppTheme;
}

export const themePicker: IThemePicker = {
  day,
  night,
  party
}
