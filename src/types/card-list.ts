import {ability_card as NewCard, all_characteristics} from "./ability-card.ts";
import {ability_card as OldCard} from "./ability-card-types.ts";
import {buildEmptyHeroData, HeroData} from "./character-data.ts";
import react from "@vitejs/plugin-react";

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

export const isEmptyCardList = function (cardList : CardList) {
  if (cardList.abilityCards.length !== 0) return false;
  if (cardList.heroData) {
    if (cardList.heroData.bonus.length !== 0) return false;
    for (const c of all_characteristics) {
      if (cardList.heroData.characteristics.has(c)) return false;
    }
  }
  return true;
}

// CLOAK AND DAGGER SHADOW
//

