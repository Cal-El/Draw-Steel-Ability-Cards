import {ability_card} from "../types/ability-card-types.ts";
import {toPng} from "html-to-image";

function filizeString(s: string) {
    return s.replaceAll(' ', '-').toLowerCase();
}

export function saveYamlExport(cardData: ability_card, yamlData: string){
        let alink = document.createElement("a");
        alink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(yamlData);
        alink.download = [cardData.source, cardData.type, cardData.title].map(filizeString).join('_') + ".yaml";
        alink.click();
}

export function saveImage(cardData: ability_card, cardId: string){
    var card = document.getElementById(cardId)
    if (!card) return
    toPng(card).then(function (dataUrl) {
        let alink = document.createElement("a");
        alink.href = dataUrl;
        alink.download = [cardData.source, cardData.type, cardData.title].map(filizeString).join('_') + ".png";
        alink.click();
    })
}