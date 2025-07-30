import {characteristic} from "./ability-card.ts";

export class HeroData {
  characteristics: CharacteristicSet;
  bonus: Bonus[];

  constructor({characteristics, bonus} : {characteristics?: CharacteristicSet, bonus?: Bonus[]}) {
    this.characteristics = characteristics || new CharacteristicSet({});
    this.bonus = bonus || [];
  }

  public toJSON() {
    return {
      characteristics: this.characteristics,
      bonus: this.bonus,
    }
  }

  public static fromJSON(jsonObj : object): HeroData {
    if (!jsonObj || !("characteristics" in jsonObj && "bonus" in jsonObj)) {
      return new HeroData({characteristics: new CharacteristicSet({}), bonus: []});
    }
    const cast = jsonObj as {
      characteristics: object,
      bonus: object[],
    }
    return new HeroData({
      characteristics: CharacteristicSet.fromJSON(cast.characteristics),
      bonus: cast.bonus.map((b: object) => Bonus.fromJSON(b)).filter(b => b !== undefined),
    })
  }

}

export class CharacteristicSet {
  private might?: number
  private agility?: number
  private reason?: number
  private intuition?: number
  private presence?: number

  constructor({might, agility, reason, intuition, presence} : {
    might?: number
    agility?: number
    reason?: number
    intuition?: number
    presence?: number
  }) {
    this.might = might
    this.agility = agility
    this.reason = reason
    this.intuition = intuition
    this.presence = presence
  }

  public has(this: CharacteristicSet, key: characteristic) {
    return !(this.get(key) === undefined || this.get(key) === null);
  }

  public get(this: CharacteristicSet, key: characteristic) {
    switch (key) {
      case characteristic.MIGHT: return this.might;
      case characteristic.AGILITY: return this.agility;
      case characteristic.REASON: return this.reason;
      case characteristic.INTUITION: return this.intuition;
      case characteristic.PRESENCE: return this.presence;
    }
  }

  public set(this: CharacteristicSet, key: characteristic, value: number | undefined) {
    let isNew = false;
    switch (key) {
      case characteristic.MIGHT: isNew = this.might === undefined; this.might = value; return isNew;
      case characteristic.AGILITY: isNew = this.agility === undefined; this.agility = value; return isNew;
      case characteristic.REASON: isNew = this.reason === undefined; this.reason = value; return isNew;
      case characteristic.INTUITION: isNew = this.intuition === undefined; this.intuition = value; return isNew;
      case characteristic.PRESENCE: isNew = this.presence === undefined; this.presence = value; return isNew;
    }
  }

  public toJSON() : object {
    return {
      might: this.might,
      agility: this.agility,
      reason: this.reason,
      intuition: this.intuition,
      presence: this.presence,
    };
  }

  public static fromJSON(jsonObj : object): CharacteristicSet | undefined {
    if (!jsonObj) {
      return undefined;
    }
    return new CharacteristicSet(jsonObj)
  }
}

export abstract class Bonus {
  keywordMatcher: string[]; // If all keywords match the ability, the bonus is applied
  type: string; // "Kit" or "Honed ability"; only apply the highest bonus of a type
  private keywordMatcherSet: Set<string>; // If all keywords match the ability, the bonus is applied

  protected constructor({keywordMatcher, type}: {keywordMatcher: string[], type: string}) {
    this.keywordMatcher = keywordMatcher;
    this.keywordMatcherSet = new Set(keywordMatcher);
    this.type = type;
  }

  matchesKeywords(this: Bonus, keywords: string[]) {
    const allKeywords = new Set(keywords);
    for (const k of this.keywordMatcher) {
      if (!allKeywords.has(k)) {
        return false;
      }
    }
    return true;
  }

  hasKeyword(this: Bonus, keyword: string): boolean {
    return this.keywordMatcherSet.has(keyword);
  }

  getAllKeywords(this: Bonus): string[] {
    return Array.from(this.keywordMatcherSet);
  }

