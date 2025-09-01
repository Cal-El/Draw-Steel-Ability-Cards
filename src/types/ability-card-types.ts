export enum abilityType {
    action = 'Action',
    maneuver = 'Maneuver',
    triggeredAction = 'Triggered Action',
    moveAction = 'Move Action',
    freeTriggeredAction = 'Free Triggered Action',
    freeManeuver = 'Free Maneuver',
    routine = 'Routine',
    passive = 'Passive',
    freeStrikeAction = 'Free Strike Action',
    treasure = 'Treasure',
}

export const abilityTypeValues : abilityType[] = [
    abilityType.action,
    abilityType.maneuver,
    abilityType.triggeredAction,
    abilityType.moveAction,
    abilityType.freeTriggeredAction,
    abilityType.freeManeuver,
    abilityType.routine,
    abilityType.passive,
    abilityType.freeStrikeAction,
]

function getHue(cardType: string): number {
  switch(cardType.toLowerCase()){
    case 'main action':
      return 120
    case 'maneuver':
      return 210
    case 'triggered action':
      return 0
    case 'free triggered action':
      return 300
    case 'free maneuver':
      return 150
    case 'routine':
    case 'no action':
      return 240
    case 'passive':
      return 270
    case 'free strike action':
      return 0
    case 'treasure':
      return 0
    case 'move action':
      return 30
    default:
      return 120
  }
}

function getCssHslColor(hue: number, saturation: string, lightness: string): string {
  return `hsl(${hue} ${saturation} ${lightness})`
}

function isGreyCard(cardType: string): boolean {
  const t = cardType.toLowerCase()
  return t === 'free strike action' || t === 'treasure'
}

export function getDynamicColorBase(cardType: string): string {
  const hue = getHue(cardType)
  const saturation = isGreyCard(cardType) ? '0%' : '40%'
  const luminance = cardType.toLowerCase() === 'treasure' ? '20%' : '35%'
  return getCssHslColor(hue, saturation, luminance)
}

export function getDynamicColor50(cardType: string): string {
  const hue = getHue(cardType)
  const saturation = isGreyCard(cardType) ? '0%' : '22%'
  const luminance = cardType.toLowerCase() === 'treasure' ? '60%' : '67%'
  return getCssHslColor(hue, saturation, luminance)
}

export function getDynamicColor40(cardType: string): string {
  const hue = getHue(cardType)
  const saturation = isGreyCard(cardType) ? '0%' : '23%'
  const luminance = cardType.toLowerCase() === 'treasure' ? '68%' : '74%'
  return getCssHslColor(hue, saturation, luminance)
}

export function getDynamicColor30(cardType: string): string {
  const hue = getHue(cardType)
  const saturation = isGreyCard(cardType) ? '0%' : '22%'
  const luminance = cardType.toLowerCase() === 'treasure' ? '76%' : '80%'
  return getCssHslColor(hue, saturation, luminance)
}

export function getDynamicColor20(cardType: string): string {
  const hue = getHue(cardType)
  const saturation = isGreyCard(cardType) ? '0%' : '22%'
  const luminance = cardType.toLowerCase() === 'treasure' ? '84%' : '87%'
  return getCssHslColor(hue, saturation, luminance)
}

export const typeAbbreviation: Record<string,string> = {
    "Action": 'MA',
    "Maneuver": 'M',
    "Triggered Action": 'TA',
    "Move Action": 'MV',
    "Free Triggered Action": 'FTA',
    "Free Maneuver": 'FM',
    "Routine": 'NA',
    "Passive": 'P',
    "Free Strike Action": 'MA',
    "Treasure": "E",
}

export type ability_card = {
    type: string;
    topMatter: string;
    title: string;
    flavour: string;
    keywords: string[];
    statements: body_statement[];
    hasCost: boolean;
    cost?: {
        costName: string;
        costValue: string;
    };
    target: string;
    distance: distance_block[];
    topMatterFontSizeOverride?: string;
    titleFontSizeOverride?: string;
    flavourFontSizeOverride?: string;
    bodyFontSizeOverride?: string;
    powerRollFontSizeOverride?: string;
}

export type power_roll_statement = {
    characteristic: string;
    t1: power_roll_tier;
    t2: power_roll_tier;
    t3: power_roll_tier;
}

export type key_value_statement = {
    key: string;
    value: string;
}

export type spacer_statement = {
    spacePt: number;
}

export type body_statement = power_roll_statement | key_value_statement | spacer_statement;

export type power_roll_tier = {
    hasDamage: boolean;
    damageValue?: string;
    hasGeneralEffect: boolean;
    generalEffect?: string;
    hasPotency: boolean;
    potencyValue?: string;
    potencyEffect?: string;
}

export type distance_block = {
    distanceHeader: string;
    distanceValue: string;
}

export const supportedAbilityTargets : string[] = [
    'Self',
    'Special',
    '1 Creature',
    '1 Creature or Object',
    '1 Willing Creature',
    '1 Enemy',
    '1 Ally',
    '1 Ally or Enemy',
    'Self and 1 Ally',
    'Self or 1 Ally',
    'Self or 1 Creature',
    '2 Creatures',
    '2 Creatures or Objects',
    '2 Enemies',
    '2 Allies',
    'Self and 2 Allies',
    '3 Creatures',
    '3 Creatures or Objects',
    '3 Enemies',
    '3 Allies',
    'All Creatures',
    'All Enemies',
    'All Allies',
    'Self and All Creatures',
    'Self and All Allies',
    'None',
]
