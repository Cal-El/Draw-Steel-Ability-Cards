import {CardSettings, Theme} from "../../types/card-settings"
import {v2DefaultThemeId} from "../ability-card-v2/constants.ts";
import {getAllThemes, getAppliedTheme, getEmptySettings} from "../../utils/card-settings-utils.ts";

export const ThemesKey = "theme"

export type CardSettingsPersistenceModel = {
  appliedThemeId: string,
  customThemeIds: string[],
  variant?: 'useRoundedCorners' | 'useBleedCorners' | 'professionalPrint',
}

export function saveCardSettings(cardSettings: CardSettings){
  const saveObj : CardSettingsPersistenceModel = {
    appliedThemeId: cardSettings.appliedThemeId ?? v2DefaultThemeId,
    customThemeIds: cardSettings.customThemes.map(t => t.id),
    variant: cardSettings.variant,
  }
  localStorage.setItem(`${ThemesKey}-list`, JSON.stringify(saveObj))
  cardSettings.customThemes.forEach(saveTheme)
  return cardSettings;
}

export function getCardSettings(): CardSettings {
  const emptySettings = getEmptySettings();

  const data = localStorage.getItem(`${ThemesKey}-list`)
  let parsedSettings: CardSettingsPersistenceModel | undefined = undefined;
  if(data) {
    parsedSettings = JSON.parse(data ?? '');
  }
  if (!parsedSettings){
    saveCardSettings(emptySettings)
    return emptySettings;
  }
  const customThemes = parsedSettings.customThemeIds.map(getTheme).filter(t => t !== undefined);
  return {
    appliedThemeId: parsedSettings.appliedThemeId,
    appliedTheme: getAppliedTheme({appliedThemeId: parsedSettings.appliedThemeId, customThemes}),
    inbuiltThemes: emptySettings.inbuiltThemes,
    customThemes: customThemes,
    allThemes: getAllThemes({inbuiltThemes: emptySettings.inbuiltThemes, customThemes}),
    variant: parsedSettings.variant,
  } satisfies CardSettings
}

export function saveTheme(theme: Theme){
  localStorage.setItem(`${ThemesKey}-${theme.id}`, JSON.stringify(theme))
}

export function getTheme(themeId: string): Theme | undefined {
  const data = localStorage.getItem(`${ThemesKey}-${themeId}`)
  let parsedSettings: Theme | undefined = undefined;
  if(data) {
    parsedSettings = JSON.parse(data ?? '');
  }
  if (!parsedSettings){
    return undefined;
  }
  return parsedSettings satisfies Theme
}

export function deleteTheme(themeId: string){
  localStorage.removeItem(`${ThemesKey}-${themeId}`)
}
