import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import { getCardSettings } from "../components/data-saving/card-settings-service";
import { CardSettings, ColourSet, Theme } from "../types/card-settings";
import { defaultV2Theme } from "../components/ability-card-v2/utils/color-calculator";
import { defaultV1Theme } from "../components/ability-card/utils/color-calculator";

export type UpdateCardTypeSettingsPayload = {
  cardType: string
  cardSettings?: ColourSet
}

const defaultTheme: string = "529eb773-bdbf-445d-be1e-ad2d9f435efe"
const inbuiltThemes: Theme[] = [
  defaultV2Theme,
  defaultV1Theme
]

const initialState: CardSettings = getCardSettings()

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateAppliedTheme: create.reducer((state, action: PayloadAction<string>) => {
      state.appliedTheme = action.payload
    })
  }),
  selectors: {
    selectAppliedTheme: state => state.appliedTheme,
    selectThemeColours: state => {
      const theme = state.appliedTheme ?? defaultTheme
      if (inbuiltThemes.filter(x => x.id === theme).length > 0) {
        return inbuiltThemes.find(x => x.id === theme)?.colourSettings
      }
      return state.customThemes.find(x => x.id === theme)?.colourSettings
    },
    selectThemeCardDesign: state => {
      const theme = state.appliedTheme ?? defaultTheme
      if (inbuiltThemes.filter(x => x.id === theme).length > 0) {
        return inbuiltThemes.find(x => x.id === theme)?.cardDesign
      }
      return state.customThemes.find(x => x.id === theme)?.cardDesign
    }
  }
})

export const {updateAppliedTheme} = cardSettingsSlice.actions
export const {selectAppliedTheme, selectThemeColours, selectThemeCardDesign} = cardSettingsSlice.selectors
