import { GiSwordman } from "react-icons/gi";

export default function TopMenu({openHeroDataSidebar}: {openHeroDataSidebar: () => void}){
  return (
    <div className="w-full bg-stone-400 text-stone-800 flex flex-row p-2 pl-4 print:hidden">
      <button onClick={openHeroDataSidebar} className="flex flex-row items-center text-base bg-stone-300 p-1 rounded-md hover:bg-stone-200 space-x-1"><GiSwordman/><span>Hero Data</span></button>
    </div>
  )
}
