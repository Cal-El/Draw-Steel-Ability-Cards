import {characteristic} from "./ability-card.ts";

export type character_data = {
  characteristics: Map<characteristic, number>;
  bonus: (distance_bonus | damage_bonus)[]
}

export type bonus = {
  keyword_matcher: Set<string>; // If all keywords match the ability, the bonus is applied
  type: string; // "Kit" or "Honed ability"; only apply the highest bonus of a type
}

export type distance_bonus = bonus & {
  distance_type: string; // "Ranged" or "Melee"
  value: number;
}

export type damage_bonus = bonus & {
  rolled_damage_bonus: number | {
    t1: number;
    t2: number;
    t3: number;
  }
}
