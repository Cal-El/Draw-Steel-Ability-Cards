import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import { getCardSettings, saveCardSettings } from "../components/data-saving/card-settings-service";
import { CardSettings, ColourSet } from "../types/card-settings";
import { getCardTypeSettingsFromRecord } from "../utils/color-calculator";

export type UpdateCardTypeSettingsPayload = {
  cardType: string
  cardSettings?: ColourSet
}

const initialState: CardSettings = getCardSettings()

export const selectCardTypeSettingsByCardType = (action: string) => (state: {cardSettings: CardSettings}) => {
  if(!state?.cardSettings?.colourSettings?.cardTypeColours) return undefined
  return getCardTypeSettingsFromRecord(state.cardSettings.colourSettings.cardTypeColours, action)
}

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateCardTypeSettings: create.reducer((state, action: PayloadAction<UpdateCardTypeSettingsPayload>) => {
      if (!state.colourSettings) {
        state.colourSettings = {cardTypeColours: {}}
      }
      state.colourSettings.cardTypeColours[action.payload.cardType.toLowerCase()] = action.payload.cardSettings ?? {}
      saveCardSettings(state)
    }),
    updateBaseColours: create.reducer((state, action: PayloadAction<ColourSet>) => {
      if (!state.colourSettings){
        state.colourSettings = { cardTypeColours: {}}
      }
      state.colourSettings.baseColours = action.payload
      saveCardSettings(state)
    }),
  }),
  selectors: {
    selectBaseColours: state => state.colourSettings?.baseColours,
    selectColourSettings: state => state.colourSettings ?? {cardTypeColours: {}}
  }
})

export const {updateCardTypeSettings, updateBaseColours} = cardSettingsSlice.actions
export const {selectColourSettings, selectBaseColours} = cardSettingsSlice.selectors
