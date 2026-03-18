import { ColourSettings } from "../../../types/card-settings";
import {ColorCalculator} from "../../../utils/color-calculator.ts";
import {defaultColours} from "../constants.ts";

export function getPrimaryColor(cardType: string, userColourSettings: ColourSettings, gradientValue: number = 100): string {
  return ColorCalculator.getPrimaryColor(cardType, userColourSettings, defaultColours, gradientValue);
}

export function getTextColourOnPrimary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnPrimary(cardType, userColourSettings, defaultColours);
}

export function getTextColourOnFadedPrimary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnFadedPrimary(cardType, userColourSettings, defaultColours);
}

export function getSecondaryColor(cardType: string, userColourSettings: ColourSettings, gradientValue: number = 100): string {
  return ColorCalculator.getSecondaryColor(cardType, userColourSettings, defaultColours, gradientValue);
}

export function getTextColourOnSecondary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnSecondary(cardType, userColourSettings, defaultColours);
}

export function getTextColourOnFadedSecondary(cardType: string, userColourSettings: ColourSettings): string {
  return ColorCalculator.getTextColourOnFadedSecondary(cardType, userColourSettings, defaultColours);
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
