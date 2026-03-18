import {ColourSettings, Theme} from "../../types/card-settings.ts";
import {v2StyleName} from "./constants.ts";

export const neonDarkColours: ColourSettings = {
  baseColours: {
    primaryColour: {
      baseColour: "#FFFFFF",
    },
    secondaryColour: {
      baseColour: "#FFFFFF"
    },
    backgroundColour: "#111111",
    textColourOnBackground: "pointer:primaryColour",
    textColourOnFadedPrimary: "pointer:primaryColour",
    textColourOnPrimary: "#FFFFFF",
    textColourOnFadedSecondary: "pointer:primaryColour",
    textColourOnSecondary: "#111111",
    keywordColour: {
      baseColour: "#22FFFF",
    },
    keywordTextColour: "#FFFFFF",
  },
  cardTypeColours: {
    "main action": { primaryColour: {baseColour: "#66ff66"}},
    "maneuver": { primaryColour: {baseColour: "#66b2ff"}},
    "triggered action": { primaryColour: {baseColour: "#ff6666"}},
    "move action": { primaryColour: {baseColour: "#ffb366"}},
    "free triggered action": { primaryColour: {baseColour: "#ff66b3"}},
    "free maneuver": { primaryColour: {baseColour: "#66ffb3"}},
    "no action": { primaryColour: {baseColour: "#6666ff"}},
    "free strike": { primaryColour: {baseColour: "#cccccc"}},
    "trait": { primaryColour: {baseColour: "#b366ff"}},
    "treasure": {
      primaryColour: {baseColour: "#eebd00"}
    }
  }
}

export const neonDark: Theme = {
  name: "DS Cards (Neon Dark)",
  id: "neonDark",
  cardDesign: v2StyleName,
  colourSettings: neonDarkColours
}

export const monochromeColours: ColourSettings = {
  baseColours: {
    primaryColour: {
      baseColour: "#333333",
    },
    secondaryColour: {
      baseColour: "#595959"
    },
    backgroundColour: "#ffffff",
    textColourOnBackground: "pointer:primaryColour",
    textColourOnFadedPrimary: "pointer:primaryColour",
    textColourOnPrimary: "pointer:backgroundColour",
    textColourOnFadedSecondary: "pointer:backgroundColour",
    textColourOnSecondary: "pointer:backgroundColour",
    keywordColour: {
      baseColour: "#595959",
    },
    keywordTextColour: "pointer:primaryColour",
  },
  cardTypeColours: {}
}

export const monochrome: Theme = {
  name: "DS Cards (Greyscale)",
  id: "monochrome",
  cardDesign: v2StyleName,
  colourSettings: monochromeColours
}
