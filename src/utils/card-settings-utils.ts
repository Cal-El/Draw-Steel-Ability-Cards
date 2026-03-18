import {CardSettings, CardStyleDetails, Theme} from "../types/card-settings.ts";
import {
  defaultV2Theme,
  v2DefaultThemeId,
  v2StyleDetails,
  v2StyleName
} from "../components/ability-card-v2/constants.ts";
import {defaultV1Theme, v1StyleDetails, v1StyleName} from "../components/ability-card/constants.ts";
import {monochrome, neonDark} from "../components/ability-card-v2/additional-themes.ts";

export const defaultThemeId: string = "drawSteelAbilityCards"
const coreStyleThemes: Theme[] = [
  defaultV1Theme,
  defaultV2Theme,
]
const inbuiltThemes: Theme[] = [...coreStyleThemes,
  neonDark,
  monochrome,
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

export function getCardStyleDetails(cardStyle: string) : CardStyleDetails | undefined {
  switch (cardStyle) {
    case v2StyleName: return v2StyleDetails;
    case v1StyleName: return v1StyleDetails;
    default: return undefined;
  }
}

export function getCardStylesAndPosition(appliedTheme: Theme) : { isInbuiltTheme: boolean, styles: string[], currentIdx: number } {
  const isInbuiltTheme = inbuiltThemes.findIndex(t => t.id === appliedTheme.id) !== -1;
  const styles = coreStyleThemes.map(t => t.cardDesign);
  const currentIdx = styles.findIndex(s => s === appliedTheme.cardDesign);
  return {isInbuiltTheme, styles, currentIdx}
}
