export enum abilityType {
    action = 'Main Action',
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

export const typeAbbreviation: Record<string,string> = {
    "Main Action": 'MA',
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
