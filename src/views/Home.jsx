import { useEffect, useState } from "react"
import Card from "../components/Card"
import axios from "axios"

export default function Home(){
    const [algorithms, setAlgorithms] = useState()

    useEffect(()=>{
        async function getResponse(){
            const response = await axios.get('http://localhost:5000')
            console.log(response.data)
            setAlgorithms(response.data)
        }

        getResponse()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center pt-14 gap-12 w-screen h-screen bg-gray-100">
            <span className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold uppercase">Selecione para começar !</h1>
                <h1 className="text-2xl font-normal mt-2 uppercase">Escolha um algoritimo, aprenda e pratique</h1>
            </span>

            {
                algorithms && (
                    <div className="flex p-5 pb-9 pl-20 w-full h-full mb-8 gap-10 2xl:h-[48%] overflow-auto">
                        {
                            algorithms.map((algorithm)=>{
                                return <Card id={algorithm.id} ilustration={algorithm.ilustracao} title={algorithm.titulo} quickdesc={algorithm.descricao}/>
                            })
                        }
                </div>
                )
            }
        </div>
    )
}