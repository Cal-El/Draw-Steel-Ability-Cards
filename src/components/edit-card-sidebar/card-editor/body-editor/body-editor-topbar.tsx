import {ability_card} from "../../../../types/ability-card.ts";
import {Dispatch} from "react";
import {Card} from "../../../../types/card-list.ts";
import {HiArrowDown, HiArrowUp, HiX} from "react-icons/hi";

export default function BodyEditorTopbar({card, setCard, bodyIdx, type} : {card: ability_card, setCard: Dispatch<Card>, bodyIdx: number, type: string}) {
  const moveBodyUp = () => {
    const body = [...card.body]
    const thisStatement = body[bodyIdx]
    body.splice(bodyIdx, 1)
    body.splice(bodyIdx-1, 0, thisStatement)
    setCard({...card, body: body})
  }

  const moveBodyDown = () => {
    const body = [...card.body]
    const thisStatement = body[bodyIdx]
    body.splice(bodyIdx, 1)
    body.splice(bodyIdx+1, 0, thisStatement)
    setCard({...card, body: body})
  }

  const deleteBody = () => {
    const body = [...card.body]
    body.splice(bodyIdx, 1)
    setCard({...card, body: body})
  }

  return <div className={`col-span-full flex items-center`}>
    <span className={`w-4`}/>
    <span className={`text-xs small-caps font-bold pb-1`}>{bodyIdx + 1}: {type}</span>
    <span className={`w-2`}/>
    <hr className={`flex-grow border-gray-300`}/>
    {bodyIdx !== 0 &&
      <button onClick={moveBodyUp}
              className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowUp color={`rgb(55 65 81)`}/>
      </button>
    }
    {bodyIdx !== card.body.length - 1 &&
      <button onClick={moveBodyDown}
              className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowDown color={`rgb(55 65 81)`}/>
      </button>
    }
    <hr className={`border-gray-300 w-4`}/>
    <button onClick={deleteBody}
            className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
      <HiX color={`rgb(55 65 81)`}/>
    </button>
  </div>
}
