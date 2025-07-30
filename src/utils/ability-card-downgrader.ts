import {ability_card as old_card, body_statement, distance_block} from "../types/ability-card-types.ts";
import {ability_card as new_card} from "../types/ability-card.ts";
import {character_data} from "../types/character-data.ts";


const fontSizeTranslate = function (size: number | undefined) {
  return size ? size + "pt" : undefined;
}

export function DowngradeCard (ability_card: new_card, character_data: character_data) : old_card {
  const translatedTarget = ability_card.header.target;
  const translatedDistance : distance_block[] = [];
  const translatedBody: body_statement[] = [];

  return {
    type: ability_card.type,
    topMatter: ability_card.header.topMatter,
    title: ability_card.header.title,
    flavour: ability_card.header.flavour,
    keywords: ability_card.header.keywords,
    hasCost: ability_card.cost !== undefined,
    cost: ability_card.cost,
    target: translatedTarget,
    distance: translatedDistance,
    statements: translatedBody,
    topMatterFontSizeOverride: fontSizeTranslate(ability_card.fontSizePtOverrides?.topMatter),
    titleFontSizeOverride: fontSizeTranslate(ability_card.fontSizePtOverrides?.titleFont),
    flavourFontSizeOverride: fontSizeTranslate(ability_card.fontSizePtOverrides?.flavour),
    bodyFontSizeOverride: fontSizeTranslate(ability_card.fontSizePtOverrides?.body),
    powerRollFontSizeOverride: fontSizeTranslate(ability_card.fontSizePtOverrides?.powerRoll),
  }
}
