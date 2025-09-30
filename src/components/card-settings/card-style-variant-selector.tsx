import {useAppSelector} from "../../redux/hooks.ts";
import {selectVariant, updateVariant} from "../../redux/card-settings-slice.ts";
import {useDispatch} from "react-redux";
import {Variant} from "../../types/card-settings.ts";

function variantToOption(v: 'useRoundedCorners' | 'useBleedCorners' | undefined) {
  switch (v) {
    case 'useBleedCorners': return {label: 'Add Bleed for printing', value: v};
    case 'useRoundedCorners': return {label: 'Round all corners', value: v};
    default: return {label: 'Default', value: undefined};
  }
}

export function CardStyleVariantSelector(){
  const selectedVariant : 'useRoundedCorners' | 'useBleedCorners' | undefined = useAppSelector(selectVariant)
  const dispatch = useDispatch();

  return (
    <div className={`w-full py-2`}>
    <div className={`w-full flex items-center`}>
        <hr className={`flex-grow border-gray-300`}/>
        <span className={`text-xs small-caps font-bold pb-1 flex-none flex items-center gap-[2pt]`}>Card Style Variant</span>
        <hr className={`flex-grow border-gray-300`}/>
      </div>
      <div className={`py-2 flex gap-2 justify-center items-center`}>
        <div className={'font-bold'}>Variant:</div>
        <select
          className={`border-2 border-stone-400 p-1 flex-grow`}
          value={selectedVariant}
          onChange={(e) => {
            dispatch(updateVariant(e.target.value as Variant))
          }}
        >
          <option value={undefined}>{variantToOption(undefined).label}</option>
          <option value={'useRoundedCorners'}>{variantToOption('useRoundedCorners').label}</option>
          <option value={'useBleedCorners'}>{variantToOption('useBleedCorners').label}</option>
        </select>
      </div>
      <div className={`text-xs italic text-stone-600 text-center`}>Note: Card Style Variants are not supported on the Legacy card style.</div>
    </div>
  )
}
