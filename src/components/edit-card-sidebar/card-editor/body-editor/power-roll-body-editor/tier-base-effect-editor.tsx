import {power_roll_tier} from "../../../../../types/ability-card.ts";
import {EditTextInput} from "../../common-editor-elements.tsx";
import {SegmentProps} from "./power-roll-tier-body-editor.tsx";

export default function TierBaseEffectEditor(props : SegmentProps) {
  return(<div key={'BaseEffectSegment'} className={`col-span-full grid grid-cols-[62pt_1fr] justify-start items-center gap-x-2 gap-y-1`}>
    <EditTextInput fieldName={'Effect text'} fieldValue={props.tier.baseEffect ?? ''} onChange={(e) => {
      const tempTier = {...props.tier} as power_roll_tier;
      tempTier.baseEffect = e.target.value;
      props.setTier(tempTier);
    }}/>
  </div>);
}
