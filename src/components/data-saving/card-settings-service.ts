import {CardSettings, Theme} from "../../types/card-settings"
import {v2DefaultThemeId} from "../ability-card-v2/constants.ts";

export const ThemesKey = "theme"

export type CardSettingsPersistenceModel = {
  appliedThemeId: string,
  customThemeIds: string[],
}

export function saveCardSettings(cardSettings: CardSettings){
  const saveObj : CardSettingsPersistenceModel = {
    appliedThemeId: cardSettings.appliedTheme ?? v2DefaultThemeId,
    customThemeIds: cardSettings.customThemes.map(t => t.id)
  }
  localStorage.setItem(`${ThemesKey}-list`, JSON.stringify(saveObj))
  cardSettings.customThemes.forEach(saveTheme)
  return cardSettings;
}

export function getCardSettings(): CardSettings {
  const data = localStorage.getItem(`${ThemesKey}-list`)
  let parsedSettings: CardSettingsPersistenceModel | undefined = undefined;
  if(data) {
    parsedSettings = JSON.parse(data ?? '');
  }
  if (!parsedSettings){
    const emptySettings = { appliedTheme: v2DefaultThemeId, customThemes: [] };
    saveCardSettings(emptySettings)
    return emptySettings;
  }
  return {
    appliedTheme: parsedSettings.appliedThemeId,
    customThemes: parsedSettings.customThemeIds.map(getTheme).filter(t => t !== undefined)
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
