import {ability_card} from "../types/ability-card-types.ts";
import {toPng} from "html-to-image";

function filizeString(s: string) {
    return s.replaceAll(' ', '-').toLowerCase();
}

export function saveYamlExport(cardData: ability_card, yamlData: string){
        let alink = document.createElement("a");
        alink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(yamlData);
        alink.download = [cardData.topMatter, cardData.title].map(filizeString).join('_') + ".yaml";
        alink.click();
}

export function saveImage(cardData: ability_card, cardId: string){
    var card = document.getElementById(cardId)
    if (!card) return
    toPng(card, {canvasWidth: 672, canvasHeight: 480, pixelRatio: 4, preferredFontFormat: "truetype"}, ).then(function (dataUrl) {
        let alink = document.createElement("a");
        alink.href = dataUrl;
        alink.download = [cardData.topMatter, cardData.title].map(filizeString).join('_') + ".png";
        alink.click();
    })
}
