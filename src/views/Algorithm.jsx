import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/theme-dracula';
import 'ace-builds/src-noconflict/mode-python';

import axios from "axios"

import Sk from 'skulpt';
import 'skulpt/dist/skulpt.min.js';
import 'skulpt/dist/skulpt-stdlib.js';

export default function Algorithm(){
    
    const [infos, setInfos] = useState()
    const [code, setCode] = useState('')
    const [output, setOutput] = useState('');
    const canvasRef = useRef(null);
    
    const {id} = useParams()

    useEffect(()=>{
        async function getResponse(){
            const response = await axios.get(`http://localhost:5000/${id}`)
            setInfos(response.data)
            setCode(response.data.code)
        }
        getResponse()
    }, [])

    useEffect(() => {
        setOutput('')
    }, [code])

    function runCode(){
        const completeCode = `import time\nstart_time = time.time()\n${code}\nend_time = time.time()\nelapsed_time = end_time - start_time\nprint(f"Tempo de execução: {elapsed_time} segundos")`

        Sk.canvas = canvasRef.current;
        Sk.configure({ output: (text) => {setOutput((prevOutput) => prevOutput + text ), console.log(text)} });
    
        const myPromise = Sk.misceval.asyncToPromise(() => {
          return Sk.importMainWithBody('<stdin>', false, completeCode, true);
        });
    
        myPromise.then().catch((err) => {
          console.log(err.toString());
        });
    }

    return(
        <div>
            {
                infos && (
                    <div className="h-screen w-screen bg-gray-200 pt-10 flex flex-col items-center gap-10 overflow-auto">

                        <div className="flex flex-col items-center justify-center gap-3"> 
                            <h1 className="text-6xl font-bold uppercase">{infos.titulo}</h1>
                            <h1 className="text-2xl font-normal">Algoritimo de {infos.tipo}</h1>
                        </div>

                        <div className="flex flex-col items-start w-5/6 justify-center gap-10 font-normal">
                            <div className="flex flex-col text-justify w-5/6 gap-3">
                                <h1 className="text-xl">{infos.descricao}</h1>
                                <h1 className="text-xl">{infos.funcionamento}</h1>
                            </div>

                            <ol className="list-decimal pl-5 flex flex-col gap-1">
                                {
                                    infos.steps.map((item, index) => {
                                        return <li key={index} className="text-xl">{item}</li>
                                    })
                                }
                            </ol>
                        </div>

                        <img src={infos.gif} className="rounded-md"/>

                        <span className="h-96 flex flex-col w-4/6 rounded-xl p-5 bg-indigo-950 flex-shrink-0 flex-grow-0 gap-10 relative">
                            <div className=" top-3 left-3 flex gap-3">
                                <div className="h-5 aspect-square bg-red-500 rounded-full"></div>
                                <div className="h-5 aspect-square bg-yellow-500 rounded-full"></div>
                                <div className="h-5 aspect-square bg-green-500 rounded-full"></div>
                            </div>

                            <AceEditor
                                mode="python"
                                theme="dracula"
                                value={code}
                                onChange={(newCode) =>{setCode(newCode)}}
                                style={{backgroundColor: 'rgb(30 27 75)', width: '100%'}}
                            />

                            <div className="h-12 w-40 rounded-full bg-emerald-400 absolute bottom-5 right-5 flex items-center justify-center" onClick={() => {runCode()}}>
                                <h1 className="text-xl text-zinc-50 font-bold">RUN</h1>
                            </div>

                        </span>
                        
                        {output && (<span className="h-40 flex flex-col w-4/6 rounded-xl p-5 bg-indigo-950 flex-shrink-0 flex-grow-0 gap-10 relative">
                            <div className=" top-3 left-3 flex gap-3">
                                <div className="h-5 aspect-square bg-red-500 rounded-full"></div>
                                <div className="h-5 aspect-square bg-yellow-500 rounded-full"></div>
                                <div className="h-5 aspect-square bg-green-500 rounded-full"></div>
                            </div>

                            <AceEditor
                                mode="python"
                                theme="dracula"
                                value={output}
                                highlightActiveLine ={false}
                                readOnly  
                                style={{backgroundColor: 'rgb(30 27 75)', width: '100%'}}
                            />
                        </span>)}

                        <canvas ref={canvasRef} className="hidden"/>;

                    </div>
                )
            }
        </div>
    )
}