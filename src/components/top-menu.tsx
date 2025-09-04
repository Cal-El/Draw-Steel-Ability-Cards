import {
  GiFlamer,
  GiScrollUnfurled,
  GiSwordman
} from "react-icons/gi";
import {getChangesSinceTime} from "../changelog.ts";
import {FiCheckSquare, FiSquare} from "react-icons/fi";

export default function TopMenu({ showHeroData,
                                  clickShowHeroData,
                                  openHeroDataSidebar,
                                  openChangelog,
                                  changeLogLastOpenedDate
}: {
  showHeroData: boolean;
  clickShowHeroData: () => void,
  openHeroDataSidebar: () => void,
  openChangelog: () => void,
  changeLogLastOpenedDate: Date
}) {
  return (
    <div className="w-full bg-stone-400 text-stone-800 flex flex-row p-2 pl-4 print:hidden gap-2 sticky top-0 z-10">
      <div className={`flex-grow flex flex-row gap-2`}>
        <button onClick={clickShowHeroData} className="flex flex-row items-center text-base bg-stone-300 p-1 rounded-md hover:bg-stone-200 space-x-1">{!showHeroData ? <FiCheckSquare/> : <FiSquare/>}<span>Render without Hero</span></button>
        <button onClick={openHeroDataSidebar} className="flex flex-row items-center text-base bg-stone-300 p-1 rounded-md hover:bg-stone-200 space-x-1"><GiSwordman/><span>Hero Data</span></button>
      </div>
      <div className={`flex-none bg-stone-600 min-h-full min-w-0.5`}/>
      <div className={`flex-shrink flex flex-row gap-2`}>
        <button className={`flex flex-row items-center text-base bg-stone-300 p-1 px-2 rounded-md hover:bg-stone-200`}
                onClick={openChangelog}>
          <GiScrollUnfurled/><div className={`w-1`}/><span>Changelog</span>
          <div className={`w-0 h-0 overflow-visible flex items-center justify-center`}>
            <div className={`w-2 h-10 overflow-visible`}>
              {getChangesSinceTime(changeLogLastOpenedDate) > 0 && <div className={`p-0 h-4 w-4 font-bold text-white text-[8pt] rounded-xl bg-red-500 leading-none flex items-center justify-center`}>{getChangesSinceTime(changeLogLastOpenedDate)}</div>}
            </div>
          </div>
        </button>
        <a className="flex flex-row items-center text-base bg-stone-300 p-1 px-2 rounded-md hover:bg-stone-200 space-x-1"
           href={`https://forms.gle/gbwPmu4udcxGfUNg6`} target="_blank" ><GiFlamer/><span>Report a Bug</span></a>
      </div>
    </div>
  )
}
