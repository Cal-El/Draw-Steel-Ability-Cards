import {
  ability_card as old_card,
  abilityType as old_types,
  body_statement,
  distance_block,
  key_value_statement,
  power_roll_statement,
  power_roll_tier as old_tier,
  spacer_statement
} from "../types/ability-card-types.ts";
import {
  ability_card as new_card,
  abilityType as new_types,
  body,
  characteristic, damage,
  distance_value,
  effect,
  power_roll,
  power_roll_tier as new_tier,
  spacer
} from "../types/ability-card.ts";
import {
  HeroData,
  buildEmptyHeroData,
  CharacteristicSet, DistanceBonus, DamageBonus
} from "../types/character-data.ts";


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
  if (!s) return ''
  switch (s.toLowerCase()) {
    case 'self': return 'Self';
    case 'self; see below': return 'Self';
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
    case 'all creatures': return 'All Creatures';
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

function parseDistanceVal(matchedVal: string, filteredBonuses: DistanceBonus[], ds: distance_value[]) {
  if (matchedVal.startsWith('[') && matchedVal.endsWith(']')) {
    const d = ds.pop()
    if (!d) {
      return parseInt(matchedVal.slice(1, matchedVal.length - 1))
    }
    // Handle value with bonuses
    //
    const bonusTypes: Map<string, number> = new Map()
    filteredBonuses.filter(b => d.type === b.distanceType)
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

function parseBaseDamageVal(tierNum: number, filteredBonuses: DamageBonus[], d: damage) {
  // Handle value with bonuses
  //
  const bonusTypes: Map<string, number> = new Map()
  filteredBonuses.forEach(b => {
    bonusTypes.set(b.type, Math.max((bonusTypes.get(b.type) || 0), b.getBonusForTier(tierNum)))
  })
  let totalBonuses = 0
  for (const key of bonusTypes.keys()) {
    totalBonuses += bonusTypes.get(key) || 0
  }
  return d.baseValue + totalBonuses - (bonusTypes.has("Kit") ? d.includedKitValue : 0)

}

const translateDistance = function (card: new_card, heroData: HeroData) : {distanceBlocks: distance_block[], additionalBody?: body_statement[]} {
  const d = card.header.distance;
  if (d.display.toLowerCase() === 'self' || d.display.toLowerCase() === 'self; see below') {
    return {distanceBlocks: [{distanceHeader: 'Distance', distanceValue: 'Self'}]};
  }
  if (d.display.toLowerCase() === 'special') {
    return {distanceBlocks: [{distanceHeader: 'Distance', distanceValue: 'Special'}]};
  }

  if (!d.display) return {distanceBlocks: []}
  const dVals = [...d.values].reverse();

  const bonuses = heroData.bonus.filter(b => b.matchesKeywords(card.header.keywords) && (b instanceof DistanceBonus))
    .map(b => (b as DistanceBonus))

  const burst = new RegExp(/(\[?\d+\]?) burst/)
  const burstMatch = burst.exec(d.display.toLowerCase())
  if (burstMatch) {
    const val = parseDistanceVal(burstMatch[1], bonuses, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Burst",
        distanceValue: val.toString()
      }
    ]}
  }

  const aura = new RegExp(/(\[?\d+\]?) aura/)
  const auraMatch = aura.exec(d.display.toLowerCase())
  if (auraMatch) {
    const val = parseDistanceVal(auraMatch[1], bonuses, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Aura",
        distanceValue: val.toString()
      }
    ]}
  }

  const cube = new RegExp(/(\w*?) ?(\[?\d+\]?) cubes? within (\[?\d+\]?)/)
  const cubeMatch = cube.exec(d.display.toLowerCase())
  if (cubeMatch) {
    const blocks : distance_block[] = cubeMatch[1] ? [{
      distanceHeader: "Cubes",
      distanceValue: parseSpelledNumber(cubeMatch[1]).toString()
    }] : []
    const cubeVal = parseDistanceVal(cubeMatch[2], bonuses, dVals);
    const withinVal = parseDistanceVal(cubeMatch[3], bonuses, dVals);
    return {distanceBlocks: [...blocks,
      {
        distanceHeader: "Cube",
        distanceValue: cubeVal.toString()
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]}
  }

  const line = new RegExp(/(\w*?) ?(\d+ [x|×] \d+) lines? within (\[?\d+\]?)/)
  const lineMatch = line.exec(d.display.toLowerCase())
  if (lineMatch) {
    const withinVal = parseDistanceVal(lineMatch[3], bonuses, dVals);
    const blocks : distance_block[] = lineMatch[1] ? [{
      distanceHeader: "Lines",
      distanceValue: parseSpelledNumber(lineMatch[1]).toString()
    }] : []
    return {distanceBlocks: [...blocks,
      {
        distanceHeader: "Line",
        distanceValue: lineMatch[2].replace("×", "x").replace(" ", "")
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]}
  }

  const wall = new RegExp(/(\[?\d+\]?) wall within (\[?\d+\]?)/)
  const wallMatch = wall.exec(d.display.toLowerCase())
  if (wallMatch) {
    const wallVal = parseDistanceVal(wallMatch[1], bonuses, dVals);
    const withinVal = parseDistanceVal(wallMatch[2], bonuses, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Wall",
        distanceValue: wallVal.toString()
      },
      {
        distanceHeader: (card.header.keywords.includes("Ranged")) ? "Ranged" : "Within",
        distanceValue: withinVal.toString()
      },
    ]}
  }

  const meleeOrRanged = new RegExp(/melee (\[?\d+\]?) or ranged (\[?\d+\]?)/)
  const meleeOrRangedMatch = meleeOrRanged.exec(d.display.toLowerCase())
  if (meleeOrRangedMatch) {
    const cardKeywordsMinusRanged = card.header.keywords.filter(k => k !== "Ranged");
    const bonusesWithoutRanged = bonuses.filter(b => b.matchesKeywords(cardKeywordsMinusRanged));
    const cardKeywordsMinusMelee = card.header.keywords.filter(k => k !== "Melee");
    const bonusesWithoutMelee = bonuses.filter(b => b.matchesKeywords(cardKeywordsMinusMelee));
    const meleeVal = parseDistanceVal(meleeOrRangedMatch[1], bonusesWithoutRanged, dVals);
    const rangedVal = parseDistanceVal(meleeOrRangedMatch[2], bonusesWithoutMelee, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Melee",
        distanceValue: meleeVal.toString()
      },
      {
        distanceHeader: "Ranged",
        distanceValue: rangedVal.toString()
      },
    ]}
  }

  const melee = new RegExp(/melee (\[?\d+\]?)/)
  const meleeMatch = melee.exec(d.display.toLowerCase())
  if (meleeMatch) {
    const val = parseDistanceVal(meleeMatch[1], bonuses, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Melee",
        distanceValue: val.toString()
      },
    ]}
  }

  const ranged = new RegExp(/ranged (\[?\d+\]?)/)
  const rangedMatch = ranged.exec(d.display.toLowerCase())
  if (rangedMatch) {
    const val = parseDistanceVal(rangedMatch[1], bonuses, dVals);
    return {distanceBlocks: [
      {
        distanceHeader: "Ranged",
        distanceValue: val.toString()
      },
    ]}
  }

  if (d.display.length > 0) {
    return {distanceBlocks: [
        {distanceHeader: "Distance", distanceValue: "Special"}
    ],
    additionalBody: [
      {key: "Distance", value: d.display}
    ]}
  }

  return {distanceBlocks: []}
}

