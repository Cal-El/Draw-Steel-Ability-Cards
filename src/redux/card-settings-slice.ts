import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import { getCardSettings, saveCardSettings } from "../components/data-saving/card-settings-service";
import { CardSettings, CardTypeSettings } from "../types/card-settings";

export type UpdateCardTypeSettingsPayload = {
  cardType: string
  cardSettings?: CardTypeSettings
}

const initialState: CardSettings = getCardSettings()

export const selectCardTypeSettingsByCardType = (action: string) => (state: {cardSettings: CardSettings}) => {
  if(!state?.cardSettings?.cardTypeSettings) return undefined
  return state.cardSettings.cardTypeSettings[action.toLowerCase()]
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
    })
  }),
  selectors: {
    selectKeywordColour: state => state.keywordColour,
    selectCardTypeSettings: state => state.cardTypeSettings
  }
})

export const {updateKeywordColour, updateCardTypeSettings} = cardSettingsSlice.actions
export const {selectKeywordColour, selectCardTypeSettings} = cardSettingsSlice.selectors
