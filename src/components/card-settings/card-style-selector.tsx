import {useSelector} from "react-redux";
import {modifyAppliedThemeStyle, selectAppliedTheme} from "../../redux/card-settings-slice.ts";
import {useEffect, useState} from "react";
import {getCardStyleDetails, getCardStylesAndPosition} from "../../utils/card-settings-utils.ts";
import {BiSolidLeftArrow, BiSolidRightArrow} from "react-icons/bi";
import {useAppDispatch} from "../../redux/hooks.ts";

export function CardStyleSelector() {
  const appliedTheme = useSelector(selectAppliedTheme);
  const [styleDetails, setStyleDetails] = useState(getCardStyleDetails(appliedTheme.cardDesign))
  const [styleState, setStyleState] = useState(getCardStylesAndPosition(appliedTheme))
  useEffect(() => {
    setStyleDetails(getCardStyleDetails(appliedTheme.cardDesign))
    setStyleState(getCardStylesAndPosition(appliedTheme))
  }, [appliedTheme])
  const dispatch = useAppDispatch()

  const shouldDisableLeft = () => {
    return styleState.isInbuiltTheme || styleState.currentIdx < 1
  }

  const shouldDisableRight = () => {
    return styleState.isInbuiltTheme || styleState.currentIdx >= styleState.styles.length - 1
  }

  return <div className={`w-full flex flex-col justify-start items-center`}>
    <div className={`w-full flex gap-2 items-center`}>
      <hr className={`flex-grow border-gray-300`}/>
      <span className={`text-xs small-caps font-bold pb-1 flex-none`}>Card Style</span>
      <hr className={`flex-grow border-gray-300`}/>
    </div>
    <div className={`w-full flex justify-around items-center gap-[5pt]`}>
      <div role={shouldDisableLeft() ? 'none' : 'button'} onClick={() => {
        if (shouldDisableLeft()) return
        dispatch(modifyAppliedThemeStyle(styleState.styles[styleState.currentIdx - 1]))
      }} className={`p-[5pt] rounded-[2pt] ${shouldDisableLeft() ? 'bg-stone-300 text-stone-400' : 'bg-white text-stone-800'} border-[2pt] border-stone-400`}><BiSolidLeftArrow /></div>
      <div className={`max-w-[66%]`}>
        <div className={`font-bold italic text-center`}>
          {styleDetails?.displayName}
        </div>
        <div className={`text-left text-sm`}>{styleDetails?.description}</div>
        <div className={`italic text-right text-xs`}>Support the Designer: <a href={styleDetails?.creatorURL} target={'_blank'} className={`underline`}>{styleDetails?.creatorName}</a></div>
      </div>
      <div role={shouldDisableRight() ? 'none' : 'button'} onClick={() => {
        if (shouldDisableRight()) return
        dispatch(modifyAppliedThemeStyle(styleState.styles[styleState.currentIdx + 1]))
      }} className={`p-[5pt] rounded-[2pt] ${shouldDisableRight() ? 'bg-stone-300 text-stone-400' : 'bg-white text-stone-800'} border-[2pt] border-stone-400`}><BiSolidRightArrow /></div>
    </div>
  </div>
}
