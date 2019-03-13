import { nightable } from './colors';
import { fonts } from './fonts';
import { string } from 'prop-types';

export interface IAppTheme {
  font: string,
  fontLg: string,
  fontMd: string,
  fontSm: string,
  pBackground: string,
  pText: string,
  [key: string]: string,
}

const night: IAppTheme = {
  font: fonts.family.base,
  fontLg: fonts.sizes.lg,
  fontMd: fonts.sizes.md,
  fontSm: fonts.sizes.sm,
  pBackground: nightable.background.night,
  pText: nightable.text.night,
}

const day: IAppTheme = {
  font: fonts.family.base,
  fontLg: fonts.sizes.lg,
  fontMd: fonts.sizes.md,
  fontSm: fonts.sizes.sm,
  pBackground: nightable.background.day,
  pText: nightable.text.day,
}

interface IThemePicker {
  [key:string]: IAppTheme;
}

export const themePicker: IThemePicker = {
  day,
  night,
}
