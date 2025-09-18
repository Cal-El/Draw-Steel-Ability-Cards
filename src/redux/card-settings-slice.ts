import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import {deleteTheme, getCardSettings, saveCardSettings} from "../components/data-saving/card-settings-service";
import { CardSettings, ColourSet, Theme } from "../types/card-settings";
import {defaultV2Theme, v2DefaultThemeId} from "../components/ability-card-v2/constants.ts";
import {defaultV1Theme} from "../components/ability-card/constants.ts";

export type UpdateCardTypeSettingsPayload = {
  cardType: string
  cardSettings?: ColourSet
}

const defaultTheme: string = "drawSteelAbilityCards"
const inbuiltThemes: Theme[] = [
  defaultV2Theme,
  defaultV1Theme
]

const initialState: CardSettings = getCardSettings()

const getAppliedTheme = (state: CardSettings): Theme => {
  const theme = state.appliedTheme ?? defaultTheme
  if (inbuiltThemes.filter(x => x.id === theme).length > 0) {
    return inbuiltThemes.find(x => x.id === theme) ?? defaultV2Theme;
  }
  return state.customThemes.find(x => x.id === theme) ?? defaultV2Theme;
}

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateAppliedTheme: create.reducer((state, action: PayloadAction<string>) => {
      state.appliedTheme = action.payload
      saveCardSettings(state)
    }),
    modifyAppliedThemeName: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.customThemes.findIndex(t => t.id === state.appliedTheme)
      if (index === -1) {
        return;
      }
      const theme = getAppliedTheme(state)
      state.customThemes.splice(index, 1, {...theme, name: action.payload})

      saveCardSettings(state)
    }),
    duplicateAppliedTheme: create.reducer((state, action: PayloadAction<string>) => {
      const appliedTheme = getAppliedTheme(state)
      const t : Theme = {...appliedTheme, id: action.payload, name: `${appliedTheme.name} (copy)`}
      state.customThemes = [...(state.customThemes ?? []), t]
      state.appliedTheme = action.payload
      saveCardSettings(state)
    }),
    deleteAppliedTheme: create.reducer((state) => {
      const index = state.customThemes.findIndex(v => v.id === state.appliedTheme);
      console.log(index)
      const temp = [...state.customThemes];
      console.log(temp)
      temp.splice(index, 1)
      console.log(temp)
      if(state.appliedTheme) deleteTheme(state.appliedTheme)
      const newstate = {
        appliedTheme: v2DefaultThemeId,
        customThemes: temp,
      }
      console.log(newstate)
      saveCardSettings(newstate)
      return newstate
    }),
  }),
  selectors: {
    selectAppliedTheme: state => getAppliedTheme(state),
    selectThemeColours: state => getAppliedTheme(state).colourSettings,
    selectThemeCardDesign: state => getAppliedTheme(state)?.cardDesign,
    selectAllThemes: state=> inbuiltThemes.concat(...(state.customThemes ?? [])),
    selectInbuiltThemes: _=> inbuiltThemes,
  }
})

export const {updateAppliedTheme, modifyAppliedThemeName, duplicateAppliedTheme, deleteAppliedTheme} = cardSettingsSlice.actions
export const {selectAppliedTheme, selectThemeColours, selectThemeCardDesign, selectAllThemes, selectInbuiltThemes} = cardSettingsSlice.selectors
