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

export function getDynamicColorBase(cardType: string): string {
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '40%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '20%' : '35%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor50(cardType: string): string {
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '60%' : '67%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor40(cardType: string): string {
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '23%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '68%' : '74%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor30(cardType: string): string {
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '76%' : '80%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getDynamicColor20(cardType: string): string {
  const hue = getHue(cardType);
  const saturation = isGreyCard(cardType) ? '0%' : '22%';
  const luminance = cardType.toLowerCase() === 'treasure' ? '84%' : '87%';
  return getCssHslColor(hue, saturation, luminance);
}

export function getKeywordColor(): string {
  return '#b87f47'
}
