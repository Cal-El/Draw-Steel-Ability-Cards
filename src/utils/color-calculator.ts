import chroma from 'chroma-js'
import { ColourSet } from '../types/card-settings'
import { defaultColours } from '../types/default-coloursets'

function getCardTypeDefaultColourSettings(cardType: string): ColourSet{
  return getCardTypeSettingsFromRecord(defaultColours.cardTypeSettings, cardType)
}

export function getCardTypeSettingsFromRecord(cardTypeSettings: Record<string, ColourSet>, cardType: string): ColourSet{
  let c = cardType.toLowerCase()
  if (c === 'action') c = 'main action'
  if (c === 'passive') c = 'trait'
  if (c === 'free strike action') c = 'free strike'
  if (c === 'routine') c = 'no action'
  return cardTypeSettings[c]
}

// function handlePointer(colour: string, colourSettings: ColourSet, baseColourSettings: ColourSet, defaultColourSettings: ColourSet){

// }

function getColour(key: keyof ColourSet, cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string{
  if (key === 'primaryColour'){
    if(colourSettings[key]?.baseColour) return colourSettings[key].baseColour
    const defaultColourSettings = getCardTypeDefaultColourSettings(cardType)
    if(defaultColourSettings && defaultColourSettings[key]?.baseColour) return defaultColourSettings[key].baseColour
    if(baseColourSettings[key]?.baseColour) return baseColourSettings[key].baseColour
    return defaultColours.baseColours?.primaryColour?.baseColour ?? ""
  }
  if(colourSettings[key]) return colourSettings[key]
  const defaultColourSettings = getCardTypeDefaultColourSettings(cardType)
  if(defaultColourSettings[key]) return defaultColourSettings[key]
  if(baseColourSettings[key]) return baseColourSettings[key]
  if(defaultColours.baseColours && defaultColours.baseColours[key]) return defaultColours.baseColours[key]
  return ""
}

function getCustomColour(primaryColour: string, secondaryColour: string, gradientValue: number){
  const gradient = chroma.scale([secondaryColour, primaryColour])
  return gradient(gradientValue/100).toString()
}

function getCustomPrimaryColor(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet, gradientValue: number): string {
  return getCustomColour(getColour('primaryColour', cardType, colourSettings, baseColourSettings), getBackgroundColor(baseColourSettings), gradientValue)
}

export function getDynamicColorBase(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string {
  return getCustomPrimaryColor(cardType, colourSettings, baseColourSettings, 100)
}

export function getDynamicColor50(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string {
  return getCustomPrimaryColor(cardType, colourSettings, baseColourSettings, 50)
}

export function getDynamicColor40(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string {
  return getCustomPrimaryColor(cardType, colourSettings, baseColourSettings, 40)
}

export function getDynamicColor30(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string {
  return getCustomPrimaryColor(cardType, colourSettings, baseColourSettings, 30)
}

export function getDynamicColor20(cardType: string, colourSettings: ColourSet, baseColourSettings: ColourSet): string {
  return getCustomPrimaryColor(cardType, colourSettings, baseColourSettings, 20)
}

export function getKeywordColor(customColour?: string): string {
  return customColour ? customColour : '#b87f47'
}

export function getBackgroundColor(baseColourSettings: ColourSet): string {
  return baseColourSettings.backgroundColour ? baseColourSettings.backgroundColour : "#ffffff"
}
