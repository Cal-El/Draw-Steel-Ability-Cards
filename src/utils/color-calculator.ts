import { CardTypeSettings } from "../types/card-settings";
import chroma from 'chroma-js'

export const BaseSaturation = 40
export const MutedSaturation = 22
export const BaseLightness = 35
export const LightnessIncreaseStep = 6.5

function getHue(cardType: string): number {
  switch (cardType.toLowerCase()) {
    case 'main action':
      return 120;
    case 'maneuver':
      return 210;
    case 'triggered action':
      return 0;
    case 'free triggered action':
      return 300;
    case 'free maneuver':
      return 150;
    case 'routine':
    case 'no action':
      return 240;
    case 'passive':
      return 270;
    case 'free strike action':
      return 0;
    case 'treasure':
      return 0;
    case 'move action':
      return 30;
    default:
      return 120;
  }
}

function getCssHslColor(hue: number, saturation: string, lightness: string): string {
  return `hsl(${hue} ${saturation} ${lightness})`;
}

function isGreyCard(cardType: string): boolean {
  const t = cardType.toLowerCase();
  return t === 'free strike action' || t === 'treasure';
}

function getCustomColor(cardTypeSettings: CardTypeSettings, gradientValue: number): string | undefined {
  if (!cardTypeSettings?.baseColour) return undefined
  const gradient = chroma.scale(["#ffffff", cardTypeSettings.baseColour])
  return gradient(gradientValue/100).toString()
}

export function getDynamicColorBase(cardType: string, cardTypeSettings: CardTypeSettings): string {
  const custom = getCustomColor(cardTypeSettings, 100)
  if(custom) return custom
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '40%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '20%' : '35%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor50(cardType: string, cardTypeSettings: CardTypeSettings): string {
  const custom = getCustomColor(cardTypeSettings, 50)
  if(custom) return custom
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '60%' : '67%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor40(cardType: string, cardTypeSettings: CardTypeSettings): string {
  const custom = getCustomColor(cardTypeSettings, 40)
  if(custom) return custom
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '23%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '68%' : '74%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor30(cardType: string, cardTypeSettings: CardTypeSettings): string {
  const custom = getCustomColor(cardTypeSettings, 30)
  if(custom) return custom
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '76%' : '80%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor20(cardType: string, cardTypeSettings: CardTypeSettings): string {
  const custom = getCustomColor(cardTypeSettings, 20)
  if(custom) return custom
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '84%' : '87%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getKeywordColor(customColour?: string): string {
  return customColour ? customColour : '#b87f47'
}
