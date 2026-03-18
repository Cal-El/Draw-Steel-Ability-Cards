import {SectionSeparator} from "./common-editor-elements.tsx";
import {ability_card} from "../../../types/ability-card.ts";
import {Dispatch, useState} from "react";
import {Card} from "../../../types/card-list.ts";
import {useAppSelector} from "../../../redux/hooks.ts";
import {selectAppliedTheme} from "../../../redux/card-settings-slice.ts";
import {v1StyleName} from "../../ability-card/constants.ts";
import {v2StyleName} from "../../ability-card-v2/constants.ts";

function FontSizeSlider({fieldName, callback, min, max, value} : {fieldName: string, callback: (x ?: number) => void, min: number, max: number, value?: number}) {
  const [v, setV] = useState(value ?? (min-1));

  return (<div className={`col-span-full grid grid-cols-subgrid`}>
    <div className={`font-bold text-right`}>{fieldName}:</div>
    <input type={'range'} min={min - 0.5} max={max} step={0.5} value={v}
           onChange={(e) => {
             const x = parseFloat(e.target.value);
             setV(x);
             if (!x || x < min) {
               callback(undefined)
             } else {
               callback(x)
             }
           }}
           className={`col-span-2 w-full`} />
    <div>{value ? `${v}pt` : `Default`}</div>
  </div>);
}

export default function FontsizeEditor({card, setCard} : {card: ability_card, setCard: Dispatch<Card>}) {
  const theme = useAppSelector(selectAppliedTheme);

  switch (theme.cardDesign) {
    case v1StyleName:
      return (<>
        <SectionSeparator name={'Font Sizing'}/>
        <FontSizeSlider fieldName={`Top Text`} callback={(x) => setCard({...card, fontSizePtOverrides: {...card.fontSizePtOverrides, topMatter: x}})} min={4} max={12} value={card.fontSizePtOverrides?.topMatter}/>
        <FontSizeSlider fieldName={`Card Name`} callback={(x) => setCard({...card, fontSizePtOverrides: {...card.fontSizePtOverrides, titleFont: x}})} min={10} max={21} value={card.fontSizePtOverrides?.titleFont}/>
        <FontSizeSlider fieldName={`Flavour`} callback={(x) => setCard({...card, fontSizePtOverrides: {...card.fontSizePtOverrides, flavour: x}})} min={6} max={14} value={card.fontSizePtOverrides?.flavour}/>
        <FontSizeSlider fieldName={`Body`} callback={(x) => setCard({...card, fontSizePtOverrides: {...card.fontSizePtOverrides, body: x}})} min={3.5} max={11} value={card.fontSizePtOverrides?.body}/>
        <FontSizeSlider fieldName={`Power Roll`} callback={(x) => setCard({...card, fontSizePtOverrides: {...card.fontSizePtOverrides, powerRoll: x}})} min={3.5} max={11} value={card.fontSizePtOverrides?.powerRoll}/>
      </>);
    case v2StyleName:
    default:
      return (<>
        <SectionSeparator name={'Font Sizing'}/>
        <FontSizeSlider fieldName={`Top Text`} callback={(x) => setCard({...card, v2FontSizePtOverrides: {...card.v2FontSizePtOverrides, topMatter: x}})} min={4} max={12} value={card.v2FontSizePtOverrides?.topMatter}/>
        <FontSizeSlider fieldName={`Card Name`} callback={(x) => setCard({...card, v2FontSizePtOverrides: {...card.v2FontSizePtOverrides, titleFont: x}})} min={10} max={21} value={card.v2FontSizePtOverrides?.titleFont}/>
        <FontSizeSlider fieldName={`Flavour`} callback={(x) => setCard({...card, v2FontSizePtOverrides: {...card.v2FontSizePtOverrides, flavour: x}})} min={6} max={14} value={card.v2FontSizePtOverrides?.flavour}/>
        <FontSizeSlider fieldName={`Body`} callback={(x) => setCard({...card, v2FontSizePtOverrides: {...card.v2FontSizePtOverrides, body: x}})} min={3.5} max={11} value={card.v2FontSizePtOverrides?.body}/>
        <FontSizeSlider fieldName={`Power Roll`} callback={(x) => setCard({...card, v2FontSizePtOverrides: {...card.v2FontSizePtOverrides, powerRoll: x}})} min={3.5} max={11} value={card.v2FontSizePtOverrides?.powerRoll}/>
      </>);
  }
}
