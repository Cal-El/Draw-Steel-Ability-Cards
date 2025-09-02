import { abilityType } from "../../types/ability-card";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import CardTypeColourMenu from "./card-type-colour-menu";

export function CardTypesColourMenu(){
  return (
    <>
      <SectionSeparator name="Card Types"/>
      <div className="pl-4">
        <CardTypeColourMenu cardType={abilityType.mainAction}/>
        <CardTypeColourMenu cardType={abilityType.maneuver}/>
        <CardTypeColourMenu cardType={abilityType.triggeredAction}/>
        <CardTypeColourMenu cardType={abilityType.moveAction}/>
        <CardTypeColourMenu cardType={abilityType.freeTriggeredAction}/>
        <CardTypeColourMenu cardType={abilityType.freeManeuver}/>
        <CardTypeColourMenu cardType={abilityType.noAction}/>
        <CardTypeColourMenu cardType={abilityType.freeStrike}/>
        <CardTypeColourMenu cardType={abilityType.trait}/>
        <CardTypeColourMenu cardType={abilityType.treasure}/>
      </div>
    </>
  )
}
