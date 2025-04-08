import { ability_card } from "../../types/ability-card-types";

export const ActiveCardListKey = "displayedcards"
export const CardListKey = "cardlist"

export function saveCardList(name: string, cards: ability_card[]){
  localStorage.setItem(getCardListStorageKey(name), JSON.stringify(cards))
  if (name != ActiveCardListKey) {
    const cardlistnames = getCardListNames()
    if (!cardlistnames.includes(name)){
      saveCardListNames(cardlistnames.concat(name))
    }
  }
}

export function deleteCardList(name: string){
  localStorage.removeItem(name);
  if (name != ActiveCardListKey) {
    const cardlistnames = getCardListNames()
    if (cardlistnames.includes(name)){
      saveCardListNames(cardlistnames.filter(x => x != name))
    }
  }
}

export function getCardList(name: string): ability_card[] {
  const data = localStorage.getItem(getCardListStorageKey(name))
  if(data) {
    let parsed: ability_card[] = JSON.parse(data ?? '');
    return parsed;
  }
  return []
}

export function getCardListNames(): string[]{
  const data = localStorage.getItem("cardlistnames")
  if(data) {
    let parsed: string[] = JSON.parse(data ?? '');
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
