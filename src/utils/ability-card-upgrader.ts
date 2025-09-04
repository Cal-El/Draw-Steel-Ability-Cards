import {
  ability_card as old_card, abilityType as old_types,
  body_statement,
  distance_block,
  key_value_statement,
  power_roll_statement,
  power_roll_tier as old_tier,
  spacer_statement,
} from "../types/ability-card-types.ts";
import {
  ability_card as new_card, abilityType as new_types,
  all_characteristics,
  body,
  characteristic,
  damage,
  distance, distance_value,
  effect,
  potency,
  potency_strength,
  power_roll,
  power_roll_tier,
  spacer
} from "../types/ability-card.ts";

function translateTarget(t: string) : string {
  switch (t.toLowerCase()) {
    case 'self': return 'Self';
    case 'special': return 'Special';
    case '1 creature': return 'One creature';
    case '1 creature or object': return 'One creature or object';
    case '1 willing creature': return 'One willing creature';
    case '1 enemy': return 'One enemy';
    case '1 ally': return 'One ally';
    case '1 ally or enemy': return 'One ally or enemy';
    case 'self and 1 ally': return 'Self and one ally';
    case 'self or 1 ally': return 'Self or one ally';
    case 'self or 1 creature': return 'Self or one creature';
    case '2 creatures': return 'Two creatures';
    case '2 creatures or objects': return 'Two creatures or objects';
    case '2 enemies': return 'Two enemies';
    case '2 allies': return 'Two allies';
    case 'self and 2 allies': return 'Self and two allies';
    case '3 creatures': return 'Three creatures';
    case '3 creatures or objects': return 'Three creatures or objects';
    case '3 enemies': return 'Three enemies';
    case '3 allies': return 'Three allies';
    case 'all creatures': return 'Each creature in the area';
    case 'all enemies': return 'Each enemy in the area';
    case 'all allies': return 'Each ally in the area';
    case 'self and all creatures': return 'Self and each creature in the area';
    case 'self and all allies': return 'Self and each ally in the area';
    case 'none': return 'None';
    default: return t;
  }
}

function translateDistance(ks: string[], ds: distance_block[]) : distance {
  let displayText = '';
  let values : distance_value[] = [];
  for (const d of ds) {
    if (d.distanceHeader === 'Aura') {
      displayText = d.distanceValue + ' aura';
    }
    if (d.distanceHeader === 'Burst') {
      displayText = d.distanceValue + ' burst';
    }
    if (d.distanceHeader === 'Cube') {
      displayText = d.distanceValue + ' cube within ';
    }
    if (d.distanceHeader === 'Wall') {
      displayText = d.distanceValue + ' wall within ';
    }
    if (d.distanceHeader === 'Line') {
      displayText = d.distanceValue.replace('x', '×').split('×').join(' × ') + ' line within ';
    }
    if (d.distanceHeader === 'Distance') {
      displayText = d.distanceValue;
    }
  }
  for (const d of ds) {
    if (d.distanceHeader === 'Lines') {
      displayText = (d.distanceValue === '3' ? 'Three' : d.distanceValue) + ' ' + displayText;
      displayText = displayText.replace('line', 'lines')
    }
    if (d.distanceHeader === 'Within') {
      displayText = displayText + d.distanceValue;
    }
    if (d.distanceHeader === 'Melee') {
      if (ks.includes("Melee") && (ks.includes("Magic") || ks.includes("Psionic") || ks.includes("Weapon"))) {
        values = [...values, {
          type: "Melee",
          baseValue: parseInt(d.distanceValue) || 0,
          includedKitValue: 0,
        }]
        if (displayText.endsWith('within ')) {
          displayText = displayText + `[${d.distanceValue}]`
        } else {
          displayText = `Melee [${d.distanceValue}]`
        }
      } else {
        if (displayText.endsWith('within ')) {
          displayText = displayText + `${d.distanceValue}`
        } else {
          displayText = `Melee ${d.distanceValue}`
        }
      }
    }
    if (d.distanceHeader === 'Ranged') {
      if (ks.includes("Ranged") && (ks.includes("Magic") || ks.includes("Psionic") || ks.includes("Weapon"))) {
        values = [...values, {
          type: "Ranged",
          baseValue: parseInt(d.distanceValue) || 0,
          includedKitValue: 0,
        }]
        if (displayText.endsWith('within ')) {
          displayText = displayText + `[${d.distanceValue}]`
        } else if (displayText.startsWith('Melee')) {
          displayText = displayText + ` or Ranged [${d.distanceValue}]`
        } else {
          displayText = `Ranged [${d.distanceValue}]`
        }
      } else {
        if (displayText.endsWith('within ')) {
          displayText = displayText + `${d.distanceValue}`
        } else if (displayText.startsWith('Melee')) {
          displayText = displayText + ` or Ranged ${d.distanceValue}`
        } else {
          displayText = `Ranged ${d.distanceValue}`
        }
      }
    }
  }
  return {
    display: displayText,
    values: values,
  } satisfies distance
}

