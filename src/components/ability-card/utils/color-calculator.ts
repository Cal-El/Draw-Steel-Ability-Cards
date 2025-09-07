import { ColourSettings } from "../../../types/card-settings";
import {ColorCalculator} from "../../../utils/color-calculator.ts";

export const defaultColours: ColourSettings = {
  baseColours: {
    primaryColour: {
      baseColour: "#000000",
    },
    backgroundColour: "#ffffff",
    textColourOnBackground: "pointer:primaryColour",
    textColourOnFadedPrimary: "pointer:primaryColour",
    textColourOnPrimary: "pointer:backgroundColour",
    keywordColour: {
      baseColour: "#b87f47",
    },
    keywordTextColour: "pointer:textColourOnPrimary",
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
    "treasure": { primaryColour: {baseColour: "#333333"}}
  }
}

export function getPrimaryColor(cardType: string, userColourSettings: ColourSettings, gradientValue: number = 100): string {
  return ColorCalculator.getPrimaryColor(cardType, userColourSettings, defaultColours, gradientValue);
}

export function getTextColourOnPrimary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnPrimary(cardType, userColourSettings, defaultColours);
}

export function getTextColourOnFadedPrimary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnFadedPrimary(cardType, userColourSettings, defaultColours);
}

export function getTextColourOnBackground(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnBackground(cardType, userColourSettings, defaultColours);
}

export function getDynamicColorBase(cardType: string, userColourSettings: ColourSettings): string {
  return getPrimaryColor(cardType, userColourSettings, 100)
}

export function getDynamicColor50(cardType: string, userColourSettings: ColourSettings): string {
  return getPrimaryColor(cardType, userColourSettings, 50)
}

export function getDynamicColor40(cardType: string, userColourSettings: ColourSettings): string {
  return getPrimaryColor(cardType, userColourSettings, 40)
}

export function getDynamicColor30(cardType: string, userColourSettings: ColourSettings): string {
  return getPrimaryColor(cardType, userColourSettings, 30)
}

export function getDynamicColor20(cardType: string, userColourSettings: ColourSettings): string {
  return getPrimaryColor(cardType, userColourSettings, 20)
}

export function getKeywordColor(cardType: string, userColourSettings: ColourSettings, gradientValue: number = 100): string {
  return ColorCalculator.getKeywordColor(cardType, userColourSettings, defaultColours, gradientValue);
}

export function getKeywordTextColor(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getKeywordTextColor(cardType, userColourSettings, defaultColours);
}

export function getBackgroundColor(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getBackgroundColor(cardType, userColourSettings, defaultColours);
}
