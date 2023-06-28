import { useNavigate } from "react-router-dom"

export default function Card({ilustration, title, quickdesc, id}){

    const navigate = useNavigate()

    return(
        <div className="h-full w-64 2xl:w-[18rem] rounded-lg bg-gray-50 shadow-xl flex flex-col items-center overflow-hidden gap-9 relative flex-shrink-0 flex-grow-0 cursor-pointer" onClick={() => navigate(`/algorithm/${id}`)}>
            <div className="w-full h-36 rounded-md mt-5">
                <img src={ilustration} className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl font-bold uppercase text-center leading-3">{title}</h1>
                <h1 className="text-xs text-center font-normal p-5">{quickdesc}</h1>
            </div>
            <span className="bg-emerald-400 h-10 aspect-square flex text-gray-100 items-center justify-center absolute bottom-0 left-0">
                <h1 className="text-xl font-cold">{id}</h1>
            </span>
        </div>
    )
}