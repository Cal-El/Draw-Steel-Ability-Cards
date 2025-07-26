import AbilityCard from "../components/ability-card/ability-card.tsx";
import {parse as yamlParse} from "yaml";
import {ability_card} from "../types/ability-card-types.ts";
import React, {useState} from "react";
import {toSvg} from "html-to-image";

function saveImage(cardId: string, setSvgData: React.Dispatch<string>){
  var card = document.getElementById(cardId)
  if (!card) return
  toSvg(card, {canvasWidth: 1050, canvasHeight: 750}).then(function (dataUrl) {
    setSvgData(dataUrl);
  })
}

export default function SingleCard({cardRef}:{cardRef: string}) {
  const [cardChoiceText, setCardChoiceText] = useState<string | null>(null)
  const [svgData, setSvgData] = useState<string>("")

  const baseUrl = `${window.location.protocol}//${window.location.host}/cards/`;

  fetch(baseUrl + cardRef)
    .then(r => r.text())
    .then(text => {
      setCardChoiceText(text)
    });

  let parsedCard : ability_card | undefined = undefined;
  if (cardChoiceText) {
    parsedCard = yamlParse(cardChoiceText) as ability_card;
    saveImage("1_card", setSvgData)
  }

  return(<>
  {parsedCard && <AbilityCard id={"1"} card={parsedCard} setSelectedCard={() => {}} cardNum={1} selectedCard={2} />}
    {svgData && <img src={svgData} alt={""} className={`object-contain`}></img>}
  </>)
}
