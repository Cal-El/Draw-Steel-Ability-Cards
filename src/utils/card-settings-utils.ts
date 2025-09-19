import {CardSettings, Theme} from "../types/card-settings.ts";
import {defaultV2Theme, v2DefaultThemeId} from "../components/ability-card-v2/constants.ts";
import {defaultV1Theme} from "../components/ability-card/constants.ts";

export const defaultThemeId: string = "drawSteelAbilityCards"
const inbuiltThemes: Theme[] = [
  defaultV2Theme,
  defaultV1Theme
]

export const getEmptySettings = () => {
  return {
    appliedThemeId: v2DefaultThemeId,
    appliedTheme: defaultV2Theme,
    inbuiltThemes: inbuiltThemes,
    customThemes: [],
    allThemes: getAllThemes({inbuiltThemes, customThemes: []})
  } satisfies CardSettings
}

export const getInbuiltThemes = () => {
  return [...inbuiltThemes]
}

export const getAllThemes = (state: { inbuiltThemes: Theme[], customThemes: Theme[] }) => {
  return state.inbuiltThemes.concat(...(state.customThemes ?? []))
}

export function getAppliedTheme(state: {
  appliedThemeId?: string
  customThemes: Theme[]
}): Theme {
  const theme = state.appliedThemeId ?? defaultThemeId
  if (inbuiltThemes.filter(x => x.id === theme).length > 0) {
   return inbuiltThemes.find(x => x.id === theme) ?? defaultV2Theme;
  }
  return state.customThemes.find(x => x.id === theme) ?? defaultV2Theme;
}
