export enum abilityType {
    action = 'Action',
    maneuver = 'Maneuver',
    triggeredAction = 'Triggered Action',
    freeTriggeredAction = 'Free Triggered Action',
    freeManeuver = 'Free Maneuver',
    routine = 'Routine',
    passive = 'Passive',
    freeStrikeAction = 'Free Strike Action',
}

export const abilityTypeValues : abilityType[] = [
    abilityType.action,
    abilityType.maneuver,
    abilityType.triggeredAction,
    abilityType.freeTriggeredAction,
    abilityType.freeManeuver,
    abilityType.routine,
    abilityType.passive,
    abilityType.freeStrikeAction,
]

export const cardbackColorStyle: Record<string,string> = {
    "Action": 'bg-cardback border-action-card',
    "Maneuver": 'bg-cardback border-maneuver-card',
    "Triggered Action": 'bg-cardback border-triggered-action-card',
    "Free Triggered Action": 'bg-cardback border-free-triggered-action-card',
    "Free Maneuver": 'bg-cardback border-free-maneuver-card',
    "Routine": 'bg-cardback border-routine-card',
    "Passive": 'bg-cardback border-passive-card',
    "Free Strike Action": 'bg-cardback border-free-strike-card',
}

export const actionBg100ColorStyle: Record<string,string> = {
    "Action": 'bg-action-card',
    "Maneuver": 'bg-maneuver-card',
    "Triggered Action": 'bg-triggered-action-card',
    "Free Triggered Action": 'bg-free-triggered-action-card',
    "Free Maneuver": 'bg-free-maneuver-card',
    "Routine": 'bg-routine-card',
    "Passive": 'bg-passive-card',
    "Free Strike Action": 'bg-free-strike-card',
}
export const actionBg50ColorStyle: Record<string,string> = {
    "Action": 'bg-action-card/[0.5]',
    "Maneuver": 'bg-maneuver-card/[0.5]',
    "Triggered Action": 'bg-triggered-action-card/[0.5]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.5]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.5]',
    "Routine": 'bg-routine-card/[0.5]',
    "Passive": 'bg-passive-card/[0.5]',
    "Free Strike Action": 'bg-free-strike-card/[0.5]',
}
export const actionBg40ColorStyle: Record<string,string> = {
    "Action": 'bg-action-card/[0.4]',
    "Maneuver": 'bg-maneuver-card/[0.4]',
    "Triggered Action": 'bg-triggered-action-card/[0.4]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.4]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.4]',
    "Routine": 'bg-routine-card/[0.4]',
    "Passive": 'bg-passive-card/[0.4]',
    "Free Strike Action": 'bg-free-strike-card/[0.4]',
}
export const actionBg30ColorStyle: Record<string,string> = {
    "Action": 'bg-action-card/[0.3]',
    "Maneuver": 'bg-maneuver-card/[0.3]',
    "Triggered Action": 'bg-triggered-action-card/[0.3]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.3]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.3]',
    "Routine": 'bg-routine-card/[0.3]',
    "Passive": 'bg-passive-card/[0.3]',
    "Free Strike Action": 'bg-free-strike-card/[0.3]',
}
export const actionBg20ColorStyle: Record<string,string> = {
    "Action": 'bg-action-card/[0.2]',
    "Maneuver": 'bg-maneuver-card/[0.2]',
    "Triggered Action": 'bg-triggered-action-card/[0.2]',
    "Free Triggered Action": 'bg-free-triggered-action-card/[0.2]',
    "Free Maneuver": 'bg-free-maneuver-card/[0.2]',
    "Routine": 'bg-routine-card/[0.2]',
    "Passive": 'bg-passive-card/[0.2]',
    "Free Strike Action": 'bg-free-strike-card/[0.2]',
}

export const actionTextColorStyle: Record<string,string> = {
    "Action": 'text-action-card',
    "Maneuver": 'text-maneuver-card',
    "Triggered Action": 'text-triggered-action-card',
    "Free Triggered Action": 'text-free-triggered-action-card',
    "Free Maneuver": 'text-free-maneuver-card',
    "Routine": 'text-routine-card',
    "Passive": 'text-passive-card',
    "Free Strike Action": 'text-free-strike-card',
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
    '1 Enemy',
    '1 Ally',
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
]

export const rawKeywords = [
    '—',
    'Animal',
    'Animapathy',
    'Area',
    'Aura',
    'Charge',
    'Chronopathy',
    'Cryokinesis',
    'Earth',
    'Fire',
    'Green',
    'Magic',
    'Melee',
    'Metamorphosis',
    'Persistent',
    'Psionic',
    'Pyrokinesis',
    'Ranged',
    'Resopathy',
    'Rot',
    'Routine',
    'Strike',
    'Telekinesis',
    'Telepathic',
    'Telepathy',
    'Void',
    'Weapon',

    'Light armor',
    'Light weapon',
    'Medium armor',
    'Medium weapon',
    'Heavy weapon',
    'Heavy armor',
    'Bow',
    'Implement',
    'Net',
    'Orb',
    'Polearm',
    'Shield',
    'Wand',
    'Whip',
    'Arms',
    'Feet',
    'Hands',
    'Head',
    'Neck',
    'Ring',
    'Waist',
    'Oil',
    'Potion',
    'Scroll',
]

export const keywords = rawKeywords.map((s) => {return {value: s, label: s}})

