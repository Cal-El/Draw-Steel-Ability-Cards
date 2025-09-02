import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import { CardTypesColourMenu } from "./card-types-colour-menu";
import KeywordColourMenu from "./keyword-colour-menu";

export default function CardSettingsMenu(){

  return (
    <>
      <div className="w-full flex flex-col justify-start gap-2 p-4 overflow-y-scroll h-full scrollbar">
        <SectionSeparator name="Colours"/>
        <div className="w-full pl-4 space-y-2">
          <KeywordColourMenu/>
          <CardTypesColourMenu/>
        </div>
      </div>
    </>
  )
}
