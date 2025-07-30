import {ability_card as NewCard} from "./ability-card.ts";
import {ability_card as OldCard} from "./ability-card-types.ts";
import {buildEmptyHeroData, HeroData} from "./character-data.ts";

export type CardList = {
  heroData?: HeroData,
  abilityCards: Card[],
}

export type Card = NewCard | OldCard;

export const isNewCard = function (c: Card) {
  return (c as NewCard).version === 2;
}

export const asNewCard = function (c: Card) {
  return (c as NewCard);
}

export const asOldCard = function (c: Card) {
  return (c as OldCard);
}

export const getCardTitle = function (c: Card) {
  return isNewCard(c) ? asNewCard(c).header.title : asOldCard(c).title;
}

export const getCardTopMatter = function (c: Card) {
  return isNewCard(c) ? asNewCard(c).header.topMatter : asOldCard(c).topMatter;
}

export const nonNullHeroData = function (c: CardList) : HeroData {
  return c.heroData ?? buildEmptyHeroData();
}

// CLOAK AND DAGGER SHADOW
//

