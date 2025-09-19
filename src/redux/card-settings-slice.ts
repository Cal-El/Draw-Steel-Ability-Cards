import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "./create-app-slice";
import {deleteTheme, getCardSettings, saveCardSettings} from "../components/data-saving/card-settings-service";
import { CardSettings, ColourSet, Theme } from "../types/card-settings";
import {getAllThemes, getAppliedTheme, getEmptySettings} from "../utils/card-settings-utils.ts";

export type UpdateCardTypeSettingsPayload = {
  cardType: string
  cardSettings?: ColourSet
}

const initialState: CardSettings = getCardSettings()

export const cardSettingsSlice = createAppSlice({
  name: "cardSettings",
  initialState,
  reducers: create => ({
    updateAppliedTheme: create.reducer((state, action: PayloadAction<string>) => {
      state.appliedThemeId = action.payload
      state.appliedTheme = getAppliedTheme({...state})
      saveCardSettings(state)
      state.allThemes = getAllThemes(state)
    }),
    modifyAppliedThemeName: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.customThemes.findIndex(t => t.id === state.appliedThemeId)
      if (index === -1) {
        return;
      }
      state.appliedTheme.name = action.payload
      state.customThemes.splice(index, 1, state.appliedTheme)
      saveCardSettings(state)
      state.allThemes = getAllThemes(state)
    }),
    modifyAppliedThemeStyle: create.reducer((state, action: PayloadAction<string>) => {
      const index = state.customThemes.findIndex(t => t.id === state.appliedThemeId)
      if (index === -1) {
        return;
      }
      state.appliedTheme.cardDesign = action.payload
      state.customThemes.splice(index, 1, state.appliedTheme)
      saveCardSettings(state)
      state.allThemes = getAllThemes(state)
    }),
    duplicateAppliedTheme: create.reducer((state, action: PayloadAction<string>) => {
      const t : Theme = {...state.appliedTheme, id: action.payload, name: `${state.appliedTheme.name} (copy)`}
      state.customThemes = [...(state.customThemes ?? []), t]
      state.appliedTheme = t
      state.appliedThemeId = action.payload
      saveCardSettings(state)
      state.allThemes = getAllThemes(state)
    }),
    deleteAppliedTheme: create.reducer((state) => {
      const index = state.customThemes.findIndex(v => v.id === state.appliedThemeId);
      if (index === -1) {
        return;
      }
      const emptyCardSettings = getEmptySettings();
      if(state.appliedThemeId) deleteTheme(state.appliedThemeId)
      state.appliedThemeId = emptyCardSettings.appliedThemeId
      state.appliedTheme = emptyCardSettings.appliedTheme
      state.customThemes.splice(index, 1)
      saveCardSettings(state)
      state.allThemes = getAllThemes(state)
    }),
  }),
  selectors: {
    selectAppliedTheme: state => state.appliedTheme,
    selectThemeColours: state => state.appliedTheme.colourSettings,
    selectThemeCardDesign: state => state.appliedTheme.cardDesign,
    selectAllThemes: state=> state.allThemes,
    selectInbuiltThemes: state=> state.inbuiltThemes,
  }
})

export const {updateAppliedTheme, modifyAppliedThemeName, modifyAppliedThemeStyle, duplicateAppliedTheme, deleteAppliedTheme} = cardSettingsSlice.actions
export const {selectAppliedTheme, selectThemeColours, selectThemeCardDesign, selectAllThemes, selectInbuiltThemes} = cardSettingsSlice.selectors