const translatePrCharacteristic = function (pr: power_roll, characteristics: CharacteristicSet) : string {
  if (typeof pr.characteristicBonus === 'string') {
    return pr.characteristicBonus as string
  }
  const charOptions = pr.characteristicBonus as characteristic[]
  let bestBonus = -1;
  for (const c of charOptions) {
    if (characteristics.has(c)) {
      bestBonus = Math.max(bestBonus, characteristics.get(c) || -1)
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

const translatePrTier = function (tier: new_tier, tierNum: number, card: new_card, heroData: HeroData) : old_tier {
  const bonuses = heroData.bonus.filter(b => b.matchesKeywords(card.header.keywords) && b instanceof DamageBonus)
    .map(b => (b as DamageBonus))

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
      const isMeleeNotRanged = b.hasKeyword("Melee") && !b.hasKeyword("Ranged")
      const isRangedNotMelee = b.hasKeyword("Ranged") && !b.hasKeyword("Melee")
      return isMeleeNotRanged || isRangedNotMelee
    }).length > 0) {
      // Card contains both melee and ranged keywords and there are bonuses that affect only melee and ranged abilities
      damage = parseBaseDamageVal(tierNum, bonuses.filter(b => !b.hasKeyword("Ranged")), tier.damage)
      altDamage = parseBaseDamageVal(tierNum, bonuses.filter(b => !b.hasKeyword("Melee")), tier.damage)
      if (damage === altDamage) {
        altDamage = undefined
      }
    } else {
      damage = parseBaseDamageVal(tierNum, bonuses, tier.damage)
    }
    const effectPrefix = tier.damage.otherBonus ? `+ ${tier.damage.otherBonus}` : "";

    if (tier.damage?.characteristicBonusOptions.length === 0) {
      // Super simple "2"
      return {
        damageString: `${damage}${altDamage ? "|" + altDamage : ""}`,
        effectPrefix: effectPrefix,
      }
    } else if (tier.damage?.characteristicBonusOptions.length === 1) {
      // Super simple "2+M" style damage
      if (heroData.characteristics.has(tier.damage.characteristicBonusOptions[0])) {
        // Character data includes characteristic, so render as just "2"
        const cValue = heroData.characteristics.get(tier.damage.characteristicBonusOptions[0]) || 0;
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
        if (!heroData.characteristics.has(cOption)) {
          const cOptionsString = commaSeparatedOrString(tier.damage.characteristicBonusOptions.map(c => c.toString()[0]))
          // missing a characteristic option, return complex
          return {
            damageString: `x`,
            // | x | 2 + M or A + 2d6
            effectPrefix: `${damage}${altDamage ? '|' + altDamage : ''} + ${cOptionsString}${effectPrefix ? ' ' + effectPrefix : ''}`
          }
        }
        maxCharacteristic = Math.max(heroData.characteristics.get(cOption) || -1, maxCharacteristic)
      }
      return {
        damageString: `${damage + maxCharacteristic}${altDamage ? '|' + (altDamage + maxCharacteristic) : ''}`,
        // | x | 2 + M or A + 2d6
        effectPrefix: `${effectPrefix ? ' ' + effectPrefix : ''}`
      }
    }
  }

  const dmg = parseDamageBlock()

  return {
    hasDamage: !!tier.damage,
    damageValue: dmg?.damageString,
    hasGeneralEffect: !!tier.baseEffect,
    generalEffect: (dmg?.effectPrefix ? dmg.effectPrefix + " " : "") + tier.baseEffect,
    hasPotency: !!tier.potency,
    potencyValue: `${tier.potency?.characteristic.toString().toLowerCase()[0]}<${tier.potency?.strength.valueOf()}`,
    potencyEffect: tier.potency?.effect,
  } satisfies old_tier;
}

