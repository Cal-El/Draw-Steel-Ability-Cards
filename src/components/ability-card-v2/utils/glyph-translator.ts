import {ability_card, abilityType} from "../../../types/ability-card.ts";

export function getCardGlyph(card: ability_card) {
  if (card.type === abilityType.triggeredAction || card.type === abilityType.freeTriggeredAction) {
    return '!'
  }
  const distanceDisplay = card.header.distance.display.toLowerCase();
  if (distanceDisplay.includes('burst') || distanceDisplay.includes('aura')) {
    return 'B'
  }
  if (distanceDisplay.includes('wall') || distanceDisplay.includes('cube') || distanceDisplay.includes('line')) {
    return 'C'
  }
  if (distanceDisplay.includes('melee') && distanceDisplay.includes('ranged')) {
    return '='
  }
  if (distanceDisplay.includes('melee')) {
    return '<'
  }
  if (distanceDisplay.includes('ranged')) {
    return '>'
  }
  if (distanceDisplay.includes('self')) {
    return 'S'
  }
  if (distanceDisplay.length > 0) {
    return 'U'
  }
  return ''
}