function translateFontSizes(card: old_card) : {
  topMatter?: number;
  titleFont?: number;
  flavour?: number;
  body?: number;
  powerRoll?: number;
} | undefined {
  const translateFsString = function (fsStr: string | undefined) {
    if (!fsStr) {
      return;
    }
    const fsExp = new RegExp(/([\d.]+) ?pt/);
    const fs = fsExp.exec(fsStr);
    if (fs) {
      const i = parseInt(fs[0]);
      return i ? i : i === 0 ? 0 : parseFloat(fs[0])
    }
    return;
  }

  return {
    topMatter: translateFsString(card.topMatterFontSizeOverride),
    titleFont: translateFsString(card.titleFontSizeOverride),
    flavour: translateFsString(card.flavourFontSizeOverride),
    body: translateFsString(card.bodyFontSizeOverride),
    powerRoll: translateFsString(card.powerRollFontSizeOverride),
  }
}

function translateStatement(bs: body_statement) : body {
  if ((bs as power_roll_statement).characteristic) {
    return translatePowerRoll(bs as power_roll_statement);
  }
  if ((bs as key_value_statement).value) {
    return {
      isEffect: true,
      title: (bs as key_value_statement).key,
      body: (bs as key_value_statement).value,
    } satisfies effect;
  }
  return {
    isSpacer: true,
    sizePt: (bs as spacer_statement).spacePt,
  } satisfies spacer;
}

function translatePowerRoll(prs: power_roll_statement) : power_roll {
  let charBonus : characteristic[] | string
  const parsedC : (characteristic | string)[] = prs.characteristic.split(" ")
    .map(s => s.replace(',', ''))
    .filter(s => s !== 'and' && s !== 'or')
    .map(s => {
      switch (s.toLowerCase()) {
        case "might":
        case "m":
          return characteristic.MIGHT;
        case "agility":
        case "a":
          return characteristic.AGILITY;
        case "reason":
        case "r":
          return characteristic.REASON;
        case "intuition":
        case "i":
          return characteristic.INTUITION;
        case "presence":
        case "p":
          return characteristic.PRESENCE;
        default:
          return s;
      }
    });

  if (parsedC.filter(s => !all_characteristics.includes(s as characteristic)).length === 0) {
    charBonus = parsedC as characteristic[]
  } else {
    charBonus = prs.characteristic;
  }

  return {
    isPowerRoll: true,
    characteristicBonus: charBonus,
    t1: translatePowerRollTier(prs.t1, 1),
    t2: translatePowerRollTier(prs.t2, 2),
    t3: translatePowerRollTier(prs.t3, 3),
  } satisfies power_roll;
}

