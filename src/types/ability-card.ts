export type ability_card = {
  version: 2;
  level: number; // level ability is available
  type: string;
  header: header;
  body: body[];
  cost?: {
    costName: string;
    costValue: string;
  };
  fontSizePtOverrides?: {
    topMatter?: number;
    titleFont?: number;
    flavour?: number;
    body?: number;
    powerRoll?: number;
  }
}

export type header = {
  topMatter: string;
  title: string;
  flavour: string;
  keywords: string[];
  distance: distance;
  target: string; // copy-paste of target from book. e.g "Two creatures or objects"
}

// e.g. Two Shot
//
// {
//   display: "Ranged [12]"
//   values: [
//     {
//       type: "Ranged"
//       baseValue: 12
//       includedKitValue: 7
//     }
//   ]
//
export type distance = {
  display: string; // copy-paste of distance from book, modified for customisable values. e.g. "Melee [1] or Ranged [5]" or "4 Cube within [10]"
  values: distance_value[]
}

export type distance_value = {
  type: string; // key of the distance value from the character. e.g. "Melee" or "Ranged"
  baseValue: number; // base value of the distance from the book, with kit value if a Kit Signature Ability
  includedKitValue: number; // included kit value of the ability, if any
}

export type body = power_roll | effect | spacer;

export type power_roll = {
  isPowerRoll: true;
  characteristicBonus: string | characteristic[];
  t1: power_roll_tier;
  t2: power_roll_tier;
  t3: power_roll_tier;
}

// e.g.Net and Stab
//
// {
//   damage: {
//     baseValue: 8
//     includedKitValue: 2
//     characteristic: [
//       MIGHT,
//       AGILITY
//     ]
//   }
//   baseEffect: "damage"
//   potency: {
//     characteristic: AGILITY
//     strength: STRONG
//     effect: restrained (EoT)
//   }
// }
export type power_roll_tier = {
  damage?: damage;
  baseEffect?: string; // Base effect, including damage type or just "damage"
  potency?: potency;
}

export type damage = {
  baseValue: number; // base value the damage from the book, with kit value if a Kit Signature Ability
  includedKitValue: number; // included kit value of the ability, if any\
  characteristicBonusOptions: characteristic[]
  otherBonus: string | undefined; // this supports the dice rolling edge case from things like coup de grace. e.g. "2d6"
}

export type potency = {
  characteristic: characteristic; // characteristic of potency
  strength: number | potency_strength; // strength of the potency effect, uses character data or card level to translate
  effect: string; // copy-paste effect from the book, not including leading comma e.g. "prone"
}

export type effect = {
  isEffect: true;
  title: string;
  body: string;
}

export type spacer = {
  isSpacer: true;
  sizePt: number;
}

export enum characteristic {
  MIGHT = "Might",
  AGILITY = "Agility",
  REASON = "Reason",
  INTUITION = "Intuition",
  PRESENCE = "Presence"
}

export const all_characteristics = [
  characteristic.MIGHT,
  characteristic.AGILITY,
  characteristic.REASON,
  characteristic.INTUITION,
  characteristic.PRESENCE,
]

export enum potency_strength {
  WEAK,
  AVERAGE,
  STRONG
}
