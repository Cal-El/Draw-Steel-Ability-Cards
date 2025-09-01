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

export const cardbackColorStyle: Record<string,string> = {
    "Main Action": 'bg-cardback border-action-card',
    "Action": 'bg-cardback border-action-card',
    "Maneuver": 'bg-cardback border-maneuver-card',
    "Triggered Action": 'bg-cardback border-triggered-action-card',
    "Move Action": 'bg-cardback border-move-action-card',
    "Free Triggered Action": 'bg-cardback border-free-triggered-action-card',
    "Free Maneuver": 'bg-cardback border-free-maneuver-card',
    "Routine": 'bg-cardback border-routine-card',
    "Passive": 'bg-cardback border-passive-card',
    "Free Strike Action": 'bg-cardback border-free-strike-card',
    "Treasure": 'bg-cardback border-treasure-card'
}

export const borderColorStyle: Record<string,string> = {
  "Main Action": 'border-action-card',
  "Action": 'border-action-card',
  "Maneuver": 'border-maneuver-card',
  "Triggered Action": 'border-triggered-action-card',
  "Move Action": 'border-move-action-card',
  "Free Triggered Action": 'border-free-triggered-action-card',
  "Free Maneuver": 'border-free-maneuver-card',
  "Routine": 'border-routine-card',
  "Passive": 'border-passive-card',
  "Free Strike Action": 'border-free-strike-card',
  "Treasure": 'border-treasure-card'
}

export const actionBg100ColorStyle: Record<string,string> = {
    "Main Action": 'bg-action-card',
    "Action": 'bg-action-card',
    "Maneuver": 'bg-maneuver-card',
    "Triggered Action": 'bg-triggered-action-card',
    "Move Action": 'bg-move-action-card',
    "Free Triggered Action": 'bg-free-triggered-action-card',
    "Free Maneuver": 'bg-free-maneuver-card',
    "Routine": 'bg-routine-card',
    "Passive": 'bg-passive-card',
    "Free Strike Action": 'bg-free-strike-card',
    "Treasure": 'bg-treasure-card',
}
export const actionBg50ColorStyle: Record<string,string> = {
    "Main Action": 'bg-action-card/[0.5]',
    "Action": 'bg-action-card/[0.5]',
    "Maneuver": 'bg-maneuver-card/[0.5]',
    "Triggered Action": 'bg-triggered-action-card/[0.5]',
    "Move Action": 'bg-move-action-card/[0.5]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.5]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.5]',
    "Routine": 'bg-routine-card/[0.5]',
    "Passive": 'bg-passive-card/[0.5]',
    "Free Strike Action": 'bg-free-strike-card/[0.5]',
    "Treasure": 'bg-treasure-card/[0.5]',
}
export const actionBg40ColorStyle: Record<string,string> = {
    "Main Action": 'bg-action-card/[0.4]',
    "Action": 'bg-action-card/[0.4]',
    "Maneuver": 'bg-maneuver-card/[0.4]',
    "Triggered Action": 'bg-triggered-action-card/[0.4]',
    "Move Action": 'bg-move-action-card/[0.4]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.4]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.4]',
    "Routine": 'bg-routine-card/[0.4]',
    "Passive": 'bg-passive-card/[0.4]',
    "Free Strike Action": 'bg-free-strike-card/[0.4]',
    "Treasure": 'bg-treasure-card/[0.4]',
}
export const actionBg30ColorStyle: Record<string,string> = {
    "Main Action": 'text-action-card/[0.3]',
    "Action": 'bg-action-card/[0.3]',
    "Maneuver": 'bg-maneuver-card/[0.3]',
    "Triggered Action": 'bg-triggered-action-card/[0.3]',
    "Move Action": 'bg-move-action-card/[0.3]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.3]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.3]',
    "Routine": 'bg-routine-card/[0.3]',
    "Passive": 'bg-passive-card/[0.3]',
    "Free Strike Action": 'bg-free-strike-card/[0.3]',
    "Treasure": 'bg-treasure-card/[0.3]',
}
export const actionBg20ColorStyle: Record<string,string> = {
    "Main Action": 'bg-action-card/[0.2]',
    "Action": 'bg-action-card/[0.2]',
    "Maneuver": 'bg-maneuver-card/[0.2]',
    "Triggered Action": 'bg-triggered-action-card/[0.2]',
    "Move Action": 'bg-move-action-card/[0.2]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.2]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.2]',
    "Routine": 'bg-routine-card/[0.2]',
    "Passive": 'bg-passive-card/[0.2]',
    "Free Strike Action": 'bg-free-strike-card/[0.2]',
    "Treasure": 'bg-treasure-card/[0.2]',
}

export const actionTextColorStyle: Record<string,string> = {
    "Main Action": 'text-action-card',
    "Action": 'text-action-card',
    "Maneuver": 'text-maneuver-card',
    "Triggered Action": 'text-triggered-action-card',
    "Move Action": 'text-move-action-card',
    "Free Triggered Action": 'text-free-triggered-action-card',
    "Free Maneuver": 'text-free-maneuver-card',
    "Routine": 'text-routine-card',
    "Passive": 'text-passive-card',
    "Free Strike Action": 'text-free-strike-card',
    "Treasure": 'text-treasure-card',
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
