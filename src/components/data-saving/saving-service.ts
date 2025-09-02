import {Card, CardList} from "../../types/card-list.ts";
import {buildEmptyHeroData, HeroData} from "../../types/character-data.ts";

export const ChangeLogSeenKey = "changelogLastSeenDate"
export const DisplayedCardListKey = "displayedcards"
export const CardListKey = "cardlist"
export const HeroDataKey = "herodata"

export function saveChangelogSeen(t: Date){
  localStorage.setItem(ChangeLogSeenKey, JSON.stringify(t))
}

export function getChangelogSeen() : Date {
  const data = localStorage.getItem(ChangeLogSeenKey)
  if (data) {
    return new Date(JSON.parse(data ?? '') as Date)
  }
  return new Date(0)
}

export function saveCardList(name: string, cardList: CardList){
  localStorage.setItem(getCardListStorageKey(name), JSON.stringify(cardList.abilityCards))
  localStorage.setItem(getHeroDataStorageKey(name), JSON.stringify(cardList.heroData))
  if (name != DisplayedCardListKey) {
    const cardlistnames = getCardListNames()
    if (!cardlistnames.includes(name)){
      saveCardListNames(cardlistnames.concat(name))
    }
  }
}

export function deleteCardList(name: string){
  localStorage.removeItem(getCardListStorageKey(name));
  localStorage.removeItem(getHeroDataStorageKey(name));
  if (name != DisplayedCardListKey) {
    const cardlistnames = getCardListNames()
    if (cardlistnames.includes(name)){
      saveCardListNames(cardlistnames.filter(x => x != name))
    }
  }
}

export function getCardList(name: string): CardList {
  const cardsData = localStorage.getItem(getCardListStorageKey(name))
  let parsedCards: Card[] = [];
  if(cardsData) {
    parsedCards = JSON.parse(cardsData ?? '');
  }
  const charData = localStorage.getItem(getHeroDataStorageKey(name))
  let heroData: HeroData = buildEmptyHeroData();
  if (charData) {
    const parsedData = JSON.parse(charData ?? '');
    if (parsedData) {
      heroData = HeroData.fromJSON(parsedData);
    }
  }
  return {
    abilityCards: parsedCards,
    heroData: heroData,
  } satisfies CardList;
}

export function getCardListNames(): string[]{
  const data = localStorage.getItem("cardlistnames")
  if(data) {
    const parsed: string[] = JSON.parse(data ?? '');
    return parsed;
  }
  return []
}

export function saveCardListNames(names: string[]){
  localStorage.setItem("cardlistnames", JSON.stringify(names))
}

function getCardListStorageKey(name: string): string {
  return `${CardListKey}-${name}`;
}

function getHeroDataStorageKey(name: string): string {
  return `${HeroDataKey}-${name}`;
}

export function changeActiveCardList(name: string): void {
  localStorage.setItem("activecardlist", name)
}

export function getActiveCardList(): string {
  const data = localStorage.getItem("activecardlist")
  return data ?? ""
}

export function hasUnsavedChanges(): boolean {
  const displayedCards = getCardList(DisplayedCardListKey)
  return cardListHasUnsavedChanges(displayedCards)
}

export function cardListHasUnsavedChanges(cardList: CardList): boolean {
  const activeList = getActiveCardList()
  const activeCardList = getCardList(activeList)
  return (JSON.stringify(cardList) !== JSON.stringify(activeCardList))
}
