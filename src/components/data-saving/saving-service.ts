import { ability_card } from "../../types/ability-card-types";

export const ActiveCardListKey = "displayedcards"
export const CardListKey = "cardlist"

export function saveCardList(name: string, cards: ability_card[]){
    localStorage.setItem(getCardListStorageKey(name), JSON.stringify(cards))
}

export function getCardList(name: string): ability_card[] {
    const data = localStorage.getItem(getCardListStorageKey(name))
    if(data) {
        let parsed: ability_card[] = JSON.parse(data ?? '');
        return parsed;
    }
    return []
}

function getCardListStorageKey(name: string): string {
    return `${CardListKey}-${name}`;
}