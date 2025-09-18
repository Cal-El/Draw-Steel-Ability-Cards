import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import ThemeMenu from "./theme-menu";

export default function CardSettingsMenu(){

  return (
    <>
      <div className="w-full flex flex-col justify-start gap-2 p-4 overflow-y-scroll h-full scrollbar">
        <SectionSeparator name="Theme"/>
        <div className="w-full pl-4 space-y-2">
          <ThemeMenu/>
          {/* <BaseColourMenu/>
          <CardTypesColourMenu/> */}
        </div>
      </div>
    </>
  )
}
