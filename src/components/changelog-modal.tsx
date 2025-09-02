import Markdown from "react-markdown";
import {Change, changelog} from "../changelog.ts";

function DisplayChange({change}: {change: Change}) {
  return (<>
    <div className="font-body text-md text-left">
      {change.releaseDate.toISOString().split('T')[0]}
    </div>
    <div>
      <Markdown className="prose prose-sm font-body text-md text-left">
        {`${change.type === 'Feature' ? '###' : '####'} ${change.version} ${change.title ? ' - ' + change.type + ': ' + change.title : '...'} ${change.changes}`}
      </Markdown>
    </div>
  </>);
}

export default function ChangelogModal({onClose} : {onClose: () => void}) {
  return <button onClick={onClose} className="fixed inset-0 z-10 w-screen h-screen bg-black/[0.3]">
    <div className="flex h-full items-end justify-center p-[5%] text-center sm:items-center w-full">
      <div className="rounded-xl bg-sidebar-back flex flex-col items-center justify-start outline outline-4 outline-sidebar-trim border-sidebar-trim p-10 w-full max-w-[600pt] max-h-full overflow-y-scroll">
        <div className="font-display text-2xl font-bold">
          Changelog
        </div>
        <div style={{gridTemplateColumns: '60pt 1fr'}} className={`grid grid-rows-min gap-2 w-full`}>
          {changelog.map(c => <DisplayChange key={c.releaseDate.getDate()} change={c}/>)}
        </div>
      </div>
    </div>
  </button>
}
