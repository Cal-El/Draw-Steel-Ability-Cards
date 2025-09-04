import { FaSave } from "react-icons/fa"

export default function EditCardSettingsSidebar({onClose}: 
  {onClose: () => void}){
  
  function closeModal(){
    onClose()
  }

  return (
    <div className={`fixed inset-0 z-10 w-screen h-screen bg-black bg-opacity-50 flex justify-end print:hidden`}>
      <div role={`button`} onClick={closeModal} className={`flex-grow`}/>
      <div className={`flex-none w-[50pt] flex flex-col`}>
        <div className={`h-[50pt] w-[50pt]`}></div>
        <div role={`button`} onClick={closeModal} className={`h-[50pt] w-[50pt] bg-action-card flex items-center justify-center`}>
          <FaSave className={`text-white text-[25pt]`}/>&nbsp;
        </div>
      </div>
      <div className={`h-full rounded-tl-[20pt] w-[600pt] rounded-bl-[20pt] bg-sidebar-back flex flex-col items-center outline outline-4 outline-sidebar-trim border-sidebar-trim pl-[20pt] pr-[12.5pt] py-[20pt] gap-[10pt]`}>
        <div className={`print:hidden w-full flex flex-col h-full`}>
          <span className="w-full text-center">
            <h1 className="font-bold font-body text-xl small-caps">Global Card Settings</h1>
          </span>
        </div>
      </div>
    </div>
  )
}
