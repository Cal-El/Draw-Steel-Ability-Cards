import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import { getCardSettings, saveCardSettings } from "../components/data-saving/card-settings-service";

export type CardSettingsState = {
  keywordColour?: string
}

const initialState: CardSettingsState = getCardSettings()

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateKeywordColour: create.reducer((state, action: PayloadAction<string>) => {
      state.keywordColour = action.payload
      saveCardSettings({
        ...state,
        keywordColour: action.payload
      })
    })
  }),
  selectors: {
    selectKeywordColour: state => state.keywordColour
  }
})

export const {updateKeywordColour} = cardSettingsSlice.actions
export const {selectKeywordColour} = cardSettingsSlice.selectors
