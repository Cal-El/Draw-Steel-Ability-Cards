import { RiMenuFold4Line, RiMenuUnfold4Line } from "react-icons/ri";

export default function Sidebar({open, toggleOpen}: {open: boolean, toggleOpen: () => void}){
  return (
    <>
    <button className="text-3xl m-3 float-right hover:text-gray-700" onClick={toggleOpen}>
      { open ? 
        <RiMenuFold4Line/>
        : <RiMenuUnfold4Line/>
      }
    </button>
    </>
  )
}
