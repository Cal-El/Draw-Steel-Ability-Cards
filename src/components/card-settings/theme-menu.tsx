import { useState, ChangeEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { SectionSeparator } from "../edit-card-sidebar/card-editor/common-editor-elements";
import { selectAllThemes, selectAppliedTheme, updateAppliedTheme } from "../../redux/card-settings-slice.ts";

export default function ThemeMenu(){
  const appliedTheme = useAppSelector(selectAppliedTheme)
  const allThemes = useAppSelector(selectAllThemes)
  const [theme, setTheme] = useState(appliedTheme?.id)
  const dispatch = useAppDispatch()

  const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
    dispatch(updateAppliedTheme(e.target.value))
  }
  
  return (
    <div>
      <div className={`flex flex-col gap-2 mb-4`}>
        <div className="flex flex-row items-center gap-2 h-14">
          <div className={`text-right`}>Theme:</div>
          <select value={theme} onChange={onChangeTheme} className="border-2 border-stone-400 p-1">
            {allThemes.map((t) => {
              return <option value={t.id}>{t.name}</option>
            })}
          </select>
        </div>
      </div>
    </div>
  )
}
