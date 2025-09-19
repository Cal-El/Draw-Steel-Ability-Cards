import {CardStyleDetails, ColourSettings, Theme} from "../../types/card-settings.ts";

export const v2StyleName = "Draw Steel Ability Cards";
export const v2DefaultThemeId = "drawSteelAbilityCards";

export const v2StyleDetails : CardStyleDetails = {
  displayName: "Draw Steel Ability Cards",
  description: "This is the signature style for Draw Steel Ability Cards!",
  creatorName: "Callum Grier",
  creatorURL: "https://ko-fi.com/calgrier",
}

export const defaultColours: ColourSettings = {
  baseColours: {
    primaryColour: {
      baseColour: "#000000",
    },
    secondaryColour: {
      baseColour: "#E0B450"
    },
    backgroundColour: "#ffffff",
    textColourOnBackground: "pointer:primaryColour",
    textColourOnFadedPrimary: "pointer:primaryColour",
    textColourOnPrimary: "pointer:backgroundColour",
    textColourOnFadedSecondary: "pointer:primaryColour",
    textColourOnSecondary: "pointer:primaryColour",
    keywordColour: {
      baseColour: "#FED7AA",
    },
    keywordTextColour: "#555555",
  },
  cardTypeColours: {
    "main action": { primaryColour: {baseColour: "#367F36"}},
    "maneuver": { primaryColour: {baseColour: "#365B7F"}},
    "triggered action": { primaryColour: {baseColour: "#7F3636"}},
    "move action": { primaryColour: {baseColour: "#7F5A36"}},
    "free triggered action": { primaryColour: {baseColour: "#7f367f"}},
    "free maneuver": { primaryColour: {baseColour: "#367F5A"}},
    "no action": { primaryColour: {baseColour: "#36367F"}},
    "free strike": { primaryColour: {baseColour: "#595959"}},
    "trait": { primaryColour: {baseColour: "#5a367f"}},
    "treasure": {
      primaryColour: {baseColour: "#333333"},
    }
  }
}

export const defaultV2Theme: Theme = {
  name: v2StyleName,
  id: v2DefaultThemeId,
  cardDesign: v2StyleName,
  colourSettings: defaultColours
}
