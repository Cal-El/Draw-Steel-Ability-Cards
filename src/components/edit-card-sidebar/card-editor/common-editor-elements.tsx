import {ChangeEventHandler, FormEventHandler, useState} from "react";
import {all_characteristics, characteristic} from "../../../types/ability-card.ts";
import Select, {GroupBase, MultiValueProps, OptionProps} from "react-select";
import {keywords, rawKeywords} from "../../../types/keywords.ts";

export function SectionSeparator({name}:{name: string}) {
  return (<div className={`col-span-full flex gap-2 items-center`}>
    <span className={`text-xs small-caps font-bold pb-1 flex-none`}>{name}</span>
    <hr className={`flex-grow border-gray-300`}/>
  </div>);
}

export function EditTextInput({fieldName, fieldValue, onChange, isBold=true}: {fieldName: string, fieldValue: string, onChange: ChangeEventHandler<HTMLInputElement>, isBold?:boolean}) {
  return <div className={`col-span-full grid grid-cols-subgrid gap-2`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <input value={fieldValue} onChange={onChange} className={`col-span-3 border-2 border-stone-400 p-1`}></input>
  </div>;
}

export function EditTextAreaInput({fieldName, fieldValue, onChange, isBold=true}: {fieldName: string, fieldValue: string, onChange: FormEventHandler<HTMLTextAreaElement>, isBold?:boolean}) {
  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-start`}>
    <div className={`flex justify-end items-center w-full py-1`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <textarea rows={3}
              value={fieldValue}
              onInput={onChange}
              className={`col-span-3 border-2 border-stone-400 p-1`}
              placeholder="Write your thoughts here...">
        </textarea>
  </div>
}

const MV = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: MultiValueProps<Option, IsMulti, Group>, firstLetterOnly: boolean = false) => (
  <div className={`rounded-sm border-orange-300 hover:border-red-300 border-1 border bg-orange-50 hover:bg-red-50 text-gray-600 font-medium px-1 text-center ${props.index === 0 ? 'mr-0.5' : 'mx-0.5'} min-w-[15pt]`}
       onClick={props.removeProps.onClick}>
    {firstLetterOnly ? (props.data as OptionProps).label[0] : (props.data as OptionProps).label}
  </div>
);
const MultiValue = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: MultiValueProps<Option, IsMulti, Group>) => (
  MV(props, false)
);

const MultiValueSingleLetter = <
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: MultiValueProps<Option, IsMulti, Group>) => (
  MV(props, true)
);

export function EditKeywordsInput({fieldName, fieldValues, onChange}: {fieldName: string, fieldValues: string[], onChange: (ks: string[]) => void}) {
  const [keywordsInputVal, setKeywordsInputVal] = useState("");

  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-center`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`font-bold text-right`}>{fieldName}:</div>
    </div>
    <Select
      inputValue={keywordsInputVal}
      value={fieldValues.map((s) => {return {label: s, value: s}})}
      onInputChange={(newValue) => {
        if (newValue.includes(", ")) {
          const values = newValue.split(", ");
          let ks : string[] = []
          let os : string[] = []
          for (const v of values) {
            if (rawKeywords.includes(v)) {
              ks = [...ks, v];
            } else {
              os = [...os, v];
            }
          }
          onChange(ks.sort())
          setKeywordsInputVal(os.join(", "));
        } else {
          setKeywordsInputVal(newValue);
        }
      }}
      onChange={(newValue) => onChange(newValue.map((x) => {return x.value}).sort())}
      options={keywords}
      isMulti
      components={{MultiValue}}
      className={`col-span-3 border-2 border-stone-400`}
      theme={(t) => ({
        ...t,
        borderRadius: 0,
        spacing: {
          baseUnit: 2,
          controlHeight: 0,
          menuGutter: 0,
        },
      })}
    />
  </div>
}

export function EditCharacteristicInput({fieldName, fieldValues, onChange, isBold=true, useSmall=false}: {fieldName: string, fieldValues: string[] | string, onChange: (ks: characteristic[]) => void, isBold?:boolean, useSmall?:boolean},) {
  const [keywordsInputVal, setKeywordsInputVal] = useState("");
  const cOptions = all_characteristics.map((s) => {return {value: s, label: s}})
  const fv = (fieldValues as string[]).map ? fieldValues as string[] : [fieldValues as string]

  return <div className={`col-span-full grid grid-cols-subgrid gap-2 items-center`}>
    <div className={`flex justify-end items-center w-full`}>
      <div className={`${isBold ? 'font-bold' : ''} text-right`}>{fieldName}:</div>
    </div>
    <Select
      inputValue={keywordsInputVal}
      value={fv.map((s) => {return {label: s, value: s}})}
      onInputChange={(newValue) => {
        if (newValue.includes(", ")) {
          const values = newValue.split(", ");
          let ks : characteristic[] = []
          let os : string[] = []
          for (const v of values) {
            if (all_characteristics.includes(v as characteristic)) {
              ks = [...ks, v as characteristic];
            } else {
              os = [...os, v];
            }
          }
          onChange(ks.sort())
          setKeywordsInputVal(os.join(", "));
        } else {
          setKeywordsInputVal(newValue);
        }
      }}
      onChange={(newValue) => onChange(newValue.map((x) => {return x.value as characteristic}).sort())}
      options={cOptions}
      isMulti
      className={`col-span-3 border-2 border-stone-400`}
      isClearable={false}
      components={{MultiValue: useSmall ? MultiValueSingleLetter : MultiValue}}
      styles={{
        valueContainer: (base) => ({ ...base, flexWrap: "nowrap", overflow: "hidden" }),
      }}
      theme={(t) => ({
        ...t,
        borderRadius: 0,
        spacing: {
          baseUnit: 2,
          controlHeight: 0,
          menuGutter: 0,
        },
      })}
    />
  </div>
}
