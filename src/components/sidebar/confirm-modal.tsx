import { FaSave } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function ConfirmModal({text, onSubmit, onCancel, icon}: {text: string, onSubmit: () => void, onCancel: () => void, icon: string}){
  return (
    <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center h-screen bg-slate-900/50">
      <div className="p-4 w-full max-w-md place-self-center">
        <div className="relative p-4 text-center rounded-lg shadow bg-zinc-100 flex flex-col items-center border-[3pt] border-zinc-600">
            <button type="button" className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="deleteModal">
                <IoMdClose className="text-xl"/>
                <span className="sr-only">Close modal</span>
            </button>
            {icon === "delete" &&
              <RiDeleteBin6Fill className="text-5xl text-zinc-600"/>
            }
            {icon === "save" &&
              <FaSave className="text-5xl text-zinc-600"/>
            }
            {icon === "load" &&
              <ImUpload className="text-5xl text-zinc-600"/>
            }
            <p className="mb-4">{text}</p>
            <div className="flex justify-center items-center space-x-4">
                <button type="button" onClick={onCancel} className="py-2 px-3 text-sm font-medium text-cardback bg-[#323842] hover:brightness-90 rounded-lg border border-gray-20 focus:ring-4 focus:outline-none focus:ring-primary-300 focus:z-10">
                    Cancel
                </button>
                <button type="submit" onClick={onSubmit} className="py-2 px-3 text-sm font-medium text-center text-cardback bg-action-card hover:brightness-90 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-300">
                    Confirm
                </button>
            </div>
        </div>
    </div>
    </div>
  )
}
