import { languageTag } from './paraglide/runtime';

export function getLanguageNameInLocale(language: string, locale: string) {
  return new Intl.DisplayNames(locale, { type: 'language' }).of(language) ?? language;
}

export function getXenonymInCurrentLocale(language: string) {
  return getLanguageNameInLocale(language, languageTag() ?? 'en');
}

export const getAutonym = (language: string) => {
  return getLanguageNameInLocale(language, language);
};
