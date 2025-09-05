export type CardSettings = {
  colourSettings?: ColourSettings
}

export type ColourSettings = {
  baseColours?: ColourSet
  cardTypeColours: Record<string,ColourSet>
}

export type ColourSet = {
  primaryColour?: Colour
  backgroundColour?: string | Pointer
  keywordColour?: string | Pointer
  onBackgroundTextColour?: string | Pointer
  onAttenuatedPrimaryTextColour?: string | Pointer
  onPrimaryTextColour?: string | Pointer
}

export type Colour = {
  baseColour?: string
  opacityFalloff?: number
}

export type Pointer = 'primaryColour' | 'backgroundColour' | 'keywordColour' | 'onBackgroundTextColour' | `onAttenuatedPrimaryTextColour` | `onPrimaryTextColour`;
