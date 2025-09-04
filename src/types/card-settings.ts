export type CardSettings = {
  keywordColour?: string
  baseColours?: ColourSet
  cardTypeSettings: Record<string, ColourSet>
}

export type ColourSet = {
  primaryColour?: Colour
  backgroundColour?: string | Pointer
  onBackgroundTextColour?: string | Pointer
  onAttenuatedPrimaryTextColour?: string | Pointer
  onPrimaryTextColour?: string | Pointer
}

export type Colour = {
  baseColour?: string
  opacityFalloff?: number
}

export type Pointer = 'primaryColour' | 'backgroundColour' | 'onBackgroundTextColour' | `onAttenuatedPrimaryTextColour` | `onPrimaryTextColour`;
