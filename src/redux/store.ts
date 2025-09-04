import { Action, combineSlices, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cardSettingsSlice } from "./card-settings-slice";

const rootReducer = combineSlices(cardSettingsSlice)
export type RootState = ReturnType<typeof rootReducer>

export function configureAppStore(preloadedState?: Partial<RootState>) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
      serializableCheck: false
    }),
    preloadedState
  })

  setupListeners(store.dispatch)
  return store
}

export const store = configureAppStore()

export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
