import {
  ability_card as old_card,
  body_statement,
  distance_block,
  key_value_statement,
  power_roll_statement,
  power_roll_tier as old_tier,
  spacer_statement
} from "../types/ability-card-types.ts";
import {
  ability_card as new_card,
  body,
  characteristic,
  distance_value,
  effect,
  power_roll,
  power_roll_tier as new_tier,
  spacer
} from "../types/ability-card.ts";
import {character_data, distance_bonus} from "../types/character-data.ts";


const fontSizeTranslate = function (size: number | undefined) {
  return size ? size + "pt" : undefined;
}

function parseSpelledNumber(s: string) {
  switch (s) {
    case "one": return 1;
    case "two": return 2;
    case "three": return 3;
    case "four": return 4;
    case "five": return 5;
    case "six": return 6;
    case "seven": return 7;
    case "eight": return 8;
    case "nine": return 9;
    case "ten": return 10;
    default: return 0;
  }
}

function parseDistanceVal(matchedVal: string, filteredBonuses: distance_bonus[], d: distance_value) {
  if (matchedVal.startsWith('[') && matchedVal.endsWith(']')) {
    // Handle value with bonuses
    //
    let bonusTypes: Record<string, number> = {}
    filteredBonuses.filter(b => d.type === b.distance_type)
      .forEach(b => {
        if (b.type in bonusTypes) {
          bonusTypes[b.type] = Math.max(bonusTypes[b.type], b.value)
        } else {
          bonusTypes[b.type] = b.value
        }
      })
    let totalBonuses = 0
    for (const key in bonusTypes) {
      totalBonuses += bonusTypes[key]
    }
    return d.baseValue + totalBonuses - ("Kit" in bonusTypes ? d.includedKitValue : 0)
  } else {
    return parseInt(matchedVal)
  }
}

