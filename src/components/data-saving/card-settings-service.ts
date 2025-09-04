import { CardSettings } from "../../types/card-settings"

export const CardSettingsKey = "cardsettings"

export function saveCardSettings(settings: CardSettings){
  localStorage.setItem(CardSettingsKey, JSON.stringify(settings))
}

export function getCardSettings(): CardSettings {
  const data = localStorage.getItem(CardSettingsKey)
  let parsedSettings: CardSettings = {};
  if(data) {
    parsedSettings = JSON.parse(data ?? '');
  }
  return parsedSettings satisfies CardSettings
}
