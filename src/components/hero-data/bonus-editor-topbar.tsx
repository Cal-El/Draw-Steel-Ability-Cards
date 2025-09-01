import {HiArrowDown, HiArrowUp, HiX} from "react-icons/hi";
import { HeroData } from "../../types/character-data";

export default function BonusEditorTopbar({heroData, setHeroData, index, type} : {heroData: HeroData, setHeroData: (heroData: HeroData) => void, index: number, type: string}) {
  const moveBonusBlockUp = () => {
    const bonuses = [...heroData.bonus]
    const thisStatement = bonuses[index]
    bonuses.splice(index, 1)
    bonuses.splice(index-1, 0, thisStatement)
    setHeroData({...heroData, bonus: bonuses} as HeroData)
  }

  const moveBonusBlockDown = () => {
    const bonuses = [...heroData.bonus]
    const thisStatement = bonuses[index]
    bonuses.splice(index, 1)
    bonuses.splice(index+1, 0, thisStatement)
    setHeroData({...heroData, bonus: bonuses} as HeroData)
  }

  const deleteBonusBlock = () => {
    const bonuses = [...heroData.bonus]
    bonuses.splice(index, 1)
    setHeroData({...heroData, bonus: bonuses} as HeroData)
  }

  return <div className={`col-span-full flex items-center`}>
    <span className={`w-4`}/>
    <span className={`text-xs small-caps font-bold pb-1`}>{index + 1}: {type}</span>
    <span className={`w-2`}/>
    <hr className={`flex-grow border-gray-300`}/>
    {index !== 0 &&
      <button onClick={moveBonusBlockUp}
              className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowUp color={`rgb(55 65 81)`}/>
      </button>
    }
    {index !== heroData.bonus.length - 1 &&
      <button onClick={moveBonusBlockDown}
              className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
        <HiArrowDown color={`rgb(55 65 81)`}/>
      </button>
    }
    <hr className={`border-gray-300 w-4`}/>
    <button onClick={deleteBonusBlock}
            className={`rounded-xl border-2 border-gray-300 h-6 w-6 flex justify-center items-center`}>
      <HiX color={`rgb(55 65 81)`}/>
    </button>
  </div>
}
