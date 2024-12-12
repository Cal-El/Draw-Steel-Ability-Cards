export const cardbackColorStyle = {
    "Action": 'bg-cardback border-action-card',
    "Maneuver": 'bg-cardback border-maneuver-card',
    "Triggered Action": 'bg-cardback border-triggered-action-card',
}

export const actionBg100ColorStyle = {
    "Action": 'bg-action-card',
    "Maneuver": 'bg-maneuver-card',
    "Triggered Action": 'bg-triggered-action-card',
}
export const actionBg50ColorStyle = {
    "Action": 'bg-action-card/[0.5]',
    "Maneuver": 'bg-maneuver-card/[0.5]',
    "Triggered Action": 'bg-triggered-action-card/[0.5]',
}
export const actionBg40ColorStyle = {
    "Action": 'bg-action-card/[0.4]',
    "Maneuver": 'bg-maneuver-card/[0.4]',
    "Triggered Action": 'bg-triggered-action-card/[0.4]',
}
export const actionBg30ColorStyle = {
    "Action": 'bg-action-card/[0.3]',
    "Maneuver": 'bg-maneuver-card/[0.3]',
    "Triggered Action": 'bg-triggered-action-card/[0.3]',
}
export const actionBg20ColorStyle = {
    "Action": 'bg-action-card/[0.2]',
    "Maneuver": 'bg-maneuver-card/[0.2]',
    "Triggered Action": 'bg-triggered-action-card/[0.2]',
}

export const actionTextColorStyle = {
    "Action": 'text-action-card',
    "Maneuver": 'text-maneuver-card',
    "Triggered Action": 'text-triggered-action-card',
}

export type ability_card = {
    type: string;
    source: string;
    title: string
    flavour: string;
    keywords: string[];
    statements: body_statement[];
    hasCost: boolean;
    cost: {
        costName: string;
        costValue: number;
    } | null;
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
    damageValue: string;
    damageType: string;
    hasGeneralEffect: boolean;
    generalEffect: string;
    hasPotency: boolean;
    potencyValue: string;
    potencyEffect: string;
}

export type distance_block = {
    distanceHeader: string;
    distanceValue: string;
}
