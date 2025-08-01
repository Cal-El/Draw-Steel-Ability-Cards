import {toPng} from "html-to-image";
import {Card, getCardTitle, getCardTopMatter} from "../types/card-list.ts";

function filizeString(s: string) {
    return s.replaceAll(' ', '-').toLowerCase();
}

export function saveYamlExport(cardData: Card, yamlData: string){
  const alink = document.createElement("a");
  alink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(yamlData);
  alink.download = [getCardTopMatter(cardData), getCardTitle(cardData)].map(filizeString).join('_') + ".yaml";
  alink.click();
}

export function saveImage(cardData: Card, cardId: string){
    const card = document.getElementById(cardId)
    if (!card) return
    toPng(card, {canvasWidth: 672, canvasHeight: 480, pixelRatio: 4, preferredFontFormat: "truetype"}, ).then(function (dataUrl) {
        const alink = document.createElement("a");
        alink.href = dataUrl;
        alink.download = [getCardTopMatter(cardData), getCardTitle(cardData)].map(filizeString).join('_') + ".png";
        alink.click();
    })
}
