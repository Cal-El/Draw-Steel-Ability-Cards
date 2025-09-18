import {useState, ChangeEvent, useEffect} from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  deleteAppliedTheme,
  duplicateAppliedTheme, modifyAppliedThemeName,
  selectAllThemes,
  selectAppliedTheme,
  selectInbuiltThemes,
  updateAppliedTheme
} from "../../redux/card-settings-slice.ts";
import {FaClone, FaTrash} from "react-icons/fa";
import {v2DefaultThemeId} from "../ability-card-v2/constants.ts";
import {EditTextInput} from "../edit-card-sidebar/card-editor/common-editor-elements.tsx";

export default function ThemeMenu(){
  const appliedTheme = useAppSelector(selectAppliedTheme)
  const allThemes = useAppSelector(selectAllThemes)
  const inbuiltThemeIds = useAppSelector(selectInbuiltThemes).map(t => t.id)
  const [theme, setTheme] = useState(appliedTheme?.id)
  const [isInbuilt, setIsInbuilt] = useState(inbuiltThemeIds.includes(theme));
  const dispatch = useAppDispatch()

  useEffect(() => {
    setIsInbuilt(inbuiltThemeIds.includes(theme));
  }, [theme, inbuiltThemeIds])

  const onChangeTheme = (e: ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value)
    dispatch(updateAppliedTheme(e.target.value))
  }

  const onDuplicateTheme = () => {
    const id = Math.random().toString(32)
    setTheme(id)
    dispatch(duplicateAppliedTheme(id))
  }

  const onDeleteTheme = () => {
    setTheme(v2DefaultThemeId)
    dispatch(deleteAppliedTheme())
  }

  const onChangeThemeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(modifyAppliedThemeName(e.target.value))
  }
  
  return (
    <div>
      <div className={`flex flex-col gap-2 mb-4`}>
        <div className="flex flex-row items-center gap-2 h-14 w-full">
          <select value={theme} onChange={onChangeTheme} className="border-2 border-stone-400 p-1 flex-grow">
            {allThemes.map((t) => {
              return <option value={t.id}>{t.name}</option>
            })}
          </select>
          <div role={`button`} onClick={() => {
            onDuplicateTheme()
          }} className={`flex-none h-9 w-9 border-2 border-stone-400 p-1 bg-white flex justify-center items-center`}><FaClone/></div>
          <div role={`${isInbuilt ? 'none' : 'button'}`} onClick={() => {
            if (isInbuilt) return;
            onDeleteTheme()
          }} className={`flex-none h-9 w-9 border-2 border-stone-400 p-1 ${isInbuilt ? 'bg-stone-300 text-stone-600' : 'bg-white'} flex justify-center items-center`}><FaTrash/></div>
        </div>
        {!isInbuilt &&
        <div className={`grid grid-cols-4`}>
          <EditTextInput fieldName={'Theme Name'} fieldValue={appliedTheme.name} onChange={onChangeThemeName}/>
        </div>}
      </div>
    </div>
  )
}
