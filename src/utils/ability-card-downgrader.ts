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
  characteristic, damage,
  distance_value,
  effect,
  power_roll,
  power_roll_tier as new_tier,
  spacer
} from "../types/ability-card.ts";
import {character_data, damage_bonus, distance_bonus} from "../types/character-data.ts";


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

function parseTarget(s: string) : string | {target: string, additionalBody: key_value_statement} {
  switch (s.toLowerCase()) {
    case 'self': return 'Self';
    case 'special': return 'Special';
    case 'one creature': return '1 Creature';
    case 'one creature or object': return '1 Creature or Object';
    case 'one willing creature': return '1 Willing Creature';
    case 'one enemy': return '1 Enemy';
    case 'one ally': return '1 Ally';
    case 'one ally or enemy': return '1 Ally or Enemy';
    case 'self and one ally': return 'Self and 1 Ally';
    case 'self or one ally': return 'Self or 1 Ally';
    case 'self or one creature': return 'Self or 1 Creature';
    case 'two creatures': return '2 Creatures';
    case 'two creatures or objects': return '2 Creatures or Objects';
    case 'two enemies': return '2 Enemies';
    case 'two allies': return '2 Allies';
    case 'self and two allies': return 'Self and 2 Allies';
    case 'three creatures': return '3 Creatures';
    case 'three creatures or objects': return '3 Creatures or Objects';
    case 'three enemies': return '3 Enemies';
    case 'three allies': return '3 Allies';
    case 'each creature in the area': return 'All Creatures';
    case 'each enemy in the area': return 'All Enemies';
    case 'each ally in the area': return 'All Allies';
    case 'self and each creature in the area': return 'Self and All Creatures';
    case 'self and each ally in the area': return 'Self and All Allies';
    case 'none': return 'None';
    default: return {target: 'Special', additionalBody: {key: "Target", value: s}}
  }
}

function commaSeparatedOrString(strings: string[]) {
  if (strings.length === 1) {
    return strings[0]
  }
  if (strings.length === 2) {
    return strings.join(" or ")
  }

  return strings.map((s, i, arr) => {
      return (i + 1 >= arr.length ? "or " : "") + s;
  }).join(", ")
}

function parseDistanceVal(matchedVal: string, filteredBonuses: distance_bonus[], d: distance_value) {
  if (matchedVal.startsWith('[') && matchedVal.endsWith(']')) {
    // Handle value with bonuses
    //
    let bonusTypes: Map<string, number> = new Map()
    filteredBonuses.filter(b => d.type === b.distance_type)
      .forEach(b => {
        bonusTypes.set(b.type, Math.max((bonusTypes.get(b.type) || 0), b.value))
      })
    let totalBonuses = 0
    for (const key of bonusTypes.keys()) {
      totalBonuses += bonusTypes.get(key) || 0
    }
    return d.baseValue + totalBonuses - (bonusTypes.has("Kit") ? d.includedKitValue : 0)
  } else {
    return parseInt(matchedVal)
  }
}

function parseBaseDamageVal(tierNum: number, filteredBonuses: damage_bonus[], d: damage) {
  // Handle value with bonuses
  //
  let bonusTypes: Map<string, number> = new Map()
  filteredBonuses.forEach(b => {
    const bb = (typeof b.rolled_damage_bonus === 'number') ? b.rolled_damage_bonus :
      tierNum === 1 ? b.rolled_damage_bonus.t1 :
        tierNum === 2 ? b.rolled_damage_bonus.t2 : b.rolled_damage_bonus.t3;

    bonusTypes.set(b.type, Math.max((bonusTypes.get(b.type) || 0), bb))
  })
  let totalBonuses = 0
  for (const key of bonusTypes.keys()) {
    totalBonuses += bonusTypes.get(key) || 0
  }
  return d.baseValue + totalBonuses - (bonusTypes.has("Kit") ? d.includedKitValue : 0)

}