function translatePowerRollTier(t: old_tier, tVal: number) : power_roll_tier {
  let eff : string | undefined;
  let dmg : damage | undefined;
  let pot : potency | undefined;

  if (t.hasDamage && !t.hasGeneralEffect) {
    eff = "damage";
  }

  if (t.hasDamage) {
    dmg = {
      baseValue: 0,
      includedKitValue: 0,
      characteristicBonusOptions: [],
    } satisfies damage;

    if (t.damageValue === 'x' && t.hasGeneralEffect) {
      const xEffectExp = new RegExp(/(.*?) (damage.*)/);
      const xEffectMatch = xEffectExp.exec(t.generalEffect ?? '');
      if (xEffectMatch) {
        let damageComponents = xEffectMatch[1].split(` `);
        const damageType = getDamageType(damageComponents[damageComponents.length - 1]);
        if (damageType.length > 0) {
          damageComponents = damageComponents.slice(0, damageComponents.length - 1)
        }
        damageComponents.map(s => s.replace(',', '').replace('+', ''))
          .filter(s => s.length > 0)
          .filter(s => s !== 'or' && s !== 'and')
          .forEach(s => {
            if (!dmg) {
              console.log("This shouldn't happen")
            } else if (parseInt(s) && !s.includes('d')) {
              dmg.baseValue = parseInt(s);
            } else if (['M', 'A', 'R', 'I', 'P'].includes(s)) {
              const ch : characteristic = singleLetterCharacteristicTranslator(s)
              dmg.characteristicBonusOptions = [...dmg.characteristicBonusOptions, ch]
            } else {
              dmg.otherBonus = s;
            }
          })

        eff = damageType + xEffectMatch[2];
      }
    } else if (t.damageValue && t.damageValue?.includes('+')) {
      const splitDamageBlock = t.damageValue?.split('+')
      dmg.baseValue = parseInt(splitDamageBlock[0]) || 0;
      dmg.characteristicBonusOptions = [singleLetterCharacteristicTranslator(splitDamageBlock[1])]

      if (t.hasGeneralEffect) {
        const xEffectExp = new RegExp(/(.*?) (damage.*)/);
        const xEffectMatch = xEffectExp.exec(t.generalEffect ?? '');
        if (xEffectMatch) {
          let damageComponents = xEffectMatch[1].split(` `);
          const damageType = getDamageType(damageComponents[damageComponents.length - 1]);
          if (damageType.length > 0) {
            damageComponents = damageComponents.slice(0, damageComponents.length - 1)
          }
          damageComponents.map(s => s.replace(',', '').replace('+', ''))
            .filter(s => s.length > 0)
            .filter(s => s !== 'or' && s !== 'and')
            .forEach(s => {
              if (!dmg) {
                console.log("This shouldn't happen")
              } else {
                dmg.otherBonus = s;
              }
            })

          eff = damageType + xEffectMatch[2];
        }  else {
          eff = t.generalEffect;
        }
      }
    } else if (t.damageValue) {
      dmg.baseValue = parseInt(t.damageValue) || 0;

      if (t.hasGeneralEffect) {
        const xEffectExp = new RegExp(/(.*?) (damage.*)/);
        const xEffectMatch = xEffectExp.exec(t.generalEffect ?? '');
        if (xEffectMatch) {
          let damageComponents = xEffectMatch[1].split(` `);
          const damageType = getDamageType(damageComponents[damageComponents.length - 1]);

          if (damageType.length > 0) {
            damageComponents = damageComponents.slice(0, damageComponents.length - 1)
          }
          damageComponents.map(s => s.replace(',', '').replace('+', ''))
            .filter(s => s.length > 0)
            .filter(s => s !== 'or' && s !== 'and')
            .forEach(s => {
              if (!dmg) {
                console.log("This shouldn't happen")
              } else {
                dmg.otherBonus = s;
              }
            })

          eff = damageType + xEffectMatch[2];
        } else {
          eff = t.generalEffect;
        }
      }
    }

  } else if (t.hasGeneralEffect) {
    eff = t.generalEffect;
  }

  if (eff && dmg) {
    eff = eff[0].toLowerCase() + eff.slice(1)
  }


  if (t.hasPotency) {
    let potEffect = (t.potencyEffect ?? '')
    potEffect = potEffect[0].toLowerCase() + potEffect.slice(1)
    pot = {
      characteristic: singleLetterCharacteristicTranslator((t.potencyValue ?? '')[0]),
      strength: tVal === 1 ? potency_strength.WEAK : (tVal === 2 ? potency_strength.AVERAGE : potency_strength.STRONG),
      effect: potEffect,
    } satisfies potency;
  }

  return {
    baseEffect: eff,
    damage: dmg,
    potency: pot,
  } satisfies power_roll_tier;
}

function getDamageType(s : string) {
  switch (s.toLowerCase()) {
    case 'acid':
    case 'cold':
    case 'corruption':
    case 'fire':
    case 'lightning':
    case 'poison':
    case 'sonic':
    case `psychic`:
    case 'untyped':
    case 'holy':
      return s.toLowerCase() + ` `;
    default: return ''
  }
}

function singleLetterCharacteristicTranslator(x : string) {
  switch (x.toUpperCase()) {
    case 'M': return characteristic.MIGHT
    case 'A': return characteristic.AGILITY
    case 'R': return characteristic.REASON
    case 'I': return characteristic.INTUITION
    case 'P': return characteristic.PRESENCE
    default: return characteristic.MIGHT;
  }
}

function translateType(s: string) : string {
  const dict = new Map([
    [old_types.action.toLowerCase(), new_types.mainAction],
    [old_types.maneuver.toLowerCase(), new_types.maneuver],
    [old_types.triggeredAction.toLowerCase(), new_types.triggeredAction],
    [old_types.freeManeuver.toLowerCase(), new_types.freeManeuver],
    [old_types.freeTriggeredAction.toLowerCase(), new_types.freeTriggeredAction],
    [old_types.freeStrikeAction.toLowerCase(), new_types.freeStrike],
    [old_types.routine.toLowerCase(), new_types.noAction],
    [old_types.passive.toLowerCase(), new_types.trait],
    [old_types.treasure.toLowerCase(), new_types.treasure],
  ])

  if (dict.has(s.toLowerCase())) {
    return dict.get(s.toLowerCase()) ?? s;
  }
  return s;
}

export function UpgradeCard (card: old_card) : new_card {
  const target = translateTarget(card.target);
  const distance = translateDistance(card.keywords, card.distance);
  const fontSizes = translateFontSizes(card);
  const bdy = card.statements.map((s) => translateStatement(s));

  return {
    version: 2,
    level: 1,
    type: translateType(card.type),
    header: {
      topMatter: card.topMatter,
      title: card.title,
      flavour: card.flavour,
      keywords: card.keywords,
      target: target,
      distance: distance,
    },
    body: bdy,
    cost: card.hasCost ? {
      costName: card.cost?.costName ?? '',
      costValue: card.cost?.costValue ?? '',
    } : undefined,
    fontSizePtOverrides: fontSizes,
  } satisfies new_card;
}