const translateBodyElement = function (element: body, card: new_card, heroData: HeroData) : body_statement | undefined {
  if ((element as power_roll).isPowerRoll) {
    const pr = element as power_roll;
    return {
      characteristic: translatePrCharacteristic(pr, heroData.characteristics),
      t1: translatePrTier(pr.t1, 1, card, heroData),
      t2: translatePrTier(pr.t2, 2, card, heroData),
      t3: translatePrTier(pr.t3, 3, card, heroData),
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

function translateType(s: string) : string {
  const dict = new Map([
    [new_types.mainAction.toLowerCase(), old_types.action],
    [new_types.maneuver.toLowerCase(), old_types.maneuver],
    [new_types.triggeredAction.toLowerCase(), old_types.triggeredAction],
    [new_types.freeManeuver.toLowerCase(), old_types.freeManeuver],
    [new_types.freeTriggeredAction.toLowerCase(), old_types.freeTriggeredAction],
    [new_types.freeStrike.toLowerCase(), old_types.freeStrikeAction],
    [new_types.noAction.toLowerCase(), old_types.routine],
    [new_types.trait.toLowerCase(), old_types.passive],
    [new_types.treasure.toLowerCase(), old_types.treasure],
  ])

  if (dict.has(s.toLowerCase())) {
    return dict.get(s.toLowerCase()) ?? s;
  }
  return s;
}

export function DowngradeCard (card: new_card, heroData: HeroData | undefined) : old_card {
  const ch_data = heroData ? heroData : buildEmptyHeroData()

  let translatedTargetString : string;
  let translatedDistanceBlocks : distance_block[];
  let translatedBody : body_statement[];

  try {
    const translatedTarget = parseTarget(card.header.target);
    translatedTargetString = (typeof translatedTarget === 'string') ? translatedTarget : translatedTarget.target;
    const additionalBody : body_statement[] = ((typeof translatedTarget !== 'string') ? [translatedTarget.additionalBody] : [])
    const translatedDistance = translateDistance(card, ch_data);
    translatedDistanceBlocks = translatedDistance.distanceBlocks;
    translatedBody = additionalBody.concat(...translatedDistance.additionalBody ?? []).concat(card.body.map(b => translateBodyElement(b, card, ch_data)).filter(b => b !== undefined));
  } catch (e) {
    console.error(card.header.title, card.header.topMatter, e)
    throw e
  }

  return {
    type: translateType(card.type),
    topMatter: card.header.topMatter,
    title: card.header.title,
    flavour: card.header.flavour,
    keywords: card.header.keywords,
    hasCost: card.cost !== undefined && card.cost !== null,
    cost: card.cost,
    target: translatedTargetString,
    distance: translatedDistanceBlocks,
    statements: translatedBody,
    topMatterFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.topMatter),
    titleFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.titleFont),
    flavourFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.flavour),
    bodyFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.body),
    powerRollFontSizeOverride: fontSizeTranslate(card.fontSizePtOverrides?.powerRoll),
  }
}
