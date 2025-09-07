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
      baseColour: "#fed7aa",
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
      primaryColour: {baseColour: "#eebd00", opacityFalloff: 1.1},
      backgroundColour: '#333333',
      textColourOnPrimary: "pointer:textColourOnFadedPrimary",
      textColourOnFadedPrimary: "#FFFFFF",
      textColourOnBackground: 'pointer:primaryColour-100',
      keywordTextColour: "pointer:textColourOnPrimary",
    }
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

export function getKeywordColor(cardType: string, userColourSettings: ColourSettings, gradientValue: number = 100): string {
  return ColorCalculator.getKeywordColor(cardType, userColourSettings, defaultColours, gradientValue);
}

export function getKeywordTextColor(cardType: string, userColourSettings: ColourSettings): string {
  console.log(cardType, userColourSettings, defaultColours)
  return ColorCalculator.getKeywordTextColor(cardType, userColourSettings, defaultColours);
}

export function getBackgroundColor(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getBackgroundColor(cardType, userColourSettings, defaultColours);
}
