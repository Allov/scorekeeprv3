import { nightable } from './colors';
import { fonts } from './fonts';

export interface IAppTheme {
  font: string,
  fontLg: string,
  fontMd: string,
  fontSm: string,
  pBackground: string,
  pText: string,
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

const party: IAppTheme = {
  font: fonts.family.base,
  fontLg: fonts.sizes.lg,
  fontMd: fonts.sizes.md,
  fontSm: fonts.sizes.sm,
  pBackground: '#bada55',
  pText: 'tomato',
}

export const themePicker = {
  day,
  night,
  party
}