  setKeyword(this: Bonus, keyword: string) {
    this.keywordMatcherSet.add(keyword);
    this.keywordMatcher = Array.from(this.keywordMatcherSet);
  }

  deleteKeyword(this: Bonus, keyword: string) {
    this.keywordMatcherSet.delete(keyword);
    this.keywordMatcher = Array.from(this.keywordMatcherSet);
  }

  public static fromJSON(jsonObj : object): DistanceBonus | DamageBonus | undefined {
    return DistanceBonus.fromJSON(jsonObj) || DamageBonus.fromJSON(jsonObj);
  }
}

export class DistanceBonus extends Bonus {
  distanceType: string; // "Ranged" or "Melee"
  value: number;

  constructor({keywordMatcher, type, distanceType, value}: {keywordMatcher: string[], type: string, distanceType: string, value: number}) {
    super({keywordMatcher, type});
    this.distanceType = distanceType;
    this.value = value;
  }

  public toJSON() {
    return {
      keywordMatcher: this.keywordMatcher,
      type: this.type,
      distanceType: this.distanceType,
      value: this.value
    }
  }

  public static fromJSON(jsonObj : object) {
    if (!jsonObj || !("type" in jsonObj && "keywordMatcher" in jsonObj && "distanceType" in jsonObj && "value" in jsonObj)) {
      return undefined;
    }
    return new DistanceBonus(jsonObj as {
      keywordMatcher: string[],
      type: string,
      distanceType: string,
      value: number,
    });
  }
}

export class DamageBonus extends Bonus {
  rolledDamageBonus: RolledDamageBonus;

  constructor({keywordMatcher, type, rolledDamageBonus}: {keywordMatcher: string[], type: string, rolledDamageBonus: RolledDamageBonus}) {
    super({keywordMatcher, type});
    this.rolledDamageBonus = rolledDamageBonus;
  }

  getBonusForTier(this: DamageBonus, tier: number): number {
    if (this.isFlatBonus()) {
      return this.rolledDamageBonus as number;
    } else {
      switch (tier) {
        case 1: return (this.rolledDamageBonus as {t1: number}).t1;
        case 2: return (this.rolledDamageBonus as {t2: number}).t2;
        case 3: return (this.rolledDamageBonus as {t3: number}).t3;
        default: return 0;
      }
    }
  }

  isFlatBonus(this: DamageBonus) : boolean {
    return (typeof this.rolledDamageBonus === "number")
  }

  public toJSON() {
    return {
      keywordMatcher: this.keywordMatcher,
      type: this.type,
      rolledDamageBonus: this.rolledDamageBonus,
    }
  }

  public static fromJSON(jsonObj : object) {
    if (!jsonObj || !("type" in jsonObj && "keywordMatcher" in jsonObj && "rolledDamageBonus" in jsonObj)) {
      return undefined;
    }
    return new DamageBonus(jsonObj as {
      keywordMatcher: string[],
      type: string,
      rolledDamageBonus: RolledDamageBonus,
    });
  }
}

export type RolledDamageBonus =  number | {
  t1: number;
  t2: number;
  t3: number;
};

export const buildEmptyHeroData = function () : HeroData {
  return new HeroData({})
}

export const CloakAndDaggerShadow = new HeroData({
  characteristics: new CharacteristicSet({
    might: 1,
    agility: 2,
    reason: 0,
    intuition: 0,
    presence: 2,
  }),
  bonus: [
    new DamageBonus({
      type: "Kit",
      keywordMatcher: ["Melee", "Weapon"],
      rolledDamageBonus: {
        t1: 1,
        t2: 1,
        t3: 1,
      }
    }),
    new DamageBonus({
      type: "Kit",
      keywordMatcher: ["Ranged", "Weapon"],
      rolledDamageBonus: {
        t1: 1,
        t2: 1,
        t3: 1,
      }
    }),
    new DistanceBonus({
      type: "Kit",
      keywordMatcher: ["Ranged", "Weapon"],
      distanceType: "Ranged",
      value: 5,
    }),
  ],
});
