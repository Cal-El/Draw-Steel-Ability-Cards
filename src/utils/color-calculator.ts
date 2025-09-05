import chroma from 'chroma-js'
import { ColourSet, ColourSettings } from '../types/card-settings'
import { defaultColours } from '../types/default-coloursets'

function getCardTypeDefaultColourSettings(cardType: string): ColourSet{
  return getCardTypeSettingsFromRecord(defaultColours.cardTypeColours, cardType)
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

function getColour(key: keyof ColourSet, cardType: string, colourSettings: ColourSettings): string{
  const baseColourSettings = colourSettings.baseColours ?? {}
  const cardTypeColourSettings = getCardTypeSettingsFromRecord(colourSettings.cardTypeColours, cardType)
  if (key === 'primaryColour'){
    if(cardTypeColourSettings && cardTypeColourSettings[key]?.baseColour) return cardTypeColourSettings[key].baseColour
    const defaultColourSettings = getCardTypeDefaultColourSettings(cardType)
    if(defaultColourSettings && defaultColourSettings[key]?.baseColour) return defaultColourSettings[key].baseColour
    if(baseColourSettings[key]?.baseColour) return baseColourSettings[key].baseColour
    return defaultColours.baseColours?.[key]?.baseColour ?? ""
  }
  if(cardTypeColourSettings && cardTypeColourSettings[key]) return cardTypeColourSettings[key]
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

function getCustomPrimaryColor(cardType: string, colourSettings: ColourSettings, gradientValue: number): string {
  return getCustomColour(getColour('primaryColour', cardType, colourSettings), getBackgroundColor(cardType, colourSettings), gradientValue)
}

export function getDynamicColorBase(cardType: string, colourSettings: ColourSettings): string {
  return getCustomPrimaryColor(cardType, colourSettings, 100)
}

export function getDynamicColor50(cardType: string, colourSettings: ColourSettings): string {
  return getCustomPrimaryColor(cardType, colourSettings, 50)
}

export function getDynamicColor40(cardType: string, colourSettings: ColourSettings): string {
  return getCustomPrimaryColor(cardType, colourSettings, 40)
}

export function getDynamicColor30(cardType: string, colourSettings: ColourSettings): string {
  return getCustomPrimaryColor(cardType, colourSettings, 30)
}

export function getDynamicColor20(cardType: string, colourSettings: ColourSettings): string {
  return getCustomPrimaryColor(cardType, colourSettings, 20)
}

export function getKeywordColor(cardType: string, colourSettings: ColourSettings): string {
  return getColour('keywordColour', cardType, colourSettings)
}

export function getBackgroundColor(cardType: string, colourSettings: ColourSettings): string {
  return getColour('backgroundColour', cardType, colourSettings)
}