const translateDistance = function (card: new_card, characterData: character_data) : distance_block[] {
  const d = card.header.distance;
  const bonuses = characterData.bonus.filter(b => {
    for (const keyword in b.keyword_matcher) {
      if (!(card.header.keywords.includes(keyword))) {
        return false
      }
    }
    return (b as distance_bonus).distance_type !== undefined
  }).map(b => (b as distance_bonus))

  const burst = new RegExp(/(\[?\d+\]?) burst/)
  const burstMatch = burst.exec(d.display.toLowerCase())
  if (burstMatch) {
    const val = parseDistanceVal(burstMatch[1], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Burst",
        distanceValue: val.toString()
      }
    ]
  }

  const aura = new RegExp(/(\[?\d+\]?) aura/)
  const auraMatch = aura.exec(d.display.toLowerCase())
  if (auraMatch) {
    const val = parseDistanceVal(auraMatch[1], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Aura",
        distanceValue: val.toString()
      }
    ]
  }

  const cube = new RegExp(/(\[?\d+\]?) cube within (\[?\d+\]?)/)
  const cubeMatch = cube.exec(d.display.toLowerCase())
  if (cubeMatch) {
    const cubeVal = parseDistanceVal(cubeMatch[1], bonuses, d.values[0]);
    const withinVal = parseDistanceVal(cubeMatch[2], bonuses, d.values[1]);
    return [
      {
        distanceHeader: "Cube",
        distanceValue: cubeVal.toString()
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const line = new RegExp(/(\w*?) ?(\d+ [x|×] \d+) lines? within (\[?\d+\]?)/)
  const lineMatch = line.exec(d.display.toLowerCase())
  if (lineMatch) {
    const withinVal = parseDistanceVal(lineMatch[3], bonuses, d.values[0]);
    const blocks : distance_block[] = lineMatch[1] ? [{
      distanceHeader: "Lines",
      distanceValue: parseSpelledNumber(lineMatch[1]).toString()
    }] : []
    return [...blocks,
      {
        distanceHeader: "Line",
        distanceValue: lineMatch[2].replace("×", "x").replace(" ", "")
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const wall = new RegExp(/(\[?\d+\]?) wall within (\[?\d+\]?)/)
  const wallMatch = wall.exec(d.display.toLowerCase())
  if (wallMatch) {
    const wallVal = parseDistanceVal(wallMatch[1], bonuses, d.values[0]);
    const withinVal = parseDistanceVal(wallMatch[2], bonuses, d.values[1]);
    return [
      {
        distanceHeader: "Wall",
        distanceValue: wallVal.toString()
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]
  }

  const meleeOrRanged = new RegExp(/melee (\[?\d+\]?) or ranged (\[?\d+\]?)/)
  const meleeOrRangedMatch = meleeOrRanged.exec(d.display.toLowerCase())
  if (meleeOrRangedMatch) {
    const cardKeywordsMinusRanged = card.header.keywords.filter(k => k !== "Ranged");
    const bonusesWithoutRanged = bonuses.filter(b => {
      for (const k of b.keyword_matcher) {
        if (!cardKeywordsMinusRanged.includes(k)) {
           return false;
         }
      }
      return true;
    })
    const cardKeywordsMinusMelee = card.header.keywords.filter(k => k !== "Melee");
    const bonusesWithoutMelee = bonuses.filter(b => {
      for (const k of b.keyword_matcher) {
        if (!cardKeywordsMinusMelee.includes(k)) {
          return false;
        }
      }
      return true;
    })
    const meleeVal = parseDistanceVal(meleeOrRangedMatch[1], bonusesWithoutRanged, d.values[0]);
    const rangedVal = parseDistanceVal(meleeOrRangedMatch[2], bonusesWithoutMelee, d.values[1]);
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

  const melee = new RegExp(/melee (\[?\d+\]?)/)
  const meleeMatch = melee.exec(d.display.toLowerCase())
  if (meleeMatch) {
    const val = parseDistanceVal(meleeMatch[1], bonuses, d.values[0]);
    return [
      {
        distanceHeader: "Melee",
        distanceValue: val.toString()
      },
    ]
  }

  const ranged = new RegExp(/ranged (\[?\d+\]?)/)
  const rangedMatch = ranged.exec(d.display.toLowerCase())
  if (rangedMatch) {
    const val = parseDistanceVal(rangedMatch[1], bonuses, d.values[0]);
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
  if (typeof pr.characteristicBonus === 'string') {
    return pr.characteristicBonus as string
  }
  const charOptions = pr.characteristicBonus as characteristic[]
  let bestBonus = 0;
  for (const c of charOptions) {
    if (characteristics.has(c)) {
      bestBonus = Math.max(bestBonus, characteristics.get(c) || 0)
    } else {
      return commaSeparatedOrString(charOptions.map(
        (x) => {
          switch (x) {
            case characteristic.MIGHT:
              return "Might";
            case characteristic.AGILITY:
              return "Agility";
            case characteristic.REASON:
              return "Reason";
            case characteristic.INTUITION:
              return "Intuition";
            case characteristic.PRESENCE:
              return "Presence";
          }
        }
      ))
    }
  }
  return `${bestBonus}`
}

const translatePrTier = function (tier: new_tier, tierNum: number, card: new_card, characterData: character_data) : old_tier {
  const bonuses = characterData.bonus.filter(b => {
    for (const keyword in b.keyword_matcher) {
      if (!(card.header.keywords.includes(keyword))) {
        return false
      }
    }
    return (b as damage_bonus).rolled_damage_bonus !== undefined
  }).map(b => (b as damage_bonus))

  const parseDamageBlock = function () : {
    damageString: string;
    effectPrefix: string;
  } | undefined {
    if (!tier.damage) {
      return;
    }

    let damage = 0;
    let altDamage : number | undefined = undefined;
    if (card.header.keywords.includes("Melee") && card.header.keywords.includes("Ranged") && bonuses.filter(b => {
      const isMeleeNotRanged = b.keyword_matcher.has("Melee") && !b.keyword_matcher.has("Ranged")
      const isRangedNotMelee = b.keyword_matcher.has("Ranged") && !b.keyword_matcher.has("Melee")
      return isMeleeNotRanged || isRangedNotMelee
    }).length > 0) {
      // Card contains both melee and ranged keywords and there are bonuses that affect only melee and ranged abilities
      damage = parseBaseDamageVal(tierNum, bonuses.filter(b => !b.keyword_matcher.has("Ranged")), tier.damage)
      altDamage = parseBaseDamageVal(tierNum, bonuses.filter(b => !b.keyword_matcher.has("Melee")), tier.damage)
      if (damage === altDamage) {
        altDamage = undefined
      }
    } else {
      damage = parseBaseDamageVal(tierNum, bonuses, tier.damage)
    }
    let effectPrefix = tier.damage.otherBonus ? `+ ${tier.damage.otherBonus}` : "";

    if (tier.damage?.characteristicBonusOptions.length === 0) {
      // Super simple "2"
      return {
        damageString: `${damage}${altDamage ? "|" + altDamage : ""}`,
        effectPrefix: effectPrefix,
      }
    } else if (tier.damage?.characteristicBonusOptions.length === 1) {
      // Super simple "2+M" style damage
      if (characterData.characteristics.has(tier.damage.characteristicBonusOptions[0])) {
        // Character data includes characteristic, so render as just "2"
        const cValue = characterData.characteristics.get(tier.damage.characteristicBonusOptions[0]) || 0;
        return {
          damageString: `${damage + cValue}${altDamage ? "|" + (altDamage + cValue) : ""}`,
          effectPrefix: effectPrefix,
        }
      } else if (altDamage) {
        return {
          damageString: `${damage}|${altDamage}`,
          effectPrefix: `+ ${tier.damage.characteristicBonusOptions[0].toString()[0]} ${effectPrefix ? ' ' + effectPrefix : ''}`,
        }
      } else {
        return {
          damageString: `${damage}+${tier.damage.characteristicBonusOptions[0].toString().toLowerCase()[0]}`,
          effectPrefix: effectPrefix,
        }
      }
    } else {
      // Complex characteristic options; either make a total (i.e. "2") or the vague value (i.e. "x") and expect values in effect
      let maxCharacteristic = -1;
      for (const cOption of tier.damage.characteristicBonusOptions) {
        if (!characterData.characteristics.has(cOption)) {
          const cOptionsString = commaSeparatedOrString(tier.damage.characteristicBonusOptions.map(c => c.toString()[0]))
          // missing a characteristic option, return complex
          return {
            damageString: `x`,
            // | x | 2 + M or A + 2d6
            effectPrefix: `${damage}${altDamage ? '|' + altDamage : ''} + ${cOptionsString}${effectPrefix ? ' ' + effectPrefix : ''}`
          }
        }
        maxCharacteristic = Math.max(characterData.characteristics.get(cOption) || -1, maxCharacteristic)
      }
      return {
        damageString: `${damage + maxCharacteristic}${altDamage ? '|' + altDamage +  + maxCharacteristic : ''}`,
        // | x | 2 + M or A + 2d6
        effectPrefix: `${effectPrefix ? ' ' + effectPrefix : ''}`
      }
    }
  }

  const dmg = parseDamageBlock()

  return {
    hasDamage: tier.damage !== undefined,
    damageValue: dmg?.damageString,
    hasGeneralEffect: tier.baseEffect !== undefined,
    generalEffect: (dmg?.effectPrefix ? dmg.effectPrefix + " " : "") + tier.baseEffect,
    hasPotency: tier.potency !== undefined,
    potencyValue: `${tier.potency?.characteristic.toString().toLowerCase()[0]}<${tier.potency?.strength.valueOf()}`,
    potencyEffect: tier.potency?.effect,
  } satisfies old_tier;
}

const translateBodyElement = function (element: body, card: new_card, characterData: character_data) : body_statement | undefined {
  if ((element as power_roll).isPowerRoll) {
    const pr = element as power_roll;
    return {
      characteristic: translatePrCharacteristic(pr, characterData.characteristics),
      t1: translatePrTier(pr.t1, 1, card, characterData),
      t2: translatePrTier(pr.t2, 2, card, characterData),
      t3: translatePrTier(pr.t3, 3, card, characterData),
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

  const translatedTarget = parseTarget(card.header.target);
  const translatedTargetString = (typeof translatedTarget === 'string') ? translatedTarget : translatedTarget.target;
  const additionalBody : body_statement[] = ((typeof translatedTarget !== 'string') ? [translatedTarget.additionalBody] : [])
  const translatedDistance = translateDistance(card, ch_data);
  const translatedBody: body_statement[] = additionalBody.concat(card.body.map(b => translateBodyElement(b, card, ch_data)).filter(b => b !== undefined));

  return {
    type: card.type.toLowerCase() === "main action" ? "Action" : card.type,
    topMatter: card.header.topMatter,
    title: card.header.title,
    flavour: card.header.flavour,
    keywords: card.header.keywords,
    hasCost: card.cost !== undefined,
    cost: card.cost,
    target: translatedTargetString,
    distance: translatedDistance,
    statements: translatedBody,
    topMatterFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.topMatter),
    titleFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.titleFont),
    flavourFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.flavour),
    bodyFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.body),
    powerRollFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.powerRoll),
  }
}
