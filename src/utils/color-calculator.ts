import chroma from 'chroma-js'
import {Colour, ColourSet, ColourSettings, Pointer} from '../types/card-settings'
import { defaultColours } from '../types/default-coloursets'
import convert from "color-convert";

export function getCardTypeDefaultColourSettings(cardType: string): ColourSet | undefined {
  return getCardTypeSettingsFromRecord(defaultColours.cardTypeColours, cardType)
}

export function getCardTypeSettingsFromRecord(cardTypeSettings: Record<string, ColourSet>, cardType: string): ColourSet | undefined {
  let c = cardType.toLowerCase()
  if (c === 'action') c = 'main action'
  if (c === 'passive') c = 'trait'
  if (c === 'free strike action') c = 'free strike'
  if (c === 'routine') c = 'no action'
  return c in cardTypeSettings ? cardTypeSettings[c] : undefined;
}

// function handlePointer(colour: string, userColourSettings, defaultColourSettings: ColourSet, baseColourSettings: ColourSet, defaultColourSettings: ColourSet){

// }

function isPointer(x : Colour | Pointer | string) {
  return typeof x === 'string' && x.startsWith('pointer:');
}

function getColourFromPointerRecursively(pointer : Pointer, pointedFrom : string[], cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings) : string {
  const [_, pointerVal] = pointer.split(':');
  let keyVal = pointerVal
  let opacityVal = 100;

  if (pointerVal.includes('-')) {
    const [key, opacity] = pointerVal.split('-');
    keyVal = key
    opacityVal = parseInt(opacity) ?? 100;

  }
  if (pointedFrom.includes(keyVal)) {
    throw new Error(`Failed to resolve pointer ${pointer}: infinite loop ${pointedFrom}`)
  }
  let resolvedColour = getResolvedColourSetting(keyVal as keyof ColourSet, cardType, userColourSettings, defaultColourSettings);
  if (isPointer(resolvedColour)) {
    resolvedColour = getColourFromPointerRecursively(resolvedColour as Pointer, [...pointedFrom, keyVal], cardType, userColourSettings, defaultColourSettings)
  }
  if ((resolvedColour as Colour).baseColour) {
    return resolveGradientToStringColour(resolvedColour as Colour, getBackgroundColor(cardType, userColourSettings, defaultColourSettings), opacityVal)
  } else {
    return resolveGradientToStringColour({baseColour: resolvedColour as string, opacityFalloff: 1}, getBackgroundColor(cardType, userColourSettings, defaultColourSettings), opacityVal)
  }
}

function getResolvedColourSetting(key: keyof ColourSet, cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings): string | Pointer | Colour {
  const baseColourSettings = userColourSettings.baseColours ?? {}

  // First, check the user's type-based colour overrides
  const cardTypeUserColourSettings = getCardTypeSettingsFromRecord(userColourSettings.cardTypeColours, cardType)
  if (cardTypeUserColourSettings && cardTypeUserColourSettings[key]) return cardTypeUserColourSettings[key]

  // Second, check the card-style's default type-based colour overrides
  const cardTypeDefaultColourSettings = getCardTypeSettingsFromRecord(defaultColourSettings.cardTypeColours, cardType)
  if (cardTypeDefaultColourSettings && cardTypeDefaultColourSettings[key]) return cardTypeDefaultColourSettings[key]

  // Failing that, we check the user's has set an override for the base-colour for this key
  if(baseColourSettings[key]) return baseColourSettings[key]

  // If not, we just return the card-style default base colour
  if(defaultColours.baseColours && defaultColours.baseColours[key]) return defaultColours.baseColours[key]

  throw new Error(`Unable to resolve key [${key}] to a specific colour value using settings ${userColourSettings}`);
}

function getCustomColour(key: keyof ColourSet, cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings) : string {
  let resolvedColour = getResolvedColourSetting(key, cardType, userColourSettings, defaultColourSettings)
  if (isPointer(resolvedColour)) {
    resolvedColour = getColourFromPointerRecursively(resolvedColour as Pointer, [key], cardType, userColourSettings, defaultColourSettings);
  }

  if ((resolvedColour as Colour).baseColour) {
    return (resolvedColour as Colour).baseColour;
  } else {
    return resolvedColour as string;
  }
}

function getColourWithOpacityFalloff(key: 'primaryColour' | 'keywordColour', cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings): Colour {
  const resolvedColour = getResolvedColourSetting(key, cardType, userColourSettings, defaultColourSettings);
  if (!(resolvedColour as Colour).baseColour) {
    throw new Error(`${key} should always be a colour with opacity falloff value`)
  }
  return resolvedColour as Colour;
}

function getStringColour(key: 'backgroundColour', cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings): string {
  const resolvedColour = getResolvedColourSetting(key, cardType, userColourSettings, defaultColourSettings);
  if ((resolvedColour as Colour).baseColour) {
    throw new Error(`${key} should not be a Colour with Opacity Falloff. Should be a colour string.`)
  }
  if (isPointer(resolvedColour)) {
    throw new Error(`${key} should not be a Pointer. Should be a colour string.`)
  }
  return resolvedColour as string;
}

function resolveGradientToStringColour(customColour: Colour, backingColour: string, gradientValue: number){
  let secondaryColour = backingColour;
  const opacityFalloff = customColour.opacityFalloff ?? 1;
  if (opacityFalloff === 0 || gradientValue === 100) {
    return customColour.baseColour;
  } else if (opacityFalloff < 0) {
    const backingColourRGB = convert.hex.rgb(backingColour);
    secondaryColour = convert.rgb.hex(255 - backingColourRGB[0], 255 - backingColourRGB[1], 255 - backingColourRGB[2]);
  }
  const gradient = chroma.scale([customColour.baseColour, secondaryColour])
  return gradient((1 - gradientValue/100) * Math.abs(opacityFalloff)).toString()
}

function getPrimaryColor(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours, gradientValue: number = 100): string {
  return resolveGradientToStringColour(getColourWithOpacityFalloff('primaryColour', cardType, userColourSettings, defaultColourSettings), getBackgroundColor(cardType, userColourSettings, defaultColourSettings), gradientValue)
}

function getTextColourOnPrimary(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours): string {
  return getCustomColour('textColourOnPrimary', cardType, userColourSettings, defaultColourSettings);
}

function getTextColourOnFadedPrimary(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours): string {
  return getCustomColour('textColourOnFadedPrimary', cardType, userColourSettings, defaultColourSettings);
}

function getTextColourOnBackground(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours): string {
  return getCustomColour('textColourOnBackground', cardType, userColourSettings, defaultColourSettings);
}

function getKeywordColor(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours, gradientValue: number): string {
  return resolveGradientToStringColour(getColourWithOpacityFalloff('keywordColour', cardType, userColourSettings, defaultColourSettings), getBackgroundColor(cardType, userColourSettings, defaultColourSettings), gradientValue)
}

function getKeywordTextColor(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours): string {
  return getCustomColour('keywordTextColour', cardType, userColourSettings, defaultColourSettings);
}

function getBackgroundColor(cardType: string, userColourSettings: ColourSettings, defaultColourSettings: ColourSettings = defaultColours): string {
  return getStringColour("backgroundColour", cardType, userColourSettings, defaultColourSettings);
}

export const ColorCalculator = {
  getPrimaryColor,
  getBackgroundColor,
  getTextColourOnPrimary,
  getTextColourOnFadedPrimary,
  getTextColourOnBackground,
  getKeywordColor,
  getKeywordTextColor,
}

export default ColorCalculator;
