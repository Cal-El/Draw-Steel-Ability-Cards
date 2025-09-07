export type CardSettings = {
  colourSettings?: ColourSettings
}

export type ColourSettings = {
  baseColours?: ColourSet
  cardTypeColours: Record<string,ColourSet>
}

export type ColourSet = {
  primaryColour?: Colour
  backgroundColour?: string // background colour must be a CSS-readable colour string
  textColourOnBackground?: string | Pointer
  textColourOnFadedPrimary?: string | Pointer
  textColourOnPrimary?: string | Pointer
  keywordColour?: Colour
  keywordTextColour?: string | Pointer
}

export type Colour = {
  baseColour: string // CSS-readable colour string
  opacityFalloff?: number // number between -1 and 1 that acts as a softening-multiplier to the falloff gradient
}

export type Pointer = `${'pointer:'}${keyof ColourSet}${`-${number}` | ''}`;
