import { CardSettings } from "../../types/card-settings"

export const CardSettingsKey = "cardsettings"

export function saveCardSettings(settings: CardSettings){
  localStorage.setItem(CardSettingsKey, JSON.stringify(settings))
}

export function getCardSettings(): CardSettings {
  const data = localStorage.getItem(CardSettingsKey)
  let parsedSettings: CardSettings | undefined = undefined;
  if(data) {
    parsedSettings = JSON.parse(data ?? '');
  }
  if (!parsedSettings){
    return {
      colourSettings: {
        cardTypeColours: {}
      }
    }
  }
  return parsedSettings satisfies CardSettings
}