const translateDistance = function (card: new_card, characterData: character_data) : distance_block[] {
  const d = card.header.distance;
  const bonuses = characterData.bonus.filter(b => {
    for (const keyword in b.keyword_matcher) {
      if (!(keyword in card.header.keywords)) {
        return false
      }
    }
    return (b as distance_bonus).distance_type !== undefined
  }).map(b => (b as distance_bonus))

  const burst = new RegExp(`(\[?\d+\]?) burst`)
  const burstMatch = burst.exec(d.display.toLowerCase())
  if (burstMatch) {
    const val = parseDistanceVal(burstMatch[0], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Burst",
        distanceValue: val.toString()
      }
    ]
  }

  const aura = new RegExp(`(\[?\d+\]?) aura`)
  const auraMatch = aura.exec(d.display.toLowerCase())
  if (auraMatch) {
    const val = parseDistanceVal(auraMatch[0], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Aura",
        distanceValue: val.toString()
      }
    ]
  }

  const cube = new RegExp(`(\[?\d+\]?) cube within (\[?\d+\]?)`)
  const cubeMatch = cube.exec(d.display.toLowerCase())
  if (cubeMatch) {
    const cubeVal = parseDistanceVal(cubeMatch[0], bonuses, d.values[0]);
    const withinVal = parseDistanceVal(cubeMatch[1], bonuses, d.values[1]);
    return [
      {
        distanceHeader: "Cube",
        distanceValue: cubeVal.toString()
      },
      {
        distanceHeader: ("Ranged" in card.header.keywords) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const line = new RegExp(`(\w*?) ?(\d+ [x|×] \d+) lines? within (\[?\d+\]?)`)
  const lineMatch = line.exec(d.display.toLowerCase())
  if (lineMatch) {
    const withinVal = parseDistanceVal(lineMatch[2], bonuses, d.values[0]);
    const blocks : distance_block[] = lineMatch[0] ? [{
      distanceHeader: "Lines",
      distanceValue: parseSpelledNumber(lineMatch[0]).toString()
    }] : []
    return [...blocks,
      {
        distanceHeader: "Line",
        distanceValue: lineMatch[1].replace("×", "x").replace(" ", "")
      },
      {
        distanceHeader: ("Ranged" in card.header.keywords) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const wall = new RegExp(`(\[?\d+\]?) wall within (\[?\d+\]?)`)
  const wallMatch = wall.exec(d.display.toLowerCase())
  if (wallMatch) {
    const wallVal = parseDistanceVal(wallMatch[0], bonuses, d.values[0]);
    const withinVal = parseDistanceVal(wallMatch[1], bonuses, d.values[1]);
    return [
      {
        distanceHeader: "Wall",
        distanceValue: wallVal.toString()
      },
      {
        distanceHeader: ("Ranged" in card.header.keywords) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const meleeOrRanged = new RegExp(`melee (\[?\d+\]?) or ranged (\[?\d+\]?)`)
  const meleeOrRangedMatch = meleeOrRanged.exec(d.display.toLowerCase())
  if (meleeOrRangedMatch) {
    const cardKeywordsMinusRanged = card.header.keywords.filter(k => k !== "Ranged");
    const bonusesWithoutRanged = bonuses.filter(b => {
      for (const k of b.keyword_matcher) {
         if (!(k in cardKeywordsMinusRanged)) {
           return false;
         }
      }
      return true;
    })
    const cardKeywordsMinusMelee = card.header.keywords.filter(k => k !== "Ranged");
    const bonusesWithoutMelee = bonuses.filter(b => {
      for (const k of b.keyword_matcher) {
        if (!(k in cardKeywordsMinusMelee)) {
          return false;
        }
      }
      return true;
    })
    const meleeVal = parseDistanceVal(meleeOrRangedMatch[0], bonusesWithoutRanged, d.values[0]);
    const rangedVal = parseDistanceVal(meleeOrRangedMatch[1], bonusesWithoutMelee, d.values[1]);
    return [
      {
        distanceHeader: "Melee",
        distanceValue: meleeVal.toString()
      },
      {
        distanceHeader: "Ranged",
        distanceValue: rangedVal.toString()
      },
    ]
  }

  const melee = new RegExp(`melee (\[?\d+\]?)`)
  const meleeMatch = melee.exec(d.display.toLowerCase())
  if (meleeMatch) {
    const val = parseDistanceVal(meleeMatch[0], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Melee",
        distanceValue: val.toString()
      },
    ]
  }

  const ranged = new RegExp(`ranged (\[?\d+\]?)`)
  const rangedMatch = ranged.exec(d.display.toLowerCase())
  if (rangedMatch) {
    const val = parseDistanceVal(rangedMatch[0], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Ranged",
        distanceValue: val.toString()
      },
    ]
  }

  return []
}

const translatePrCharacteristic = function (pr: power_roll, characteristics: Map<characteristic, number>) : string {
  if ((pr.characteristicBonus as string).length > 0) {
    return pr.characteristicBonus as string
  }
  const charOptions = pr.characteristicBonus as characteristic[]
  let bestBonus = 0;
  for (const c of charOptions) {
    if (characteristics.has(c)) {
      bestBonus = Math.max(bestBonus, characteristics.get(c) || 0)
    } else {
      return charOptions.map(
        (x, i, arr) => {
          const reStr = i + 1 >= arr.length ? "or " : "";
          switch (x) {
            case characteristic.MIGHT:
              return reStr + "Might";
            case characteristic.AGILITY:
              return reStr + "Agility";
            case characteristic.REASON:
              return reStr + "Reason";
            case characteristic.INTUITION:
              return reStr + "Intuition";
            case characteristic.PRESENCE:
              return reStr + "Presence";
          }
        }
      ).join(", ")
    }
  }
  return ""
}

const translatePrTier = function (tier: new_tier, card: new_card, characterData: character_data) : old_tier {
  return {
    hasDamage: tier.damage !== undefined,
    damageValue: "",
    hasGeneralEffect: tier.baseEffect !== undefined,
    generalEffect: "",
    hasPotency: tier.potency !== undefined,
    potencyValue: "",
    potencyEffect: tier.potency?.effect,
  } satisfies old_tier;
}

const translateBodyElement = function (element: body, card: new_card, characterData: character_data) : body_statement | undefined {
  if ((element as power_roll).isPowerRoll) {
    const pr = element as power_roll;
    return {
      characteristic: translatePrCharacteristic(pr, characterData.characteristics),
      t1: translatePrTier(pr.t1, card, characterData),
      t2: translatePrTier(pr.t2, card, characterData),
      t3: translatePrTier(pr.t3, card, characterData),
    } satisfies power_roll_statement
  } else if ((element as effect).isEffect) {
    return {
      key: (element as effect).title,
      value: (element as effect).body,
    } satisfies key_value_statement
  } else if ((element as spacer).isSpacer) {
    return {
      spacePt: (element as spacer).sizePt,
    } satisfies spacer_statement
  }
  return undefined;
}

export function DowngradeCard (card: new_card, characterData: character_data | undefined) : old_card {
  const ch_data = characterData ? characterData : {
    characteristics: new Map<characteristic, number>(),
    bonus: [],
  } satisfies character_data

  const translatedTarget = card.header.target;
  const translatedDistance = translateDistance(card, ch_data);
  const translatedBody: body_statement[] = card.body.map(b => translateBodyElement(b, card, ch_data)).filter(b => b !== undefined);

  return {
    type: card.type,
    topMatter: card.header.topMatter,
    title: card.header.title,
    flavour: card.header.flavour,
    keywords: card.header.keywords,
    hasCost: card.cost !== undefined,
    cost: card.cost,
    target: translatedTarget,
    distance: translatedDistance,
    statements: translatedBody,
    topMatterFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.topMatter),
    titleFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.titleFont),
    flavourFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.flavour),
    bodyFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.body),
    powerRollFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.powerRoll),
  }
}
