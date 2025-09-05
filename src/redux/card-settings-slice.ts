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
  if(!state?.cardSettings?.cardTypeSettings) return undefined
  return getCardTypeSettingsFromRecord(state.cardSettings.cardTypeSettings, action)
}

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateKeywordColour: create.reducer((state, action: PayloadAction<string>) => {
      state.keywordColour = action.payload
      saveCardSettings({
        ...state,
        keywordColour: action.payload
      } as CardSettings)
    }),
    updateCardTypeSettings: create.reducer((state, action: PayloadAction<UpdateCardTypeSettingsPayload>) => {
      state.cardTypeSettings[action.payload.cardType.toLowerCase()] = action.payload.cardSettings ?? {}
      saveCardSettings({
        ...state,
        cardTypeSettings: state.cardTypeSettings
      })
    }),
    updateBaseColours: create.reducer((state, action: PayloadAction<ColourSet>) => {
      state.baseColours = action.payload
      saveCardSettings({
        ...state,
        baseColours: action.payload
      } as CardSettings)
    }),
  }),
  selectors: {
    selectKeywordColour: state => state.keywordColour,
    selectBaseColours: state => state.baseColours
  }
})

export const {updateKeywordColour, updateCardTypeSettings, updateBaseColours} = cardSettingsSlice.actions
export const {selectKeywordColour, selectBaseColours} = cardSettingsSlice.selectors
