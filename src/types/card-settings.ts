export type CardSettings = {
  keywordColour?: string
  cardTypeSettings: Record<string, CardTypeSettings>
}

export type CardTypeSettings = {
  baseColour?: string
}
